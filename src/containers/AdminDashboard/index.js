import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDays } from "date-fns";
import Layout from "../NewLayout";
import MenuItem from "@mui/material/MenuItem";
import { Row, Col, Dropdown } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import { Button, Menu } from "@mui/material";
import { Typography } from "@mui/material";
import { DateRangePicker, DefinedRange } from "react-date-range";
import { TopSellingDishTable } from "../../components/TopSellingDishTable";
import { TopPayingCustomerTable } from "../../components/TopPayingCustomerTable";
import { SalesOverTimeChart } from "../../components/SalesOverTimeChart";
import { SalesRevenueByChanelChart } from "../../components/SalesRevenueByChanelChart";
import { RevenueByPaymentMode } from "../../components/RevenueByPaymentMode";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  getAllReports,
  getSalesSummeryByDateListReports,
  getSalesSummeryByOrderSourceReports,
  getSalesSummeryByPaymentModeReports,
  getPaymentModeConfigDetails,
} from "../../actions";
import DropdownMenu from "@atlaskit/dropdown-menu";
import "./style.css";

const CusMenuItem = styled(MenuItem)``;

const CusDDT = styled(Dropdown.Toggle)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
`;

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const DRButton = styled(Button)`
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  text-transform: none;

  &:hover {
    color: #fff;
    background-color: #5a6268;
    border-color: #5a6268;
  }
`;

const CusDateRangePicker = styled(DateRangePicker)`
  & .rdrDefinedRangesWrapper {
    display: none;
  }
`;

const NumberDiv = styled.div`
  background-color: #e7e6e6;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
`;

export const AdminDashboard = () => {
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const orderSources = useSelector((state) => state.user.orderSources);
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const allReports = useSelector((state) => state.report.allReports);
  const configPaymentModes = useSelector(
    (state) => state.user.configPaymentModes
  );
  const salesSummeryByDateList = useSelector(
    (state) => state.report.salesSummeryByDateList
  );
  const salesSummeryByOrderSource = useSelector(
    (state) => state.report.salesSummeryByOrderSource
  );
  const salesSummeryByPaymentMode = useSelector(
    (state) => state.report.salesSummeryByPaymentMode
  );
  const [selectedStore, setSelectedStore] = useState(
    user.roleCategory === "SUPER_ADMIN"
      ? "ALL"
      : stores?.find(
          (el) =>
            el.restaurantId === user.restaurantId && el.storeId === user.storeId
        )?.resturantName
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId:
      user.roleCategory === "SUPER_ADMIN" ? null : user.restaurantId,
    storeId: user.roleCategory === "SUPER_ADMIN" ? null : user.storeId,
  });
  const [checked, setChecked] = useState(
    user.roleCategory === "SUPER_ADMIN" ? true : false
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateState, setDateState] = useState([
    {
      startDate: businessDateAll
        ? new Date(businessDateAll.businessDate)
        : new Date(),
      endDate: addDays(
        businessDateAll ? new Date(businessDateAll.businessDate) : new Date(),
        0
      ),
      key: "selection",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getSalesSummeryByPaymentModeReports(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId,
          `${dateState[0].startDate.getFullYear()}-${
            dateState[0].startDate.getMonth() + 1
          }-${dateState[0].startDate.getDate()}`,
          `${dateState[0].endDate.getFullYear()}-${
            dateState[0].endDate.getMonth() + 1
          }-${dateState[0].endDate.getDate()}`
        )
      );

      dispatch(
        getSalesSummeryByOrderSourceReports(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId,
          `${dateState[0].startDate.getFullYear()}-${
            dateState[0].startDate.getMonth() + 1
          }-${dateState[0].startDate.getDate()}`,
          `${dateState[0].endDate.getFullYear()}-${
            dateState[0].endDate.getMonth() + 1
          }-${dateState[0].endDate.getDate()}`
        )
      );

      dispatch(
        getSalesSummeryByDateListReports(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId,
          `${dateState[0].startDate.getFullYear()}-${
            dateState[0].startDate.getMonth() + 1
          }-${dateState[0].startDate.getDate()}`,
          `${dateState[0].endDate.getFullYear()}-${
            dateState[0].endDate.getMonth() + 1
          }-${dateState[0].endDate.getDate()}`
        )
      );
    }

    dispatch(
      getPaymentModeConfigDetails(
        selectedStoreObj ? selectedStoreObj.restaurantId : "ALL"
      )
    );
  }, [dateState]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
    if (event.target.checked) {
      handleSelectedStore({
        restaurantId: "ALL",
        storeId: "ALL",
      });
      setSelectedStore("ALL");
    } else {
      setSelectedStoreObj(null);
      setSelectedStore("");
    }
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);

    if (store.restaurantId === "ALL") {
      setChecked(true);
      console.log(true);
    }

    dispatch(
      getSalesSummeryByDateListReports(
        store.restaurantId,
        store.storeId,
        `${dateState[0].startDate.getFullYear()}-${
          dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${
          dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`
      )
    );

    dispatch(
      getSalesSummeryByOrderSourceReports(
        store.restaurantId,
        store.storeId,
        `${dateState[0].startDate.getFullYear()}-${
          dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${
          dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`
      )
    );

    dispatch(
      getSalesSummeryByPaymentModeReports(
        store.restaurantId,
        store.storeId,
        `${dateState[0].startDate.getFullYear()}-${
          dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${
          dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`
      )
    );

    dispatch(getPaymentModeConfigDetails(store ? store.restaurantId : "ALL"));
  };

  return (
    <div>
      <Layout sidebar headerTitle="Admin Dashboard">
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
                ADMIN DASHBOARD
              </Typography>
            </div>
          </Row> */}
          <Row>
            <Dropdown
              className="d-inline mx-2"
              autoClose="outside"
              variant="secondary"
            >
              <CusDDT variant="secondary">Presets</CusDDT>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <DefinedRange
                    onChange={(item) => setDateState([item.selection])}
                    ranges={dateState}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <DropdownMenu
              isOpen={isOpen}
              onOpenChange={(attrs) => {
                setIsOpen(attrs.isOpen);
              }}
              trigger="Custom"
            >
              <CusDateRangePicker
                editableDateInputs={true}
                onChange={(item) => setDateState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateState}
              />
            </DropdownMenu>
          </Row>
        </div>

        <div className="mt-3">
          <Row className="align-items-center">
            <Col sm={3} className="m-0 p-0">
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
                  <CusMenuItem
                    onClick={() => {
                      handleSelectedStore({
                        restaurantId: "ALL",
                        storeId: "ALL",
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
                        <span style={{ fontSize: "0.70rem", color: "#767171" }}>
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
                </CusSelect>
              </FormControl>
            </Col>
            <Col sm={3}>
              {user.roleCategory === "SUPER_ADMIN" ? (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Select All stores"
                  />
                </FormGroup>
              ) : null}
            </Col>
          </Row>
        </div>

        {salesSummeryByDateList && selectedStoreObj ? (
          <>
            <div className="mt-2">
              <Row>
                <Col sm={2} className="pl-0">
                  <NumberDiv>
                    <Typography sx={{ color: "#595959" }}>
                      Total Sales
                    </Typography>
                    {salesSummeryByDateList.salesSummeryByDateList &&
                    salesSummeryByDateList.salesSummeryByDateList.length > 0 ? (
                      <Typography sx={{ fontWeight: "bold" }}>
                        Rs{" "}
                        {salesSummeryByDateList.salesSummeryByDateList
                          .map((a) => a.orderValue)
                          .reduce((a, b) => a + b, 0)
                          .toFixed(2)}
                      </Typography>
                    ) : (
                      <Typography sx={{ fontWeight: "bold" }}>
                        Rs 0.00
                      </Typography>
                    )}
                  </NumberDiv>
                </Col>
                <Col sm={2} className="pl-0">
                  <NumberDiv>
                    <Typography sx={{ color: "#595959" }}>
                      Avg. Order Value
                    </Typography>
                    {salesSummeryByDateList.salesSummeryByDateList &&
                    salesSummeryByDateList.salesSummeryByDateList.length > 0 ? (
                      <Typography sx={{ fontWeight: "bold" }}>
                        Rs{" "}
                        {Number(
                          Number(
                            salesSummeryByDateList.salesSummeryByDateList
                              .map((a) => a.orderValue)
                              .reduce((a, b) => a + b, 0)
                          ) /
                            Number(
                              salesSummeryByDateList.salesSummeryByDateList
                                .map((a) => a.noOfOrders)
                                .reduce((a, b) => a + b, 0)
                            )
                        ).toFixed(2)}
                      </Typography>
                    ) : (
                      <Typography sx={{ fontWeight: "bold" }}>
                        Rs 0.00
                      </Typography>
                    )}
                  </NumberDiv>
                </Col>
                <Col sm={2} className="pl-0">
                  <NumberDiv>
                    <Typography sx={{ color: "#595959" }}>
                      Total Orders
                    </Typography>
                    {salesSummeryByDateList.salesSummeryByDateList &&
                    salesSummeryByDateList.salesSummeryByDateList.length > 0 ? (
                      <Typography sx={{ fontWeight: "bold" }}>
                        {salesSummeryByDateList.salesSummeryByDateList
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0)}
                      </Typography>
                    ) : (
                      <Typography sx={{ fontWeight: "bold" }}>0</Typography>
                    )}
                  </NumberDiv>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col sm={12} className="pl-0">
                  {salesSummeryByDateList &&
                  salesSummeryByDateList.salesSummeryByDateList &&
                  salesSummeryByDateList.salesSummeryByDateList.length > 0 ? (
                    <>
                      <SalesOverTimeChart></SalesOverTimeChart>
                    </>
                  ) : (
                    <div className="mb-3 pl-3 pt-3">
                      <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                        Sales Over Time
                      </Typography>
                      <Alert severity="warning" className="mt-4">
                        No reports to show!
                      </Alert>
                    </div>
                  )}
                </Col>
              </Row>
              {/* <Row>
                <Col sm={6} className="pl-0">
                  {allReports.salesSummeryByDishType &&
                  allReports.salesSummeryByDishType.length > 0 ? (
                    <TopSellingDishTable></TopSellingDishTable>
                  ) : (
                    <div className="mb-3 pl-3 pt-3">
                      <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                        Top Selling Dish
                      </Typography>
                      <Alert severity="warning" className="mt-4">
                        No reports to show!
                      </Alert>
                    </div>
                  )}
                </Col>
                <Col sm={6} className="pl-0">
                  {allReports.salesSummeryByCustomer &&
                  allReports.salesSummeryByCustomer.length > 0 ? (
                    <TopPayingCustomerTable></TopPayingCustomerTable>
                  ) : (
                    <div className="mb-3 pl-3 pt-3">
                      <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                        Top Paying Customer
                      </Typography>
                      <Alert severity="warning" className="mt-4">
                        No reports to show!
                      </Alert>
                    </div>
                  )}
                </Col>
              </Row> */}
              <Row>
                <Col sm={12} className="pl-0">
                  {orderSources &&
                  Object.keys(salesSummeryByOrderSource).length > 0 &&
                  salesSummeryByOrderSource.salesSummeryByOrderSource &&
                  salesSummeryByOrderSource.salesSummeryByOrderSource.length >
                    0 ? (
                    <>
                      <SalesRevenueByChanelChart></SalesRevenueByChanelChart>
                    </>
                  ) : (
                    <div className="mb-3 pl-3 pt-3">
                      <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                        Sales Revenue by Channels
                      </Typography>
                      <Alert severity="warning" className="mt-4">
                        No reports to show!
                      </Alert>
                    </div>
                  )}
                </Col>
              </Row>

              <Row>
                <Col sm={12} className="pl-0">
                  {salesSummeryByPaymentMode &&
                  configPaymentModes &&
                  salesSummeryByPaymentMode.length > 0 ? (
                    <RevenueByPaymentMode
                      totalOrders={
                        salesSummeryByPaymentMode &&
                        salesSummeryByPaymentMode.length
                          ? Number(
                              salesSummeryByPaymentMode
                                .map((a) => a.noOfOrders)
                                .reduce((a, b) => a + b, 0)
                            )
                          : 0
                      }
                      restaurantId={selectedStoreObj.restaurantId}
                    ></RevenueByPaymentMode>
                  ) : (
                    <div className="mb-3 pl-3 pt-3">
                      <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                        Revenue By Payment Mode
                      </Typography>
                      <Alert severity="warning" className="mt-4">
                        No reports to show!
                      </Alert>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </>
        ) : (
          <>
            <Alert severity="warning" className="mt-4">
              No reports to show! Please select a store!
            </Alert>
          </>
        )}
      </Layout>
    </div>
  );
};
