import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import Layout from "../NewLayout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { KDSTable } from "../../components/KDSTable";
import { getCustomerOrders } from "../../actions";

const CusMenuItem = styled(MenuItem)``;

export const KDS = () => {
  const stores = useSelector((state) => state.store.stores);

  const [tabValue, setTabValue] = React.useState("ORDER ROUTING SCREEN");
  const [selectedStore, setSelectedStore] = useState("ALL");
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId: null,
    storeId: null,
  });

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  return (
    <Layout sidebar>
      <Box sx={{ width: "100%", marginTop: "-20px" }}>
        <TabContext value={tabValue}>
          <Row>
            <Col className="col-8">
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <TabList onChange={handleChangeTab} variant="scrollable">
                  <Tab
                    label="ORDER ROUTING SCREEN"
                    value="ORDER ROUTING SCREEN"
                  />
                  <Tab label="PIZZA COUNTER" value="PIZZA COUNTER" />
                  <Tab label="CHINESE COUNTER" value="CHINESE COUNTER" />
                  <Tab
                    label="DRINK &amp; DESERTS COUNTER"
                    value="DRINK &amp; DESERTS COUNTER"
                  />
                  <Tab label="BURGER COUNTER" value="BURGER COUNTER" />
                </TabList>
              </Box>
            </Col>
            <Col className="col-4">
              <Row className="align-items-center pt-2">
                <div style={{ maxWidth: "125px !important" }}>
                  <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                    Select Store
                  </Typography>
                </div>
                <Col className="col-8 " style={{ display: "flex" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Please select the store
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedStore}
                      label="Please select the store"
                      onChange={handleChangeStore}
                    >
                      <CusMenuItem
                        onClick={() => {
                          handleSelectedStore({
                            restaurantId: null,
                            storeId: null,
                          });
                        }}
                        value={"ALL"}
                      >
                        All Stores
                      </CusMenuItem>
                      {stores.map((store) => (
                        <CusMenuItem
                          onClick={() => {
                            handleSelectedStore(store);
                          }}
                          value={store.resturantName}
                        >
                          <span>
                            {store.resturantName}
                            {/* <br></br>
                            <span
                              style={{ fontSize: "0.70rem", color: "#767171" }}
                            >
                              {store.address1}
                            </span>
                            {store.address2 ? (
                              <>
                                ,{" "}
                                <span
                                  style={{
                                    fontSize: "0.70rem",
                                    color: "#767171",
                                  }}
                                >
                                  {store.address2}
                                </span>
                              </>
                            ) : null}
                            {store.address3 ? (
                              <>
                                ,{" "}
                                <span
                                  style={{
                                    fontSize: "0.70rem",
                                    color: "#767171",
                                  }}
                                >
                                  {store.address3}
                                </span>
                              </>
                            ) : null} */}
                          </span>
                        </CusMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col sm={4}></Col>
              </Row>
            </Col>
          </Row>

          <TabPanel value="ORDER ROUTING SCREEN">
            <div>
              <KDSTable
                counter={null}
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
              ></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="PIZZA COUNTER">
            <div>
              <KDSTable
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
                counter={"PIZZA"}
              ></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="CHINESE COUNTER">
            <div>
              <KDSTable
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
                counter="CHINESE"
              ></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="DRINK &amp; DESERTS COUNTER">
            <div>
              <KDSTable
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
                counter="DRINKS"
              ></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="BURGER COUNTER">
            <div>
              <KDSTable
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
                counter="FAST FOOD"
              ></KDSTable>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
};
