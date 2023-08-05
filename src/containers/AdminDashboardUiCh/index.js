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
// import { SalesOverTimeChart } from "../../components/SalesOverTimeChart";
import { SalesOverTimeChart } from "../../components/SalesOverTimeChartUiCh";
// import { SalesRevenueByChanelChart } from "../../components/SalesRevenueByChanelChart";
import { SalesRevenueByChanelChart } from "../../components/SalesRevenueByChanelChartUiCh";

// import { RevenueByPaymentMode } from "../../components/RevenueByPaymentMode";
import { RevenueByPaymentMode } from "../../components/RevenueByPaymentModeUiCh";

import { useMediaQuery } from "react-responsive";


import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Chart } from "react-google-charts";
import sale_tile_rupee from "../../img/sale_tile_rupee.png";
import sales_graph_image from "../../img/sales_graph_image.png";
import order_image from "../../img/order_image.png";

import cancelled_order_img from "../../img/cancelled_order_img.png";
import dollar_sign from "../../img/dollar_sign.png";
import order_not_paid_image from "../../img/order_not_paid_image.png";
import rupee_tile_image from "../../img/rupee_tile_image.png";


import {
  getAllReports,
  getSalesSummeryByDateListReports,
  getSalesSummeryByOrderSourceReports,
  getSalesSummeryByPaymentModeReports,
  getPaymentModeConfigDetails,
  getDashboardSummary,
  getSalesSummeryByOfferCodeReports,
  getOffersByStatusCall
} from "../../actions";
import DropdownMenu from "@atlaskit/dropdown-menu";
import "./style.css";
import { UserEntitlement } from "../UserEntitlement";

const CusMenuItem = styled(MenuItem)``;

const CusDDT = styled(Dropdown.Toggle)`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.75;
  font-family: Roboto Condensed, sans-serif;
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
  const isMobile = useMediaQuery({ query: `(max-width: 1224px)` });

  // const scrWidth = window.screen.width;

  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const orderSources = useSelector((state) => state.user.orderSources);
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const allReports = useSelector((state) => state.report.allReports);
  const offersData = useSelector((state) => state.user.offersData);
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

  const reportSalesSummaryByOfferCode = useSelector(
    (state) => state.report.reportSalesSummaryByOfferCode
  );

  const dashboardSummaryReport = useSelector(
    (state) => state.report.dashboardSummaryReport
  );

  // console.log("+++++++++++++++++++++++");
  // console.log(dashboardSummaryReport.reportDashboardSummery);
  // if(dashboardSummaryReport.reportDashboardSummery != null){
  // console.log(dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails);
  // }
  // console.log("+++++++++++++++++++++++");

  const dashBoardData = {
    datasets: dashboardSummaryReport.reportDashboardSummery
      ? [
          {
            total_sales: dashboardSummaryReport.reportDashboardSummery[0].total_sales,
            total_orders: dashboardSummaryReport.reportDashboardSummery[0].total_orders,
            orders_not_paid: dashboardSummaryReport.reportDashboardSummery[0].orders_not_paid,
            orders_cancelled: dashboardSummaryReport.reportDashboardSummery[0].orders_cancelled,
            avg_order_value: dashboardSummaryReport.reportDashboardSummery[0].avg_order_value,
            outstanding_amount: dashboardSummaryReport.reportDashboardSummery[0].outstanding_amount,
            cancelled_amount: dashboardSummaryReport.reportDashboardSummery[0].cancelled_amount
          },
        ]
      : [],
  };

  const [selectedStore, setSelectedStore] = useState(
    user.roleCategory === "SUPER_ADMIN"
      ? "ALL"
      : stores?.find(
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
    storeId: user.roleCategory === "SUPER_ADMIN" ? "ALL" : user.storeId,
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
          user.restaurantId,
          selectedStoreObj.storeId,
          `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
          }-${dateState[0].startDate.getDate()}`,
          `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
          }-${dateState[0].endDate.getDate()}`,
          user.loginId
        )
      );

      dispatch(
        getSalesSummeryByOfferCodeReports(
          user.restaurantId,
          selectedStoreObj.storeId,
          `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
          }-${dateState[0].startDate.getDate()}`,
          `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
          }-${dateState[0].endDate.getDate()}`,
          user.loginId
        )
      );

      dispatch(
        getSalesSummeryByOrderSourceReports(
          user.restaurantId,
          selectedStoreObj.storeId,
          `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
          }-${dateState[0].startDate.getDate()}`,
          `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
          }-${dateState[0].endDate.getDate()}`,
          user.loginId
        )
      );

      dispatch(
        getSalesSummeryByDateListReports(
          UserEntitlement.restaurantId,
          selectedStoreObj.storeId,
          `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
          }-${dateState[0].startDate.getDate()}`,
          `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
          }-${dateState[0].endDate.getDate()}`,
          user.loginId
        )
      );

      dispatch(
        getDashboardSummary(
          user.restaurantId,
          selectedStoreObj.storeId,
          `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
          }-${dateState[0].startDate.getDate()}`,
          `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
          }-${dateState[0].endDate.getDate()}`,
          user.loginId
        )
      );

    }

    dispatch(
      getPaymentModeConfigDetails(
        selectedStoreObj ? user.restaurantId : "ALL"
      )
    );

    dispatch(getOffersByStatusCall(user.restaurantId,selectedStoreObj.storeId));
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
        restaurantId: user.restaurantId, //CHANGE --ALL
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
        user.restaurantId,
        store.storeId,
        `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`,
        user.loginId
      )
    );

    dispatch(
      getSalesSummeryByOrderSourceReports(
        user.restaurantId,
        store.storeId,
        `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`,
        user.loginId
      )
    );

    dispatch(
      getSalesSummeryByPaymentModeReports(
        user.restaurantId,
        store.storeId,
        `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`,
        user.loginId
      )
    );

    dispatch(
      getSalesSummeryByOfferCodeReports(
        user.restaurantId,
        store.storeId,
        `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`,
        user.loginId
      )
    );

    dispatch(
      getDashboardSummary(
        user.restaurantId,
        store.storeId,
        `${dateState[0].startDate.getFullYear()}-${dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`,
        user.loginId
      )
    );

    dispatch(getPaymentModeConfigDetails(store ? store.restaurantId : "ALL"));
    dispatch(getOffersByStatusCall(user.restaurantId,store.storeId));
  };

  /**
   * Offer Code Graph
   */
  const offer_data = [["offercode", "Sales",{ role: "annotation", type: "number" }]];
  
  // const getOffersDataFormatted = () => {
  //   if(reportSalesSummaryByOfferCode != null || reportSalesSummaryByOfferCode != undefined){
  //   if (
  //     offersData && reportSalesSummaryByOfferCode != null && 
  //     Object.keys(reportSalesSummaryByOfferCode).length > 0 &&
  //     reportSalesSummaryByOfferCode &&
  //     reportSalesSummaryByOfferCode.length > 0
  //   ) {
  //     for (let i = 0; i < offersData.length; i++) {
  //       var source = offersData[i].offerCode;
  //       var value = 0;
  //       let foundMatch = reportSalesSummaryByOfferCode
  //         .filter(function (el) {
  //           return el.coupon_code === offersData[i].offerCode;
  //         })
  //         .map((a) => a.order_value);
          
  //       if (foundMatch.length > 0) {
  //         value = foundMatch.reduce((a, b) => a + b, 0);
  //       } else {
  //         value = 0;
  //       }
  //       offer_data.push([source,value,value]);
  //     }
  //   }
  // }
  //   return offer_data;
  // };


  const getOffersDataFormatted = () => {
    if(reportSalesSummaryByOfferCode != null || reportSalesSummaryByOfferCode != undefined){
    if (
      reportSalesSummaryByOfferCode != null && 
      Object.keys(reportSalesSummaryByOfferCode).length > 0 &&
      reportSalesSummaryByOfferCode &&
      reportSalesSummaryByOfferCode.length > 0
    ) {
      for (let i = 0; i < reportSalesSummaryByOfferCode.length; i++) {
        var source = reportSalesSummaryByOfferCode[i].coupon_code;
        var value = 0;
        let foundMatch = reportSalesSummaryByOfferCode
          .filter(function (el) {
            return el.coupon_code;
          })
          .map((a) => a.order_value);
          
        if (foundMatch.length > 0) {
          value = foundMatch.reduce((a, b) => a + b, 0);
        } else {
          value = 0;
        }
        offer_data.push([source,value,value]);
      }
    }
  }
    return offer_data;
  };

  const finalOfferData = getOffersDataFormatted();

  var OfferOptionsBar = {
    title: "Sales by Offer Code",
    bar: {groupWidth: "50%"},
    // colors: ['#86BEDA','#007AA2'],
    colors: ['#007AA2'],

    width:'100%',
    height:'350',
    legend: 'none',
    hAxis: {
      titleTextStyle: {
          fontName: 'Roboto Condensed, sans-serif',
          fontSize: 9,
          bold: true,
          italic: false
      },
      textStyle : {
            fontSize: 9,
            fontName:'Roboto Condensed, sans-serif',
            bold: true,
        }
  },
  vAxis: {
    textPosition: 'none',
    gridlines: {
        color: 'transparent'
    }
  },
  annotations: {
    textStyle: {
      fontName:'Roboto Condensed, sans-serif',
      bold: true,
      fontSize: 11,
      color: '#000',
    }
  },
  chartArea: {
    height: "80%",
    width: "95%"
},
  };


  //---------


  const primaryData = [["store","orders",{ role: "annotation", type: "number" }]];
  const getOrdersData = () =>{

    if (
      Object.keys(dashboardSummaryReport).length > 0 &&
      dashboardSummaryReport.reportDashboardSummery &&
      dashboardSummaryReport.reportDashboardSummery.length > 0
    ) {
      for (let i = 0; i < dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails.length; i++) {
        var source = dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails[i].store_name;
        var value = dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails[i].total_orders;
        primaryData.push([source,value,value]);
      }
    }

    return primaryData;

  }

  const ordersData = getOrdersData();

  // console.log("***********ordersData**************");
  // console.log(ordersData);
  // console.log("***********END*******");

 /**
   * Generate Data for Avg Order Value Chart
   */
  const avgPrimaryData = [["store","orders",{ role: "annotation", type: "number" }]];
  // const getAvgOrderValuesData = () =>{

  //   if (
  //     Object.keys(salesSummeryByDateList).length > 0 &&
  //     salesSummeryByDateList.salesSummeryByDateList &&
  //     salesSummeryByDateList.salesSummeryByDateList.length > 0
  //   ) {
  //     for (let i = 0; i < salesSummeryByDateList.salesSummeryByDateList.length; i++) {
  //       var source = salesSummeryByDateList.salesSummeryByDateList[i].restaurantName;
  //       var value = Number(
  //         Number(
  //           salesSummeryByDateList.salesSummeryByDateList[i].orderValue
  //         ) /
  //           Number(
  //             salesSummeryByDateList.salesSummeryByDateList[i].noOfOrders
  //           )
  //       ).toFixed(2);
  //       avgPrimaryData.push([source,Number(value),value]);
  //     }
  //   }

  //   return avgPrimaryData;

  // }
  // const avgOrdersValueData = getAvgOrderValuesData();



  const getAvgOrderValuesData = () =>{

    if (
      Object.keys(dashboardSummaryReport).length > 0 &&
      dashboardSummaryReport.reportDashboardSummery &&
      dashboardSummaryReport.reportDashboardSummery.length > 0
    ) {
      for (let i = 0; i < dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails.length; i++) {
        var source = dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails[i].store_name;
        var value = dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails[i].avg_order_value;
        avgPrimaryData.push([source,Number(value),value]);
      }
    }

    return avgPrimaryData;

  }
  const avgOrdersValueData = getAvgOrderValuesData();

  // console.log("***********avgOrdersValueData**************");
  // console.log(avgOrdersValueData);
  // console.log("***********END*******");


  /**
   * Data Format for Sale over Time
   */
   const salesPrimaryData = [["store", "Value",{ role: "annotation", type: "string" }]];
   const getSalesData = () =>{

    if (
      Object.keys(dashboardSummaryReport).length > 0 &&
      dashboardSummaryReport.reportDashboardSummery &&
      dashboardSummaryReport.reportDashboardSummery.length > 0
    ) {
      for (let i = 0; i < dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails.length; i++) {
        var source = dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails[i].store_name;
        var value = dashboardSummaryReport.reportDashboardSummery[0].reportDashboardDetails[i].total_sales;
        salesPrimaryData.push([source,Number(value),value]);
      }
    }

    return salesPrimaryData;

  }
  const salesChartData = getSalesData();

  // console.log("***********salesChartData**************");
  // console.log(salesChartData);
  // console.log("***********END*******");

  var optionsSales = {
    title: "Sales",
    bar: {groupWidth: "50%"},
    colors: ['#38b6ff'],
    width:'100%',
    height:'490',
    legend: 'none',
    vAxis: {
      // title: 'Stores',
      titleTextStyle: {
          fontName: 'Roboto Condensed, sans-serif',
          fontSize: 9,
          bold: true,
          italic: false
      },
      textStyle : {
            fontSize: 9,
            fontName:'Roboto Condensed, sans-serif',
            bold: true,
        }
  },
  annotations: {
    textStyle: {
      fontName:'Roboto Condensed, sans-serif',
      bold: true,
      fontSize: 11,
      color: '#000',
    }
  },
  hAxis: {
    textPosition: 'none',
    viewWindow: {
      min: 0,
    },
    gridlines: {
        color: 'transparent',
        // count: 10
    }
  },
  };


  var optionsOrder = {
    title: "Orders count",
    bar: {groupWidth: "50%"},
    colors: ['#8c52ff'],
    width:'100%',
    height:'490',
    legend: 'none',
    vAxis: {
      // title: 'Stores',
      titleTextStyle: {
          fontName: 'Roboto Condensed, sans-serif',
          fontSize: 9,
          bold: true,
          italic: false
      },
      textStyle : {
            fontSize: 9,
            fontName:'Roboto Condensed, sans-serif',
            bold: true,
        }
  },
  annotations: {
    textStyle: {
      fontName:'Roboto Condensed, sans-serif',
      bold: true,
      fontSize: 11,
      color: '#000',
    }
  },
  hAxis: {
    textPosition: 'none',
    viewWindow: {
      min: 0,
    },
    gridlines: {
        color: 'transparent',
    }
  },
  };

  var optionsAvgOrderValue = {
    title: "Avg. Order Value",
    bar: {groupWidth: "50%"},
    colors: ['#03998e'],
    width:'100%',
    height:'490',
    legend: 'none',
  //   backgroundColor: {
  //     'fill': '#F4F4F4',
  //     'opacity': 100
  //  },
    vAxis: {
      // title: 'Stores',
      titleTextStyle: {
          fontName: 'Roboto Condensed, sans-serif',
          fontSize: 9,
          bold: true,
          italic: false
      },
      textStyle : {
            fontSize: 9,
            fontName:'Roboto Condensed, sans-serif',
            bold: true,
        }
  },
  annotations: {
    textStyle: {
      fontName:'Roboto Condensed, sans-serif',
      bold: true,
      fontSize: 11,
      color: '#000',
      // The color of the text outline.
      // auraColor: '#d799ae',
      // The transparency of the text.
      // opacity: 0.8
    }
  },
  hAxis: {
    textPosition: 'none',
    viewWindow: {
      min: 0,
    },
    gridlines: {
        color: 'transparent',
        // count: 10
    }
  },
  };


  return (
    <div>
      <Layout sidebar headerTitle="Admin Dashboard">
        <div>
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

             {/* <Col style={{backgroundColor:'red'}} sm={3} className="m-0 p-0"> */}
              <FormControl style={{backgroundColor:'',marginLeft:"10px", width:"25%"}} >
                <InputLabel
                  sx={{ fontSize: "0.75rem", lineHeight: "2rem",marginTop:'1px'}}
                  id="demo-simple-select-label"
                >
                  Please select the store
                </InputLabel>
                <Select size = 'small'
                  sx={{ fontSize: "0.75rem", lineHeight: "1rem", width:"100%", marginTop:'3px'  }}
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
                        restaurantId: user.restaurantId, // CHANGE --ALL
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
                      </span>
                    </CusMenuItem>
                  ))}
                </Select>
              </FormControl>
            {/* </Col> */}
            <Col style={{width:'40%'}} sm={4}>
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

       
      
        {!dashboardSummaryReport && !selectedStoreObj ? (
          <>
          <Alert severity="warning" className="mt-4">
            No reports to show! Please select a store!
          </Alert>
          </>
        ) : (
          <>
            {/* -------------- Tiles UI Start ------------- */}
            { !isMobile ? (
            <>
            <div style={{ maxWidth: '100%', justifyContent:'center'}}>
              <Row>
                <Col className="mainColStyle" style={{ maxWidth: '50%', backgroundColor: '' }}>
                {
                  Object.keys(dashboardSummaryReport).length > 0 &&
                  dashboardSummaryReport.reportDashboardSummery &&
                  dashboardSummaryReport.reportDashboardSummery.length > 0 ? (
                  <Row className="tilesRowStyle">
                    <Col className="tilesMainColStyle" style={{ backgroundColor: ''}}>
                      <div className="totalSalesTile">
                        <div className="totalSaleFirstDiv">
                          <img className="totalSaleRupeeImgStyle" src={sale_tile_rupee} alt="salerupee"></img>
                          <div className="totalSaleSpanDiv">
                            <span className="totalSaleTitleSpanStyle">Total Sales</span>
                          </div>
                        </div>
                        <div className="totalSaleMiddleDiv">
                            <span className="totalSaleValueSpanStyle">{dashBoardData.datasets[0].total_sales}</span>
                        </div>
                        <div className="totalSaleSecondDiv">
                          <img className="totalSaleGraphImgStyle" src={sales_graph_image} alt="salegraph"></img>
                        </div>
                      </div>
                    </Col>
                    <Col className="tilesMainColStyle" style={{ backgroundColor: '' }}>
                      <Col className="threeTilesStyle tempstyle1 baseTileStyle">
                        <img className="tileImageStyle" src={order_image} alt="orderimg"></img>
                        <div className="labelDivStyle">
                          <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">Total Orders</span>
                          <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].total_orders}</span>
                        </div>
                      </Col>
                      <Col className="threeTilesStyle tempstyle2 baseTileStyle">
                        <img className="tileImageStyle" src={order_not_paid_image} alt="orderimg"></img>
                        <div className="labelDivStyle">
                          <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">#Orders (Not Paid)</span>
                          <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].orders_not_paid}</span>
                        </div>
                      </Col>
                      <Col className="threeTilesStyle tempstyle3 baseTileStyle">
                       <img className="tileImageStyle" src={cancelled_order_img} alt="orderimg"></img>
                        <div className="labelDivStyle">
                          <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">#Orders Cancelled</span>
                          <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].orders_cancelled}</span>
                        </div>
                      </Col>
                    </Col>
                    <Col className="tilesMainColStyle" style={{ backgroundColor: '' }}>
                      <Col className="threeTilesStyle tempstyle1 baseTileStyle">
                        <img className="tileImageStyle" src={rupee_tile_image} alt="orderimg"></img>
                        <div className="labelDivStyle">
                          <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">Avg Order Vlaue</span>
                          <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].avg_order_value}</span>
                        </div>
                      </Col>
                      <Col className="threeTilesStyle tempstyle2 baseTileStyle">
                        <img className="tileImageStyle" src={rupee_tile_image} alt="orderimg"></img>
                        <div className="labelDivStyle">
                          <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">Outstanding Amt.</span>
                          <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].outstanding_amount}</span>
                        </div>
                      </Col>
                      <Col className="threeTilesStyle tempstyle3 baseTileStyle">
                        <img className="tileImageStyle" src={dollar_sign} alt="orderimg"></img>
                        <div className="labelDivStyle">
                          <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">Cancelled Amt.</span>
                          <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].cancelled_amount}</span>
                        </div>
                      </Col>
                    </Col>
                  </Row>
                  ): (
                    <div className="mb-3 pl-3 pt-3">
                        <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                          Dashboard Summary
                        </Typography>
                        <Alert severity="warning" className="mt-4">
                          No Data to show!
                        </Alert>
                      </div>
                  )}
                </Col>
                <Col style={{ maxWidth: '50%', backgroundColor:''}}>
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
                          Sales by Channels
                        </Typography>
                        <Alert severity="warning" className="mt-4">
                          No reports to show!
                        </Alert>
                      </div>
                    )}
                </Col>
              </Row>
            </div>
            <div>

              <Row style={{height:'520px', backgroundColor: '', marginTop: '0px' }}>
                <Col className="secondColStyle" style={{ backgroundColor: '' }}>
                  <div>
                    {dashboardSummaryReport && salesChartData.length > 1 &&
                      dashboardSummaryReport.reportDashboardSummery &&
                      dashboardSummaryReport.reportDashboardSummery.length > 0 ? (
                      <>
                        {/* <SalesOverTimeChart></SalesOverTimeChart> */}
                        <div style={{marginTop:'10px'}}>
                          <Chart
                            chartType="BarChart"
                            data={salesChartData}
                            options={optionsSales}
                          />
                        </div>
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
                  </div>
                </Col>
                <Col className="secondColStyle" style={{ backgroundColor: '' }}>
                  <div>
                    {dashboardSummaryReport && ordersData.length > 1 &&
                      dashboardSummaryReport.reportDashboardSummery &&
                      dashboardSummaryReport.reportDashboardSummery.length > 0 ? (
                      <>
                        <div style={{marginTop:'10px'}}>
                          <Chart
                            chartType="BarChart"
                            data={ordersData}
                            options={optionsOrder}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="mb-3 pl-3 pt-3">
                        <Typography sx={{ fontWeight: "bold", color: "" }}>
                          Sales Over Time
                        </Typography>
                        <Alert severity="warning" className="mt-4">
                          No reports to show!
                        </Alert>
                      </div>
                    )}
                  </div>
                </Col>
                <Col className="secondColStyle" style={{ backgroundColor: '' }}>
                  <div >
                    {dashboardSummaryReport && avgOrdersValueData.length > 1 &&
                      dashboardSummaryReport.reportDashboardSummery &&
                      dashboardSummaryReport.reportDashboardSummery.length > 0 ? (
                      <>
                        <div style={{marginTop:'10px'}}>
                          <Chart
                            chartType="BarChart"
                            data={avgOrdersValueData}
                            options={optionsAvgOrderValue}
                          />
                        </div>
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
                  </div>
                </Col>
              </Row>
            </div>

            <div style={{height:'520px', backgroundColor: '', marginTop: '0px' }}>
              <Row>
                <Col style={{ maxWidth: '50%',height:'500px', backgroundColor: '', marginTop:'0px'}}>
                  {salesSummeryByPaymentMode &&
                    configPaymentModes &&
                    salesSummeryByPaymentMode.length > 0 ? (
                      <RevenueByPaymentMode></RevenueByPaymentMode>
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
                <Col style={{ maxWidth: '50%', backgroundColor:''}}>
                  {reportSalesSummaryByOfferCode != undefined || reportSalesSummaryByOfferCode != null ? (<>
                        { 
                          Object.keys(reportSalesSummaryByOfferCode).length > 0 && finalOfferData.length > 1 &&
                          reportSalesSummaryByOfferCode &&
                          reportSalesSummaryByOfferCode.length > 0
                           ? (
                        <>
                        <div >
                          <Chart
                            chartType="ColumnChart"
                            data={finalOfferData}
                            options={OfferOptionsBar}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="mb-3 pl-3 pt-3">
                        <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                          Sales by Offer Code
                        </Typography>
                        <Alert severity="warning" className="mt-4">
                          No reports to show!
                        </Alert>
                      </div>
                    )}</>):(<div className="mb-3 pl-3 pt-3">
                    <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                      Sales by Offer Code
                    </Typography>
                    <Alert severity="warning" className="mt-4">
                      No reports to show!
                    </Alert>
                  </div>)}
                </Col>
              </Row>
            </div>
            </>
            ) : (
              <>
              <div style={{ minWidth:800, justifyContent:'center'}}>
                <Col>
                  <Col className="mainColStyle" style={{ maxWidth: '100%', backgroundColor: '' }}>
                  {
                    Object.keys(dashboardSummaryReport).length > 0 &&
                    dashboardSummaryReport.reportDashboardSummery &&
                    dashboardSummaryReport.reportDashboardSummery.length > 0 ? (
                    <Row className="tilesRowStyle">
                      <Col className="tilesMainColStyle" style={{ backgroundColor: ''}}>
                        <div className="totalSalesTile">
                          <div className="totalSaleFirstDiv">
                            <img className="totalSaleRupeeImgStyle" src={sale_tile_rupee} alt="salerupee"></img>
                            <div className="totalSaleSpanDiv">
                              <span className="totalSaleTitleSpanStyle">Total Sales</span>
                            </div>
                          </div>
                          <div className="totalSaleMiddleDiv">
                              <span className="totalSaleValueSpanStyle">{dashBoardData.datasets[0].total_sales}</span>
                          </div>
                          <div className="totalSaleSecondDiv">
                            <img className="totalSaleGraphImgStyle" src={sales_graph_image} alt="salegraph"></img>
                          </div>
                        </div>
                      </Col>
                      <Col className="tilesMainColStyle" style={{ backgroundColor: '' }}>
                        <Col className="threeTilesStylMobile tempstyle1 baseTileStyle">
                          <img className="tileImageStyleMobile" src={order_image} alt="orderimg"></img>
                          <div className="labelDivStyle">
                            <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">Total Orders</span>
                            <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].total_orders}</span>
                          </div>
                        </Col>
                        <Col className="threeTilesStylMobile tempstyle2 baseTileStyle">
                          <img className="tileImageStyleMobile" src={order_not_paid_image} alt="orderimg"></img>
                          <div className="labelDivStyle">
                            <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">#Orders (Not Paid)</span>
                            <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].orders_not_paid}</span>
                          </div>
                        </Col>
                        <Col className="threeTilesStylMobile tempstyle3 baseTileStyle">
                         <img className="tileImageStyleMobile" src={cancelled_order_img} alt="orderimg"></img>
                          <div className="labelDivStyle">
                            <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">#Orders Cancelled</span>
                            <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].orders_cancelled}</span>
                          </div>
                        </Col>
                      </Col>
                      <Col className="tilesMainColStyle" style={{ backgroundColor: '' }}>
                        <Col className="threeTilesStylMobile tempstyle1 baseTileStyle">
                          <img className="tileImageStyleMobile" src={rupee_tile_image} alt="orderimg"></img>
                          <div className="labelDivStyle">
                            <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">Avg Order Vlaue</span>
                            <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].avg_order_value}</span>
                          </div>
                        </Col>
                        <Col className="threeTilesStylMobile tempstyle2 baseTileStyle">
                          <img className="tileImageStyleMobile" src={rupee_tile_image} alt="orderimg"></img>
                          <div className="labelDivStyle">
                            <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">Outstanding Amt.</span>
                            <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].outstanding_amount}</span>
                          </div>
                        </Col>
                        <Col className="threeTilesStylMobile tempstyle3 baseTileStyle">
                          <img className="tileImageStyleMobile" src={dollar_sign} alt="orderimg"></img>
                          <div className="labelDivStyle">
                            <span style={{fontWeight:'500', fontSize:'16px',marginTop:'5%'}} className="baseSpanStyle">Cancelled Amt.</span>
                            <span style={{fontWeight:'900', fontSize:'25px',marginTop:'2px'}} className="baseSpanStyle">{dashBoardData.datasets[0].cancelled_amount}</span>
                          </div>
                        </Col>
                      </Col>
                    </Row>
                    ): (
                      <div className="mb-3 pl-3 pt-3">
                          <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                            Dashboard Summary
                          </Typography>
                          <Alert severity="warning" className="mt-4">
                            No Data to show!
                          </Alert>
                        </div>
                    )}
                  </Col>
                  <Col style={{ maxWidth: '100%', backgroundColor:''}}>
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
                            Sales by Channels
                          </Typography>
                          <Alert severity="warning" className="mt-4">
                            No reports to show!
                          </Alert>
                        </div>
                      )}
                  </Col>
                </Col>
              </div>
              <div>
  
                <Col style={{height:'520px', backgroundColor: '', marginTop: '0px' }}>
                  <Col className="secondColStyleMobile" style={{ backgroundColor: '' }}>
                    <div>
                      {dashboardSummaryReport && salesChartData.length > 1 &&
                        dashboardSummaryReport.reportDashboardSummery &&
                        dashboardSummaryReport.reportDashboardSummery.length > 0 ? (
                        <>
                          {/* <SalesOverTimeChart></SalesOverTimeChart> */}
                          <div style={{marginTop:'10px'}}>
                            <Chart
                              chartType="BarChart"
                              data={salesChartData}
                              options={optionsSales}
                            />
                          </div>
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
                    </div>
                  </Col>
                  <Col className="secondColStyleMobile" style={{ backgroundColor: '' }}>
                    <div>
                      {dashboardSummaryReport && ordersData.length > 1 &&
                        dashboardSummaryReport.reportDashboardSummery &&
                        dashboardSummaryReport.reportDashboardSummery.length > 0 ? (
                        <>
                          <div style={{marginTop:'10px'}}>
                            <Chart
                              chartType="BarChart"
                              data={ordersData}
                              options={optionsOrder}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="mb-3 pl-3 pt-3">
                          <Typography sx={{ fontWeight: "bold", color: "" }}>
                            Sales Over Time
                          </Typography>
                          <Alert severity="warning" className="mt-4">
                            No reports to show!
                          </Alert>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col className="secondColStyleMobile" style={{ backgroundColor: '' }}>
                    <div >
                      {dashboardSummaryReport && avgOrdersValueData.length > 1 &&
                        dashboardSummaryReport.reportDashboardSummery &&
                        dashboardSummaryReport.reportDashboardSummery.length > 0 ? (
                        <>
                          <div style={{marginTop:'10px'}}>
                            <Chart
                              chartType="BarChart"
                              data={avgOrdersValueData}
                              options={optionsAvgOrderValue}
                            />
                          </div>
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
                    </div>
                  </Col>

                  <Col style={{ maxWidth: '100%',height:'500px', backgroundColor: '', marginTop:'0px'}}>
                    {salesSummeryByPaymentMode &&
                      configPaymentModes &&
                      salesSummeryByPaymentMode.length > 0 ? (
                        <RevenueByPaymentMode></RevenueByPaymentMode>
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
                </Col>
              </div>
  
              {/* <div style={{height:'520px', backgroundColor: '', marginTop: '0px' }}>
                <Col>
                  <Col style={{ maxWidth: '45%',height:'500px', backgroundColor: '', marginTop:'0px'}}>
                    {salesSummeryByPaymentMode &&
                      configPaymentModes &&
                      salesSummeryByPaymentMode.length > 0 ? (
                        <RevenueByPaymentMode></RevenueByPaymentMode>
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
                </Col>
              </div> */}
              </>
            ) }
          </>
        )}
      </Layout>
    </div>
  );
};
