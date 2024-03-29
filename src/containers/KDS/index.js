import React, { useState, useRef, useEffect } from "react";
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
import { Typography, IconButton, Alert } from "@mui/material";
import { KDSTable } from "../../components/KDSTable";
import RefreshIcon from "@mui/icons-material/Refresh";

import { api } from "../../urlConfig";


const CusMenuItem = styled(MenuItem)``;

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

export const KDS = () => {
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const refreshRef = useRef();

  const [tabValue, setTabValue] = React.useState("ORDER ROUTING SCREEN");

  // const [selectedStore, setSelectedStore] = useState(
  //   user.roleCategory === "SUPER_ADMIN" ? "ALL" : user.restaurantId
  // );
  // const [selectedStoreObj, setSelectedStoreObj] = useState({
  //   restaurantId:
  //     user.roleCategory === "SUPER_ADMIN" ? null : user.restaurantId,
  //   storeId: user.roleCategory === "SUPER_ADMIN" ? null : user.storeId,
  // });

  const [selectedStore, setSelectedStore] = useState(
    stores?.find(
      (el) =>
        el.restaurantId === user.restaurantId && el.storeId === user.storeId
    )?.resturantName
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId: user.restaurantId,
    storeId: user.storeId,
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

  //--------------START---------------
/*
  useEffect(() => {

    if (typeof (EventSource) !== "undefined") {
      if(user.roleCategory != "KDS_CHEF"){
        // console.log(user.roleCategory);
        return;
      }
      // var sse = new EventSource('https://hangariesapp-uumgqhekpa-el.a.run.app/api/subscribe?storeId=S001');
      // var sse = new EventSource('https://hangariesapp-uumgqhekpa-el.a.run.app/api/subscribe?userLoginId=devgurmeet');
      var sse = new EventSource(api+'/subscribe?userLoginId='+user.loginId);

      sse.onopen = function () {
        console.log("Fired the connection");
        console.log(api);
      }

      sse.onmessage = function (event) {
        //This method get called as soon as the event got fired from the server.
        // console.log(event.data);
        refreshRef.current.handleRefresh();
      };

      sse.onerror = () => {
        // error log here 
        console.log("Error Occured");
      }

      return () => {
        // console.log("Unmounted");
        // This method called when KDS page closed or navigated to other page from KDS
        //sse connection closed at this point to save or optimised memory
        sse.close();
      };
    } else {
      alert("Sorry, your browser does not support KDS screen autoload feature...");
    }
  }, [])
  */
  //-------------------END ---------------

  return (
    <Layout sidebar headerTitle="KDS">
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
                    {user.roleCategory === "SUPER_ADMIN"
                      ? "Select Store"
                      : "Your Store"}
                  </Typography>
                </div>
                <Col className="col-6" style={{ display: "flex" }}>
                  {user.roleCategory === "SUPER_ADMIN" ? (
                    <FormControl fullWidth>
                      <InputLabel
                        sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                        id="demo-simple-select-label"
                      >
                        Please select the store
                      </InputLabel>
                      <CusSelect
                        sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedStore}
                        label="Please select the store"
                        onChange={handleChangeStore}
                      >
                        {/* <CusMenuItem
                          onClick={() => {
                            handleSelectedStore({
                              restaurantId: null,
                              storeId: null,
                            });
                          }}
                          value={"ALL"}
                        >
                          All Stores
                        </CusMenuItem> */}
                        {stores.map((store) => (
                          <CusMenuItem
                            onClick={() => {
                              handleSelectedStore(store);
                            }}
                            value={store.resturantName}
                          >
                            <span>{store.resturantName}</span>
                          </CusMenuItem>
                        ))}
                      </CusSelect>
                    </FormControl>
                  ) : (
                    <span>
                      {user.resturantName
                        ? user.resturantName
                        : user.restaurantId}
                    </span>
                  )}
                </Col>
                <Col className="col-3">
                  <IconButton
                    onClick={() => {
                      refreshRef.current.handleRefresh();
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Col>
              </Row>
            </Col>
          </Row>

          <TabPanel value="ORDER ROUTING SCREEN">
            <div>
              <KDSTable
                counter={null}
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
                ref={refreshRef}
              ></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="PIZZA COUNTER">
            <div>
              <KDSTable
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
                counter={"PIZZA"}
                ref={refreshRef}
              ></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="CHINESE COUNTER">
            <div>
              <KDSTable
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
                counter="CHINESE"
                ref={refreshRef}
              ></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="DRINK &amp; DESERTS COUNTER">
            <div>
              <KDSTable
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
                counter="DRINKS"
                ref={refreshRef}
              ></KDSTable>
            </div>
          </TabPanel>
          <TabPanel value="BURGER COUNTER">
            <div>
              <KDSTable
                restaurantId={selectedStoreObj.restaurantId}
                storeId={selectedStoreObj.storeId}
                counter="FAST FOOD"
                ref={refreshRef}
              ></KDSTable>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
};
