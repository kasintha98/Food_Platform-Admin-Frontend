import React, { useState, useEffect } from "react";
import "./style.css";
import { Row, Col, Container } from "react-bootstrap";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductCard from "../../components/ProductCard";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsNew,
  getAllSections,
  getDishesBySection,
  getAllStores,
  GetDeliveryPrice,
  GetTaxDetails,
  getAllSectionsFromMaster,
} from "../../actions";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { NewCart } from "../NewCart";

const CusTabList = styled(TabList)`
  position: relative;
  z-index: 6;
 

  & .MuiTabs-flexContainer {
    column-gap: 10px;
    overflow-x: auto;
  }
  }
  & .Mui-selected {
    background-color: #ffc107 !important;
    color: #e71b23;
  } 
`;

const CusTabList2 = styled(TabList)`
  & .MuiTabs-flexContainer {
    overflow-x: auto !important;
  }
`;

const CusTab = styled(Tab)`
  font-size: 0.75rem;
  font-weight: 600;
  font-family: Arial;
  color: #595959;
  background-color: #fff;
  border-radius: 25px;
`;

const CusBox1 = styled(Box)`
  margin-top: -3px;

  @media (max-width: 1055px) {
    margin-top: 11px;
  }
`;

const CusContainer = styled(Container)`
  margin-top: 65px;
  min-height: calc(100vh - 180px);
  margin-left: 0px;

  @media (max-width: 992px) {
    margin-top: 80px;
  }
`;

const CusCol = styled(Col)`
  @media (max-width: 992px) {
    display: none;
  }
`;

export default function NewMenu(props) {
  const sections = useSelector((state) => state.product.sections);
  const dishesOfSection = useSelector((state) => state.product.dishesOfSection);
  const productList = useSelector((state) => state.product);
  const allSectionsFromMaster = useSelector(
    (state) => state.product.allSectionsFromMaster
  );

  const [value, setValue] = useState(sections[0]);
  const [subTotal, setSubtotal] = useState(0);
  const [value2, setValue2] = useState(dishesOfSection[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStores());
    dispatch(GetDeliveryPrice(props.restaurantId, props.storeId));
    dispatch(GetTaxDetails(props.restaurantId, props.storeId));
    dispatch(getProductsNew(props.restaurantId, props.storeId));
    dispatch(getAllSections(props.restaurantId, props.storeId)).then((res) => {
      if (res) {
        setValue(res[0]);
        dispatch(getDishesBySection(res[0], props.restaurantId, props.storeId));
      }
    });
    console.log(productList);
  }, [props.restaurantId, props.storeId]);

  const handleSubTotal = (total) => {
    setSubtotal(total);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    console.log("newValue");
    console.log(newValue);
  };

  const getDishesOfSection = (section) => {
    dispatch(
      getDishesBySection(section, props.restaurantId, props.storeId)
    ).then((res) => {
      if (res) {
        console.log("dishesOfSection");
        console.log(res);
        setValue2(res[0]);
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <CusContainer>
        <Row style={{ width: "96vw" }}>
          <Col sm={12} md={12} lg={9} xl={9}>
            <div>
              <Box sx={{ width: "100%" }}>
                <TabContext value={value ? value : sections[0]}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      position: "absolute",
                      top: "-58px",
                      left: "0px",
                      width: "96vw",
                      backgroundColor: "#ffc423",
                    }}
                  >
                    <CusTabList2
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      {sections.map((section) => (
                        <Tab
                          onClick={() => {
                            getDishesOfSection(section);
                          }}
                          label={section}
                          value={section}
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            fontFamily: "Arial",
                            color: "#e71b23",
                          }}
                        />
                      ))}
                    </CusTabList2>
                  </Box>
                  {sections.map((section) => (
                    <TabPanel sx={{ padding: "0px" }} value={section}>
                      <Box sx={{ width: "100%" }}>
                        <TabContext
                          value={value2 ? value2 : dishesOfSection[0]}
                        >
                          <CusBox1
                            sx={{
                              backgroundColor: "transparent",
                            }}
                          >
                            <CusTabList
                              onChange={handleChange2}
                              aria-label="lab API tabs example"
                              TabIndicatorProps={{
                                style: { background: "transparent" },
                              }}
                            >
                              {dishesOfSection.map((dish) => (
                                <CusTab
                                  style={{ marginBottom: "6px" }}
                                  label={dish}
                                  value={dish}
                                />
                              ))}
                            </CusTabList>
                            <hr
                              style={{
                                zIndex: 1,
                                position: "relative",
                                marginTop: "-31px",
                              }}
                            ></hr>
                          </CusBox1>
                          {dishesOfSection.map((dish) => (
                            <TabPanel
                              sx={{
                                backgroundColor: "#f7f7f7",
                                marginTop: "-45px",
                              }}
                              value={dish}
                            >
                              <Row>
                                {productList.products?.length > 0 ? (
                                  <>
                                    {productList.products?.map((product) =>
                                      product &&
                                      product.menuAvailableFlag === "Y" &&
                                      product.section === section &&
                                      product.dish === dish ? (
                                        <>
                                          {product.dish === "Fries" ? (
                                            <Col xs={6} sm={4} md={3} lg={2}>
                                              <ProductCard
                                                product={product}
                                                products={productList.products}
                                                onChangeSubTotal={
                                                  handleSubTotal
                                                }
                                                restaurantId={
                                                  props.restaurantId
                                                }
                                                storeId={props.storeId}
                                              ></ProductCard>
                                            </Col>
                                          ) : (
                                            <>
                                              {product.productSize ===
                                                "Regular" ||
                                              product.productSize ===
                                                "Small" ? (
                                                <Col
                                                  xs={6}
                                                  sm={4}
                                                  md={3}
                                                  lg={2}
                                                >
                                                  <ProductCard
                                                    product={product}
                                                    products={
                                                      productList.products
                                                    }
                                                    onChangeSubTotal={
                                                      handleSubTotal
                                                    }
                                                    restaurantId={
                                                      props.restaurantId
                                                    }
                                                    storeId={props.storeId}
                                                  ></ProductCard>
                                                </Col>
                                              ) : null}
                                            </>
                                          )}
                                        </>
                                      ) : null
                                    )}
                                  </>
                                ) : (
                                  <h4 style={{ marginTop: "50px" }}>
                                    No Products Available
                                  </h4>
                                )}
                              </Row>
                            </TabPanel>
                          ))}
                        </TabContext>
                      </Box>
                    </TabPanel>
                  ))}
                </TabContext>
              </Box>
            </div>
          </Col>
          <CusCol sm={12} md={12} lg={3} xl={3}>
            <NewCart
              isShowDeliveryCharge={props.isShowDeliveryCharge}
              setShowCheckout={props.setShowCheckout}
            ></NewCart>
          </CusCol>
        </Row>
      </CusContainer>
    </div>
  );
}
