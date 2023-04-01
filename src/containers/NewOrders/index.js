import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewLayout from "../NewLayout";
import { Row, Col } from "react-bootstrap";
import {  
  Box, 
  Tab,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import styled from "@emotion/styled";
import { OrderTable } from "../../components/OrderTable";
import { toast } from "react-toastify";
import {
  getCustomerOrders,
} from "../../actions";

const CusTab = styled(Tab)`
  /* font-size: 0.75rem;
  font-weight: 600;
  font-family: Arial; */
  color: #fff;
  background-color: #4472c4;
  width: 12.5%;
`;

const CusTabPanel = styled(TabPanel)`
  padding: 10px 0;
`;

const CusTabList = styled(TabList)`
  & .Mui-selected {
    background-color: #ffc000 !important;
    color: #fff !important;
  }

  & .MuiTabs-flexContainer {
    overflow-x: auto;
  }
`;

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const CusMenuItem = styled(MenuItem)``;

export const NewOrders = () => {
  const allOrders = useSelector((state) => state.order.allOrders);
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const [tabValue, setTabValue] = useState("ALL");
  const [keywords, setKeywords] = useState("");
  // const [selectedStore, setSelectedStore] = useState(
  //   user.roleCategory === "SUPER_ADMIN"
  //     ? "ALL"
  //     : stores?.find(
  //         (el) =>
  //           el.restaurantId === user.restaurantId && el.storeId === user.storeId
  //       )?.resturantName
  // );

  const [selectedStore, setSelectedStore] = useState(
    stores?.find(
          (el) =>
            el.restaurantId === user.restaurantId && el.storeId === user.storeId
        )?.resturantName
  );

  // const [selectedStoreObj, setSelectedStoreObj] = useState({
  //   restaurantId:
  //     user.roleCategory === "SUPER_ADMIN" ? null : user.restaurantId,
  //   storeId: user.roleCategory === "SUPER_ADMIN" ? null : user.storeId,
  // });

  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId: user.restaurantId,
    storeId: user.storeId,
  });
  const [isReset, setIsReset] = useState(false);


  const dispatch = useDispatch();

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeKeywords = (event) => {
    setKeywords(event.target.value);
  };

  useEffect(()=>{
    const today = businessDateAll
    ? new Date(businessDateAll.businessDate)
    : new Date();
    dispatch(
      getCustomerOrders(
        selectedStoreObj.restaurantId,
        selectedStoreObj.storeId,
        tabValue === "ALL" ? null : tabValue,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      )
    );
  },[tabValue, isReset, selectedStoreObj])

  const handleIsReset = () => {
    if (isReset) {
      setIsReset(false);
    } else {
      setIsReset(true);
    }
  };

  const searchOrder = () => {
    const today = businessDateAll
      ? new Date(businessDateAll.businessDate)
      : new Date();
    dispatch(
      getCustomerOrders(
        selectedStoreObj.restaurantId,
        selectedStoreObj.storeId,
        tabValue === "ALL" ? null : tabValue,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        keywords
      )
    );
  };

  const resetSearch = () => {
    setKeywords("");
    handleIsReset();
    toast.success("Reset Orders!");
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };


  return (
    <NewLayout sidebar headerTitle="Orders">
      {/* <Row>
        <div
          className="w-100 text-center p-3 mb-3"
          style={{
            color: "#2E75B6",
            backgroundColor: "#F2F2F2",
          }}
        >
          <Typography sx={{ fontWeight: "bold !important" }}>ORDERS</Typography>
        </div>
      </Row> */}
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <CusTabList
            onChange={handleChangeTab}
            aria-label="lab API tabs example"
            TabIndicatorProps={{
              style: { background: "transparent" },
            }}
          >
            <CusTab
              label={
                <span>
                  ALL <br></br> ({allOrders.length})
                </span>
              }
              value="ALL"
            />

            <CusTab
              label={
                <span>
                  SUBMITTED <br></br> (
                  {
                    allOrders.filter(function (el) {
                      return el.orderStatus === "SUBMITTED";
                    }).length
                  }
                  )
                </span>
              }
              value="SUBMITTED"
            />
            <CusTab
              label={
                <span>
                  ACCEPTED <br></br> (
                  {
                    allOrders.filter(function (el) {
                      return el.orderStatus === "ACCEPTED";
                    }).length
                  }
                  )
                </span>
              }
              value="ACCEPTED"
            />
            <CusTab
              label={
                <span>
                  PROCESSING <br></br> (
                  {
                    allOrders.filter(function (el) {
                      return el.orderStatus === "PROCESSING";
                    }).length
                  }
                  )
                </span>
              }
              value="PROCESSING"
            />
            <CusTab
              label={
                <span>
                  FOOD READY <br></br> (
                  {
                    allOrders.filter(function (el) {
                      return el.orderStatus === "FOOD READY";
                    }).length
                  }
                  )
                </span>
              }
              value="FOOD READY"
            />
            <CusTab
              label={
                <span>
                  OUT FOR DELIVERY <br></br> (
                  {
                    allOrders.filter(function (el) {
                      return el.orderStatus === "OUT FOR DELIVERY";
                    }).length
                  }
                  )
                </span>
              }
              value="OUT FOR DELIVERY"
            />
            <CusTab
              label={
                <span>
                  DELIVERED <br></br> (
                  {
                    allOrders.filter(function (el) {
                      return el.orderStatus === "DELIVERED";
                    }).length
                  }
                  )
                </span>
              }
              value="DELIVERED"
            />
            <CusTab
              label={
                <span>
                  CANCELLED <br></br> (
                  {
                    allOrders.filter(function (el) {
                      return el.orderStatus === "CANCELLED";
                    }).length
                  }
                  )
                </span>
              }
              value="CANCELLED"
            />
          </CusTabList>
        </Box>
        <div>
        <div className="mb-3 mt-3">
            <Row className="align-items-center">
              <Col sm={6}>
                <TextField
                  label="Search Order By ID"
                  variant="standard"
                  value={keywords}
                  onChange={handleChangeKeywords}
                  className="mr-3"
                />
                <Button
                  variant="contained"
                  color="success"
                  disabled={!keywords}
                  onClick={searchOrder}
                >
                  Search
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={resetSearch}
                  className="ml-3"
                >
                  Reset
                </Button>
              </Col>
              <Col sm={6}>
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
              </Col>
            </Row>
          </div>
        </div>
        <CusTabPanel value="ALL">
          <OrderTable type={null} hideTopBar={true} newOrderUI={true}></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="SUBMITTED">
          <OrderTable type="SUBMITTED" hideTopBar={true} newOrderUI={true}></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="ACCEPTED">
          <OrderTable type="ACCEPTED" hideTopBar={true} newOrderUI={true}></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="PROCESSING">
          <OrderTable type="PROCESSING" hideTopBar={true} newOrderUI={true}></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="FOOD READY">
          <OrderTable type="FOOD READY" hideTopBar={true} newOrderUI={true}></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="OUT FOR DELIVERY">
          <OrderTable type="OUT FOR DELIVERY" hideTopBar={true} newOrderUI={true}></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="DELIVERED">
          <OrderTable type="DELIVERED" hideTopBar={true} newOrderUI={true}></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="CANCELLED">
          <OrderTable type="CANCELLED" hideTopBar={true} newOrderUI={true}></OrderTable>
        </CusTabPanel>
      </TabContext>
    </NewLayout>
  );
};
