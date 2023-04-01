import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersByRole, getAllRiderLocations } from "../../actions";
import Layout from "../NewLayout";
import styled from "@emotion/styled";
import {
  Box,
  Tabs,
  Typography,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { DeliveryTrackingTable } from "../../components/DeliveryTrackingTable";
import { Row, Col } from "react-bootstrap";
import "./style.css";

const CusTab = styled(Tab)`
  /* & .count-d {
    background-color: #2e75b6 !important;
    color: #fff;
    margin-left: 5px;
    padding: 10px;
    border-radius: 5px;
  } */
  min-width: 160px;
`;

const CusTabs = styled(Tabs)`
  & .Mui-selected .count-d {
    background-color: #2e75b6 !important;
    color: #fff;
    margin-left: 5px;
    padding: 10px;
    border-radius: 5px;
  }

  & button:focus .count-d {
    color: #fff !important;
    background-color: #ffc000 !important;
  }
`;

const CusMenuItem = styled(MenuItem)``;

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const DeliveryTracking = () => {
  const allOrders = useSelector((state) => state.order.allOrders);
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const usersByRole = useSelector((state) => state.user.usersByRole);
  const userRoleLoading = useSelector((state) => state.user.userRoleLoading);
  const [tabValue, setTabValue] = useState(5);
  
  // const [selectedStore, setSelectedStore] = useState(
  //   user.roleCategory === "SUPER_ADMIN"
  //     ? "ALL"
  //     : stores?.find(
  //         (el) =>
  //           el.restaurantId === user.restaurantId && el.storeId === user.storeId
  //       )?.resturantName
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUsersByRole(
        "DELIVERY_BOY",
        selectedStoreObj.restaurantId,
        selectedStoreObj.storeId
      )
    ).then((res) => {
      if (res) {
        document.querySelector(".MuiTabs-scroller") &&
          document
            .querySelector(".MuiTabs-scroller")
            .classList.add("Mui-selected");
      }
    });
    dispatch(getAllRiderLocations());
  }, [selectedStoreObj]);

  const handleChangeTab = (event, newValue) => {
    if (document.querySelector(".MuiTabs-scroller")) {
      document.querySelector(".MuiTabs-scroller").classList.add("Mui-selected");
    }

    setTabValue(newValue);
  };

  const calcAllOrderCount = (userName) => {
    let arr = allOrders;
    const count = arr.filter(function (el) {
      return (
        (el.orderStatus === "FOOD READY" ||
          el.orderStatus === "OUT FOR DELIVERY" ||
          el.orderStatus === "CANCELLED" ||
          el.orderStatus === "DELIVERED") &&
        el.deliveryUserId === userName
      );
    }).length;

    return <span>{count}</span>;
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  return (
    <Layout sidebar headerTitle="Delivery Boy">
      <Row>
        <Col sm={6}></Col>
        <Col sm={6}>
          <>
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
                disabled={user.roleCategory !== "SUPER_ADMIN"}
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
          </>
        </Col>
      </Row>
      {!userRoleLoading && usersByRole.length > 0 ? (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
          }}
        >
          <CusTabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", textAlign: "left" }}
          >
            {usersByRole.map((user) => (
              <CusTab
                onClick={(e) => {
                  handleChangeTab(e, user.userSeqNo);
                }}
                label={
                  <>
                    <Row className="w-100">
                      <Col className="p-0">
                        <Typography sx={{ width: "100%", textAlign: "left" }}>
                          <span>{user.firstName}</span>
                          {/* <span className="count-d">
                      {calcAllOrderCount(user.firstName)}
                    </span> */}
                        </Typography>
                      </Col>
                      <Col className="p-0">
                        <Typography sx={{ width: "100%", textAlign: "right" }}>
                          {/* <span>{user.firstName}</span> */}
                          <span className="count-d">
                            {calcAllOrderCount(user.firstName)}
                          </span>
                        </Typography>
                      </Col>
                    </Row>
                  </>
                }
                {...a11yProps(user.userSeqNo)}
              />
            ))}
          </CusTabs>
          {usersByRole.map((user) => (
            <TabPanel
              value={tabValue}
              index={user.userSeqNo}
              style={{ width: "100%" }}
            >
              <DeliveryTrackingTable
                selectedStoreObj={selectedStoreObj}
                boyName={user.firstName}
              ></DeliveryTrackingTable>
            </TabPanel>
          ))}
        </Box>
      ) : (
        <>
          {!userRoleLoading && usersByRole.length < 1 ? (
            <Alert severity="warning" className="mt-4">
              No delivery boy user data recieved!
            </Alert>
          ) : (
            <>
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
              <br></br>
              <div className="text-center">
                <Typography>Getting data...</Typography>
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};
