import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReports,
  getPaymentConfigDetailsCashierReport,
  getOrderSourceConfigDetailsCashierReport,
} from "../../actions";
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
} from "@mui/material";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #ffc000;
`;

const CusTableCell3 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #008631;
  color: #fff;
`;

const CusTableCell4 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #0044ff;
  color: #fff;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
  padding: 0;
`;

export const CashSalesReport = (props) => {
  const allReports = useSelector((state) => state.report.allReports);
  const loading = useSelector((state) => state.report.loading);
  const paymentModesForCashierReport = useSelector(
    (state) => state.user.paymentModesForCashierReport
  );
  const orderSourcesForCashierReport = useSelector(
    (state) => state.user.orderSourcesForCashierReport
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllReports(
        props.restaurantId ? props.restaurantId : "ALL",
        props.storeId ? props.storeId : "ALL",
        `${props.startDate.getFullYear()}-${
          props.startDate.getMonth() + 1
        }-${props.startDate.getDate()}`,
        `${props.endDate.getFullYear()}-${
          props.endDate.getMonth() + 1
        }-${props.endDate.getDate()}`
      )
    );

    dispatch(
      getPaymentConfigDetailsCashierReport(
        props.restaurantId ? props.restaurantId : "ALL"
      )
    );
    dispatch(
      getOrderSourceConfigDetailsCashierReport(
        props.restaurantId ? props.restaurantId : "ALL",
        props.storeId ? props.storeId : "ALL"
      )
    );
  }, [props.restaurantId, props.storeId, props.startDate, props.endDate]);

  const renderSourceTotal = (data) => {
    let totalQtyN = 0;
    let totalPriceN = 0;
    for (let i = 0; i < data.length; i++) {
      totalQtyN = totalQtyN + data[i].totalQty;
      totalPriceN = totalPriceN + data[i].totalPrice;
    }

    return (
      <>
        <span>{totalQtyN}</span>
        <br></br>
        <div style={{ borderTop: "1px solid lightgray" }}>{totalPriceN}</div>
      </>
    );
  };

  const renderPaymentTotal = (data) => {
    let totalQtyN = 0;
    let totalPriceN = 0;
    for (let i = 0; i < data.length; i++) {
      totalQtyN = totalQtyN + data[i].totalQty;
      totalPriceN = totalPriceN + data[i].totalPrice;
    }

    return (
      <>
        <span>{totalQtyN}</span>
        <br></br>
        <div style={{ borderTop: "1px solid lightgray" }}>{totalPriceN}</div>
      </>
    );
  };

  const getExcelDetailString = (details) => {
    let strOrderSource = `ORDER_SOURCE \n`;
    let strPaymentType = "\nPAYMENT_MODE\n";

    for (let i = 0; i < details.ORDER_SOURCE.length; i++) {
      strOrderSource =
        strOrderSource +
        `category - ${details.ORDER_SOURCE[i].category}, totalPrice - ${details.ORDER_SOURCE[i].totalPrice}, totalQty - ${details.ORDER_SOURCE[i].totalQty} \n`;
    }

    for (let i = 0; i < details.PAYMENT_MODE.length; i++) {
      strPaymentType =
        strPaymentType +
        `category - ${details.PAYMENT_MODE[i].category}, totalPrice - ${details.PAYMENT_MODE[i].totalPrice}, totalQty - ${details.PAYMENT_MODE[i].totalQty} \n`;
    }

    return strOrderSource + strPaymentType;
  };

  return (
    <div>
      {allReports &&
      allReports.reportCashierSummery &&
      allReports.reportCashierSummery.length > 0 ? (
        <div>
          <ExcelFile
            element={<Button variant="text">Download Full Report</Button>}
            filename="Cash Sales Report"
          >
            <ExcelSheet
              data={allReports.reportCashierSummery}
              name="Cash Sales Report"
            >
              <ExcelColumn label="CASHIER NAME" value="cashierName" />
              <ExcelColumn label="STORE NAME" value="storeName" />
              <ExcelColumn label="RESTAURANT ID" value="restaurantId" />
              <ExcelColumn label="STORE ID" value="storeId" />
              <ExcelColumn
                style={{ wrapText: true }}
                label="DETAILS"
                value={(col) => getExcelDetailString(col.details)}
              />
              {/* {orderSourcesForCashierReport.map((item) => (
                    <ExcelColumn label={item.configCriteriaDesc.details.ORDER_SOURCE}  value={(col) => getItemString(col.orderDetails)}>
                      {item.configCriteriaDesc}
                    </ExcelColumn>
                  ))} */}

              {/* <ExcelColumn label="DINE-IN" value="size" />
              <ExcelColumn label="STORE TAKE-AWAY" value="takeaway" />
              <ExcelColumn label="STORE DELIVERY" value="totalQty" />
              <ExcelColumn label="PHONE SELF-COLLECT" value="totalPrice" />
              <ExcelColumn label="PHONE DELIVERY" value="totalPrice" />
              <ExcelColumn label="TOTAL" value="dishName" />
              <ExcelColumn label="CASH" value="dishName" />
              <ExcelColumn label="PayTM" value="dishName" />
              <ExcelColumn label="EDC" value="dishName" />
              <ExcelColumn label="TOTAL" value="dishName" /> */}
            </ExcelSheet>
          </ExcelFile>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <CusTableCell1 align="center">CASHIER NAME</CusTableCell1>
                  <CusTableCell1 align="center">STORE NAME</CusTableCell1>
                  <CusTableCell1 align="center">CRITERIA</CusTableCell1>
                  {orderSourcesForCashierReport.map((item) => (
                    <CusTableCell3 align="center">
                      {item.configCriteriaDesc}
                    </CusTableCell3>
                  ))}
                  <CusTableCell3 align="center">TOTAL</CusTableCell3>
                  {paymentModesForCashierReport.map((item) => (
                    <CusTableCell4 align="center">
                      {item.configCriteriaDesc}
                    </CusTableCell4>
                  ))}
                  <CusTableCell4 align="center">TOTAL</CusTableCell4>
                </TableRow>
              </TableHead>
              <TableBody>
                {allReports.reportCashierSummery.map((row, index) => (
                  <TableRow key={index}>
                    <CusTableCell2 align="center">
                      {row.cashierName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.storeName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      # of Order <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      Amount
                    </CusTableCell2>
                    {orderSourcesForCashierReport.map((sourceItem) => (
                      <CusTableCell2 align="center">
                        {row.details.ORDER_SOURCE.find(
                          (x) => x.category === sourceItem.configCriteriaDesc
                        ) ? (
                          <>
                            <span>
                              {
                                row.details.ORDER_SOURCE.find(
                                  (x) =>
                                    x.category === sourceItem.configCriteriaDesc
                                ).totalQty
                              }
                            </span>
                            <br></br>
                            <div style={{ borderTop: "1px solid lightgray" }}>
                              {
                                row.details.ORDER_SOURCE.find(
                                  (x) =>
                                    x.category === sourceItem.configCriteriaDesc
                                ).totalPrice
                              }
                            </div>
                          </>
                        ) : (
                          "N/A"
                        )}
                      </CusTableCell2>
                    ))}

                    <CusTableCell2 align="center">
                      {renderSourceTotal(row.details.ORDER_SOURCE)}
                    </CusTableCell2>

                    {paymentModesForCashierReport.map((sourceItem) => (
                      <CusTableCell2 align="center">
                        {row.details.PAYMENT_MODE.find(
                          (x) => x.category === sourceItem.configCriteriaDesc
                        ) ? (
                          <>
                            <span>
                              {
                                row.details.PAYMENT_MODE.find(
                                  (x) =>
                                    x.category === sourceItem.configCriteriaDesc
                                ).totalQty
                              }
                            </span>
                            <br></br>
                            <div style={{ borderTop: "1px solid lightgray" }}>
                              {
                                row.details.PAYMENT_MODE.find(
                                  (x) =>
                                    x.category === sourceItem.configCriteriaDesc
                                ).totalPrice
                              }
                            </div>
                          </>
                        ) : (
                          "N/A"
                        )}
                      </CusTableCell2>
                    ))}

                    <CusTableCell2 align="center">
                      {renderPaymentTotal(row.details.PAYMENT_MODE)}
                    </CusTableCell2>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <Alert severity="warning">No reports to show!</Alert>
          )}
        </div>
      )}
    </div>
  );
};
