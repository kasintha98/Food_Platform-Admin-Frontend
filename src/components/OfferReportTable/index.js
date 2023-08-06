import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReports, getSalesSummeryByOfferCodeReports } from "../../actions";
import styled from "@emotion/styled";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Alert,
  Button,
  Typography,
} from "@mui/material";
import { Row, Col, Modal } from "react-bootstrap";
import Pdf from "react-to-pdf";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #ffc000;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
  padding: 0;
`;

const CusTableCell3 = styled(TableCell)`
  font-size: 0.75rem;
  max-width: 120px;
  word-wrap: break-word;
`;

const CusTableCell5 = styled(TableCell)`
  font-size: 0.75rem;
  background-color: #6c757d;
  color: #fff;
  font-weight: bold;
`;

export const OfferReportTable = (props) => {
  //const orders = useSelector((state) => state.order.orders);
  const allReports = useSelector((state) => state.report.allReports);
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.order.loading);
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [height, setHeight] = useState(0);

  const reportSalesSummaryByOfferCode = useSelector(
    (state) => state.report.reportSalesSummaryByOfferCode
  );

  const dispatch = useDispatch();
  const ref = React.createRef();
  const refH = useRef(null);
  const componentRef = useRef();

  useEffect(() => {
    //replace getCustomerOrders data with getAllReports data
    // dispatch(
    //   getAllReports(
    //     props.restaurantId ? props.restaurantId : "ALL",
    //     props.storeId ? props.storeId : "ALL",
    //     `${props.startDate.getFullYear()}-${
    //       props.startDate.getMonth() + 1
    //     }-${props.startDate.getDate()}`,
    //     `${props.endDate.getFullYear()}-${
    //       props.endDate.getMonth() + 1
    //     }-${props.endDate.getDate()}`,
    //     props.selectedReport
    //   )
    // );

    dispatch(
        getSalesSummeryByOfferCodeReports(
          user.restaurantId,
          props.storeId ? props.storeId : "ALL",
          `${props.startDate.getFullYear()}-${props.startDate.getMonth() + 1
          }-${props.startDate.getDate()}`,
          `${props.endDate.getFullYear()}-${props.endDate.getMonth() + 1
          }-${props.endDate.getDate()}`,
          user.loginId
        )
      );

  }, [
    props.restaurantId,
    props.storeId,
    props.endDate,
    props.startDate,
    props.selectedReport,
  ]);

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  const options = {
    unit: "px",
    format: [265, height],
  };

  const renderNowDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      <span>
        {day}/{month.toUpperCase()}/{year}
      </span>
    );
  };

  const renderNowTime = (date) => {
    const dateObj = new Date(date);
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
  };

  const getItemString = (items) => {
    let str = "";

    for (let i = 0; i < items.length; i++) {
      str = str + `${items[i].productName}-${items[i].ingredient}, \n`;
    }

    return str;
  };

  const getTotalOrderNumber = () => {
    if (reportSalesSummaryByOfferCode != null && 
        Object.keys(reportSalesSummaryByOfferCode).length > 0 &&
        reportSalesSummaryByOfferCode &&
        reportSalesSummaryByOfferCode.length > 0) {
      let totalNum = 0;
      for (let i = 0; i < reportSalesSummaryByOfferCode.length; i++) {
        totalNum = totalNum + reportSalesSummaryByOfferCode[i].no_of_orders;
      }
      return totalNum;
    } else {
      return 0;
    }
  };

  const getTotalOrderAmout = () => {
    if (reportSalesSummaryByOfferCode != null && 
        Object.keys(reportSalesSummaryByOfferCode).length > 0 &&
        reportSalesSummaryByOfferCode &&
        reportSalesSummaryByOfferCode.length > 0) {
      let total = 0;
      for (let i = 0; i < reportSalesSummaryByOfferCode.length; i++) {
        total = total + reportSalesSummaryByOfferCode[i].order_value;
      }
      return total;
    } else {
      return 0;
    }
  };

  return (
    <div>
      {/* <ExcelFile element={<Button variant="text">Download Full Report</Button>}>
        <ExcelSheet data={allReports.reportOrderData} name="Orders">
          <ExcelColumn label="restaurantId" value="restaurantId" />
          <ExcelColumn label="orderStatus" value="orderStatus" />
          <ExcelColumn label="orderId" value="orderId" />
          <ExcelColumn
            label="paymentTxnReference"
            value="paymentTxnReference"
          />
          <ExcelColumn label="createdDate" value="createdDate" />
          <ExcelColumn
            label="orderReceivedDateTime"
            value="orderReceivedDateTime"
          />
          <ExcelColumn label="orderSource" value="orderSource" />
          <ExcelColumn label="orderDeliveryType" value="orderDeliveryType" />
          <ExcelColumn label="paymentStatus" value="paymentStatus" />
          <ExcelColumn label="paymentMode" value="paymentMode" />
          <ExcelColumn label="customerName" value="customerName" />
          <ExcelColumn label="mobileNumber" value="mobileNumber" />
          <ExcelColumn label="storeTableId" value="storeTableId" />
          <ExcelColumn
            label="overallPriceWithTax"
            value="overallPriceWithTax"
          />
          <ExcelColumn
            label="cgstCalculatedValue"
            value="cgstCalculatedValue"
          />
          <ExcelColumn
            label="sgstCalculatedValue"
            value="sgstCalculatedValue"
          />
          <ExcelColumn label="deliveryCharges" value="deliveryCharges" />
          <ExcelColumn label="discountCode" value="discountCode" />
          <ExcelColumn label="discountPercentage" value="discountPercentage" />
          
          <ExcelColumn
            label="orderDetails"
            value={(col) => getItemString(col.orderDetails)}
          />
          <ExcelColumn label="orderStatus" value="orderStatus" />
          <ExcelColumn label="createdBy" value="createdBy" />
          <ExcelColumn label="updatedBy" value="updatedBy" />
        </ExcelSheet>
      </ExcelFile> */}

      <ExcelFile element={<Button variant="text">Download Full Report</Button>}>
        <ExcelSheet data={reportSalesSummaryByOfferCode} name="Offer Sales">
          <ExcelColumn label="RESTAURANT NAME" value="restaurant_id" />
          <ExcelColumn label="STORE ID" value="store_id" />
          <ExcelColumn label="RESTAURANT NAME" value="restaurant_name" />
          <ExcelColumn label="OFFER CODE" value="coupon_code" />
          <ExcelColumn label="NO OF ORDERS" value="no_of_orders" />
          <ExcelColumn label="ORDER VALUE" value="order_value" />  
        </ExcelSheet>
      </ExcelFile>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">SR NO</CusTableCell1>
              <CusTableCell1 align="center">RESTAURANT ID</CusTableCell1>
              <CusTableCell1 align="center">STORE ID</CusTableCell1>
              <CusTableCell1 align="center">RESTAURANT NAME</CusTableCell1>
              <CusTableCell1 align="center"> OFFER CODE</CusTableCell1>
              <CusTableCell1 align="center">NUMBER OF ORDER</CusTableCell1>
              <CusTableCell1 align="center">ORDER VALUE</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportSalesSummaryByOfferCode != null && 
            Object.keys(reportSalesSummaryByOfferCode).length > 0 &&
            reportSalesSummaryByOfferCode &&
            reportSalesSummaryByOfferCode.length > 0 ? (
              <>
                {reportSalesSummaryByOfferCode.map((row, index) => (
                  <TableRow >
                    <CusTableCell2 align="center">{index + 1}</CusTableCell2>
                    <CusTableCell2 align="center">{row.restaurant_id}</CusTableCell2>
                    <CusTableCell2 align="center">{row.store_id}</CusTableCell2>
                    <CusTableCell2 align="center">{row.restaurant_name}</CusTableCell2>
                    <CusTableCell2 align="center">{row.coupon_code}</CusTableCell2>
                    <CusTableCell2 align="center">{row.no_of_orders}</CusTableCell2>
                    <CusTableCell2 align="center">{row.order_value}</CusTableCell2>    
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <CusTableCell2 scope="row" colspan="13">
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      ></div>
                    </div>
                  ) : (
                    <Alert severity="warning">No offer data to show!</Alert>
                  )}
                </CusTableCell2>
              </TableRow>
            )}
            <TableRow>
              <CusTableCell5 colSpan={5} align="center">TOTAL</CusTableCell5>
              <CusTableCell5 align="center">{getTotalOrderNumber()}</CusTableCell5>
              <CusTableCell5 align="center">Rs. {getTotalOrderAmout()}</CusTableCell5>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
