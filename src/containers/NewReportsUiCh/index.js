import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { DateRangePicker, DefinedRange } from "react-date-range";
import { addDays } from "date-fns";
import Layout from "../NewLayout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TopSellingDishTable } from "../../components/TopSellingDishTable";
import { TopPayingCustomerTable } from "../../components/TopPayingCustomerTable";
import { getAllReports } from "../../actions";
import DropdownMenu from "@atlaskit/dropdown-menu";
import "./style.css";
import { OrderReportTable } from "../../components/OrderReportTable";
import { SalesByDishReportTable } from "../../components/SalesByDishReportTable";
import { MenuReport } from "../../components/MenuReport";
import { CashSalesReport } from "../../components/CashSalesReport";
import { CashierSummaryReport } from "../../components/CashierSummaryReport";
import { SalesSummeryByDateListReport } from "../../components/SalesSummeryByDateListReport";
import { SalesSummeryByDishType } from "../../components/SalesSummeryByDishType";
import { SalesSummeryByOrderSourceReport } from "../../components/SalesSummeryByOrderSourceReport";
import { SalesSummeryByPaymentMode } from "../../components/SalesSummeryByPaymentMode";
import { RecipeConsumptionReport } from "../../components/RecipeConsumptionReport";
import { NonRecipeConsumptionReport } from "../../components/NonRecipeConsumptionReport";

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

const CusMenuItem = styled(MenuItem)``;

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

/* const reportTypes = [
  "Order Report",
  "Sales By Dish Item",
  "Menu Report",
  "Cash Sales Report",
  "Sales Summery By Date List",
  "Sales Summery By Order Source",
  "Sales Summery By Payment Mode",
]; */

export const NewReports = () => {
  const reportTypes = useSelector((state) => state.report.reportTypes);
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const [dateState, setDateState] = useState([
    {
      startDate:
        businessDateAll && businessDateAll.businessDate
          ? new Date(businessDateAll.businessDate)
          : new Date(),
      endDate: addDays(
        businessDateAll && businessDateAll.businessDate
          ? new Date(businessDateAll.businessDate)
          : new Date(),
        0
      ),
      key: "selection",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(
    user.roleCategory === "SUPER_ADMIN"
      ? "ALL"
      : stores?.find(
          (el) =>
            el.restaurantId === user.restaurantId && el.storeId === user.storeId
        )?.resturantName
  );
  const [selectedReport, setSelectedReport] = useState(
    /* reportTypes[0] ? reportTypes[0].configCriteriaValue : null */ ""
  );
  const [selectedReportObj, setSelectedReportObj] = useState(
    reportTypes[0] ? reportTypes[0] : null
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId:
      user.roleCategory === "SUPER_ADMIN" ? null : user.restaurantId,
    storeId: user.roleCategory === "SUPER_ADMIN" ? null : user.storeId,
  });


  const [isPresetHide, setPresetHide] = useState(false);
  // var htmlConsumptionReportIframe = '<iframe width="100%" height="600" src="https://datastudio.google.com/embed/reporting/4bf3569b-468f-4613-aaf7-6c3daee772ad/page/UUPAD" frameborder="0" style="border:0" allowfullscreen></iframe>';
  var htmlConsumptionReportIframe = '<iframe width="100%" height="600" src="https://datastudio.google.com/embed/reporting/8158a2e6-4f67-43b7-95ba-01b49ddf5ec3/page/UUPAD" frameborder="0" style="border:0" allowfullscreen></iframe>';
  var htmlInventoryStockStatusReportIframe = '<iframe width="100%" height="600" src="https://datastudio.google.com/embed/reporting/4bf3569b-468f-4613-aaf7-6c3daee772ad/page/UUPAD" frameborder="0" style="border:0" allowfullscreen></iframe>';
  var htmlCancelOrderReportIframe = '<iframe width="100%" height="600" src="https://datastudio.google.com/embed/reporting/77441cbd-12b2-4b57-b57c-6958572678e1/page/o7lAD" frameborder="0" style="border:0" allowfullscreen></iframe>';
  //const dispatch = useDispatch();

  /* useEffect(() => {
    dispatch(
      getAllReports(
        "ALL",
        "ALL",
        `${dateState[0].startDate.getFullYear()}-${
          dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${
          dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`
      )
    );
  }, [dateState]); */

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    // console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const handleChangeReport = (event) => {
    if(event.target.value === "INVENTORY STOCK STATUS" || event.target.value === "CANCELLED ORDER REPORT" ||  event.target.value === "CONSUMPTION REPORT") {
      setPresetHide(true);
    }else{
      setPresetHide(false);
    }
    
    setSelectedReport(event.target.value);
  };

  const handleReportTyeObj = (type) => {
    setSelectedReportObj(type);
  };

  return (
    <Layout sidebar headerTitle="Reports">
      <div>
        <div>
          <Row style={{ maxWidth: "100vw" }}>
            {!isPresetHide ? (
            <Col md={4}>
              <Row className="align-items-center">
                <div style={{ maxWidth: "125px !important" }}>
                  <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                    Select Date Range
                  </Typography>
                </div>
                <Col className="col-8 p-0">
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
                </Col>
              </Row>
            </Col>):null}
            {!isPresetHide ? (
            <Col md={4}>
              <Row className="align-items-center">
                <div style={{ maxWidth: "125px !important" }}>
                  <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                    Select Store
                  </Typography>
                </div>
                <Col className="col-8" style={{ display: "flex" }}>
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
                      disabled={
                        user.roleCategory === "SUPER_ADMIN" ? false : true
                      }
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
                          <span>{store.resturantName}</span>
                        </CusMenuItem>
                      ))}
                    </CusSelect>
                  </FormControl>
                </Col>
              </Row>
            </Col>):null}
            <Col md={4}>
              <Row className="align-items-center">
                <div style={{ maxWidth: "125px !important" }}>
                  <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                    Select Report
                  </Typography>
                </div>
                <Col className="col-8" style={{ display: "flex" }}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        top: "-4px",
                      }}
                      id="demo-simple-select-label"
                    >
                      Please select the report
                    </InputLabel>
                    <CusSelect
                      sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedReport}
                      label="Please select the store"
                      onChange={handleChangeReport}
                    >
                      {reportTypes.map((type) => (
                        <CusMenuItem
                          value={type.configCriteriaValue}
                          onClick={() => {
                            handleReportTyeObj(type);
                          }}
                        >
                          <span>{type.configCriteriaDesc}</span>
                        </CusMenuItem>
                      ))}
                      <CusMenuItem
                          value={"ITEM_CONSUMPTION_SUMMARY_RECIPE"}
                          onClick={() => {
                            /* handleReportTyeObj(type); */
                          }}
                        >
                          <span>Recipe Consumption Report</span>
                        </CusMenuItem>
                        <CusMenuItem
                          value={"ITEM_CONSUMPTION_SUMMARY_NONRECIPE"}
                          onClick={() => {
                            /* handleReportTyeObj(type); */
                          }}
                        >
                          <span>Non-Recipe Consumption Report</span>
                        </CusMenuItem>
                    </CusSelect>
                  </FormControl>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="mt-3">
          {selectedReport === "ORDER_REPORT" && (
            <OrderReportTable
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
            ></OrderReportTable>
          )}
          {selectedReport === "SALES_BY_DISH_ITEM" && (
            <SalesByDishReportTable
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
            ></SalesByDishReportTable>
          )}

          {selectedReport === "MENU_REPORT" && (
            <MenuReport
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
            ></MenuReport>
          )}

          {selectedReport === "CASH_SALES_REPORT" && (
            <CashSalesReport
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
            ></CashSalesReport>
          )}

          {selectedReport === "CASHIER_SUMMARY" && (
            <CashierSummaryReport
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
            ></CashierSummaryReport>
          )}

          {selectedReport === "SALES_SUMMARY_BY_DATE_LIST" && (
            <SalesSummeryByDateListReport
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
            ></SalesSummeryByDateListReport>
          )}

          {/* {selectedReport === "SALES_BY_DISH_ITEM" && (
            <SalesSummeryByDishType
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
            ></SalesSummeryByDishType>
          )} */}

          {selectedReport === "SALES_SUMMARY_BY_ORDER_SOURCE" && (
            <SalesSummeryByOrderSourceReport
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
            ></SalesSummeryByOrderSourceReport>
          )}

          {selectedReport === "SALES_SUMMARY_BY_PAYMENT_MODE" && (
            <SalesSummeryByPaymentMode
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
            ></SalesSummeryByPaymentMode>
          )}

          {selectedReport === "ITEM_CONSUMPTION_SUMMARY_RECIPE" && (
            <RecipeConsumptionReport
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
              selectedStoreObj={selectedStoreObj}
            ></RecipeConsumptionReport>
          )}

          {selectedReport === "ITEM_CONSUMPTION_SUMMARY_NONRECIPE" && (
            <NonRecipeConsumptionReport
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
              selectedReport={selectedReport}
              selectedStoreObj={selectedStoreObj}
            ></NonRecipeConsumptionReport>
          )}

          {selectedReport === "CONSUMPTION REPORT" && (
            <div style={{maxWidth:'100%',maxHeight:'1068px',minWidth:800}}>
              <div className="content" dangerouslySetInnerHTML={{__html: htmlConsumptionReportIframe}}></div>
            </div>
          )}
          {selectedReport === "INVENTORY STOCK STATUS" && (
            <div style={{maxWidth:'100%',maxHeight:'1068px',minWidth:800}}>
              <div className="content" dangerouslySetInnerHTML={{__html: htmlInventoryStockStatusReportIframe}}></div>
            </div>
          )}

          {selectedReport === "CANCELLED ORDER REPORT" && (
            <div style={{maxWidth:'100%',maxHeight:'1068px',minWidth:800}}>
            <div className="content" dangerouslySetInnerHTML={{__html: htmlCancelOrderReportIframe}}></div>
            </div>
          )}

          {!selectedReport && (
            <div>
              <Alert sx={{ marginTop: "50px" }} severity="warning">
                Please select a report!
              </Alert>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
