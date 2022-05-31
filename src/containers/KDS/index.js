import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const orders = [
    {
      orderId: 126,
      time: "2:34",
      orderInfo: "Delivery",
      customerName: "Gurmeet",
      items: [
        {
          itemName: "Aloo Tikki Burger",
          qty: 2,
          remarks: "",
          status: "FOOD READY",
          counter: "Burger",
        },
      ],

      "": "",
      __1: "",
    },
    {
      orderId: 127,
      time: ":34",
      orderInfo: "Pick-up",
      customerName: "Aniket",
      "": "",
      __1: "",
      items: [
        {
          itemName: "Mexican Pizza",
          qty: 1,
          remarks: "",
          status: "PROCESSING",
          counter: "Pizza",
          extra: [
            {
              itemName: "Extra Olives (Small)",
              qty: 1,
              remarks: "",
              status: "PROCESSING",
            },
            {
              itemName: "Extra Mushroom",
              qty: 1,
              remarks: "",
              status: "PROCESSING",
            },
          ],
        },
      ],
    },
    {
      orderId: 127,
      time: ":34",
      orderInfo: "Pick-up",
      customerName: "Aniket",

      "": "",
      __1: "",
      items: [
        {
          itemName: "Cheese Burger",
          qty: 1,
          remarks: "",
          counter: "Burger",
          status: "PROCESSING",
        },
        {
          itemName: "French Fries (Large)",
          qty: 1,
          remarks: "",
          counter: "Burger",
          status: "FOOD READY",
        },
      ],
    },
    {
      orderId: 128,
      time: "16:26",
      orderInfo: "Delivery",
      customerName: "Abhishek",
      "": "",
      __1: "",
      items: [
        {
          itemName: "Chilli Cheese Toast",
          qty: 1,
          remarks: "",
          counter: "Chinese",
          status: "PROCESSING",
        },
        {
          customerName: "Abhishek",
          itemName: "Vanila Shake",
          qty: 2,
          remarks: "",
          counter: "Drinks",
          status: "Completed",
        },
      ],
    },

    {
      orderId: 129,
      time: "2:34",
      orderInfo: "Up-Tab1",
      customerName: "Chakri",

      "": "",
      __1: "",
      items: [
        {
          itemName: "Aloo Tikki Burger",
          qty: 1,
          remarks: "No Lettuce",
          counter: "Burger",
          status: "Completed",
        },
      ],
    },
    {
      orderId: 130,
      time: "2:48",
      orderInfo: "Delivery",
      customerName: "Gurmeet",

      "": "",
      __1: "",
      items: [
        {
          itemName: "Aloo Tikki Burger",
          qty: 1,
          remarks: "",
          counter: "Burger",
          status: "Completed",
        },
      ],
    },
    {
      orderId: 131,
      time: ":3",
      orderInfo: "Delivery",
      customerName: "Aniket",

      "": "",
      __1: "",
      items: [
        {
          itemName: "Cheese Pizza",
          qty: 2,
          remarks: "",
          status: "PROCESSING",
          counter: "Pizza",
          choice: [
            {
              itemName: "Cheezy Crust",
              qty: 1,
              remarks: "",
              status: "PROCESSING",
            },
          ],
          extra: [
            {
              itemName: "Extra Paneer",
              qty: 1,
              remarks: "",
              status: "PROCESSING",
            },
          ],
        },
        {
          itemName: "Cheese Burger",
          qty: 1,
          remarks: "",
          counter: "Burger",
          status: "PROCESSING",
        },
        {
          itemName: "French Fries (Large)",
          qty: 1,
          remarks: "",
          counter: "Burger",
          status: "FOOD READY",
        },
      ],
    },

    {
      orderId: 132,
      time: "16:26",
      orderInfo: "Delivery",
      customerName: "Abhishek",

      "": "",
      __1: "",
      items: [
        {
          itemName: "Chilli Cheese Toast",
          qty: 1,
          remarks: "",
          counter: "Chinese",
          status: "PROCESSING",
        },
        {
          itemName: "Soft Drink",
          qty: 2,
          remarks: "Pepsi",
          counter: "Drinks",
          status: "FOOD READY",
        },
        {
          itemName: "Aloo Tikki Burger",
          qty: 3,
          remarks: "No Lettuce",
          counter: "Burger",
          status: "FOOD READY",
        },
      ],
    },
    {
      orderId: 133,
      time: "2:34",
      orderInfo: "Delivery",
      customerName: "Gurmeet",

      "": "",
      __1: "",
      items: [
        {
          itemName: "Aloo Tikki Burger",
          qty: 5,
          remarks: "",
          counter: "Burger",
          status: "FOOD READY",
        },
      ],
    },
  ];
  const [tabValue, setTabValue] = React.useState("ORDER ROUTING SCREEN");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerOrders("R001", "S001", "SUBMITTED"));
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
    console.log(store);
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
              <Row className="align-items-center">
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
                      {stores.map((store) => (
                        <CusMenuItem
                          onClick={() => {
                            handleSelectedStore(store);
                          }}
                          value={store.resturantName}
                        >
                          <span>
                            {store.resturantName}
                            <br></br>
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
                            ) : null}
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
              {/* <Row>
                <div
                  className="w-100 text-center p-3 mb-3"
                  style={{
                    color: "#2E75B6",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold !important" }}>
                    KDS – ORDER ROUTING SCREEN
                  </Typography>
                </div>
              </Row> */}

              <KDSTable orders={orders} counter={null}></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="PIZZA COUNTER">
            <div>
              {/* <Row>
                <div
                  className="w-100 text-center p-3 mb-3"
                  style={{
                    color: "#2E75B6",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold !important" }}>
                    KDS – PIZZA COUNTER
                  </Typography>
                </div>
              </Row> */}
              {/* <Row className="align-items-center">
                <Col sm={2} style={{ maxWidth: "125px !important" }}>
                  <div>
                    <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                      Select Store
                    </Typography>
                  </div>
                </Col>
                <Col sm={6} style={{ display: "flex" }}>
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
                      {stores.map((store) => (
                        <CusMenuItem
                          onClick={() => {
                            handleSelectedStore(store);
                          }}
                          value={store.resturantName}
                        >
                          <span>
                            {store.resturantName}
                            <br></br>
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
                            ) : null}
                          </span>
                        </CusMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col sm={4}></Col>
              </Row> */}
              <KDSTable orders={orders} counter={"Pizza"}></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="CHINESE COUNTER">
            <div>
              {/* <Row>
                <div
                  className="w-100 text-center p-3 mb-3"
                  style={{
                    color: "#2E75B6",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold !important" }}>
                    KDS – CHINESE COUNTER
                  </Typography>
                </div>
              </Row> */}
              {/* <Row className="align-items-center">
                <Col sm={2} style={{ maxWidth: "125px !important" }}>
                  <div>
                    <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                      Select Store
                    </Typography>
                  </div>
                </Col>
                <Col sm={6} style={{ display: "flex" }}>
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
                      {stores.map((store) => (
                        <CusMenuItem
                          onClick={() => {
                            handleSelectedStore(store);
                          }}
                          value={store.resturantName}
                        >
                          <span>
                            {store.resturantName}
                            <br></br>
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
                            ) : null}
                          </span>
                        </CusMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col sm={4}></Col>
              </Row> */}
              <KDSTable orders={orders} counter="Chinese"></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="DRINK &amp; DESERTS COUNTER">
            <div>
              {/* <Row>
                <div
                  className="w-100 text-center p-3 mb-3"
                  style={{
                    color: "#2E75B6",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold !important" }}>
                    KDS – DRINK &amp; DESERTS COUNTER
                  </Typography>
                </div>
              </Row> */}
              {/* <Row className="align-items-center">
                <Col sm={2} style={{ maxWidth: "125px !important" }}>
                  <div>
                    <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                      Select Store
                    </Typography>
                  </div>
                </Col>
                <Col sm={6} style={{ display: "flex" }}>
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
                      {stores.map((store) => (
                        <CusMenuItem
                          onClick={() => {
                            handleSelectedStore(store);
                          }}
                          value={store.resturantName}
                        >
                          <span>
                            {store.resturantName}
                            <br></br>
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
                            ) : null}
                          </span>
                        </CusMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col sm={4}></Col>
              </Row> */}
              <KDSTable orders={orders} counter="Drinks"></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="BURGER COUNTER">
            <div>
              {/* <Row>
                <div
                  className="w-100 text-center p-3 mb-3"
                  style={{
                    color: "#2E75B6",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold !important" }}>
                    KDS – BURGER COUNTER
                  </Typography>
                </div>
              </Row> */}
              {/* <Row className="align-items-center">
                <Col sm={2} style={{ maxWidth: "125px !important" }}>
                  <div>
                    <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                      Select Store
                    </Typography>
                  </div>
                </Col>
                <Col sm={6} style={{ display: "flex" }}>
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
                      {stores.map((store) => (
                        <CusMenuItem
                          onClick={() => {
                            handleSelectedStore(store);
                          }}
                          value={store.resturantName}
                        >
                          <span>
                            {store.resturantName}
                            <br></br>
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
                            ) : null}
                          </span>
                        </CusMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
                <Col sm={4}></Col>
              </Row> */}
              <KDSTable orders={orders} counter="Burger"></KDSTable>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
};
