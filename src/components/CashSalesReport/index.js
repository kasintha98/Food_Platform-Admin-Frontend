import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReports } from "../../actions";
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
  }, [props.restaurantId, props.storeId, props.startDate, props.endDate]);

  return (
    <div>
      {allReports &&
      allReports.reportCashierSummery &&
      allReports.reportCashierSummery.length > 0 ? (
        <div>
          <ExcelFile
            element={<Button variant="text">Download Full Report</Button>}
          >
            <ExcelSheet data={[]} name="Cash Sales Report">
              <ExcelColumn label="CASHIER NAME" value="restaurantName" />
              <ExcelColumn label="STORE NAME" value="dishId" />
              <ExcelColumn label="CRITERIA" value="dishName" />
              <ExcelColumn label="DINE-IN" value="size" />
              <ExcelColumn label="STORE TAKE-AWAY" value="takeaway" />
              <ExcelColumn label="STORE DELIVERY" value="totalQty" />
              <ExcelColumn label="PHONE SELF-COLLECT" value="totalPrice" />
              <ExcelColumn label="PHONE DELIVERY" value="totalPrice" />
              <ExcelColumn label="TOTAL" value="dishName" />
              <ExcelColumn label="CASH" value="dishName" />
              <ExcelColumn label="PayTM" value="dishName" />
              <ExcelColumn label="EDC" value="dishName" />
              <ExcelColumn label="TOTAL" value="dishName" />
            </ExcelSheet>
          </ExcelFile>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <CusTableCell1 align="center">CASHIER NAME</CusTableCell1>
                  <CusTableCell1 align="center">STORE NAME</CusTableCell1>
                  <CusTableCell1 align="center">CRITERIA</CusTableCell1>
                  <CusTableCell3 align="center">DINE-IN</CusTableCell3>

                  <CusTableCell3 align="center">WEB SELF COLLECT</CusTableCell3>

                  <CusTableCell3 align="center">STORE TAKE-AWAY</CusTableCell3>
                  <CusTableCell3 align="center">STORE DELIVERY</CusTableCell3>
                  <CusTableCell3 align="center">
                    PHONE SELF-COLLECT
                  </CusTableCell3>
                  <CusTableCell3 align="center">PHONE DELIVERY</CusTableCell3>
                  <CusTableCell3 align="center">TOTAL</CusTableCell3>
                  <CusTableCell4 align="center">CASH</CusTableCell4>
                  <CusTableCell4 align="center">PayTM</CusTableCell4>
                  <CusTableCell4 align="center">EDC</CusTableCell4>
                  <CusTableCell4 align="center">AMAZON PAY</CusTableCell4>
                  <CusTableCell4 align="center">PHONEPE</CusTableCell4>
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
                    <CusTableCell2 align="center">
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Dine In"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Dine In"
                          ).totalQty
                        : 0}

                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Dine In"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Dine In"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>

                    <CusTableCell2 align="center">
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Web Self Collect"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Web Self Collect"
                          ).totalQty
                        : 0}

                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Web Self Collect"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Web Self Collect"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>

                    <CusTableCell2 align="center">
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Store Take Away"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Store Take Away"
                          ).totalQty
                        : 0}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>

                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Store Take Away"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Store Take Away"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Store Delivery"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Store Delivery"
                          ).totalQty
                        : 0}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>

                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Store Delivery"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Store Delivery"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Phone Self Collect"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Phone Self Collect"
                          ).totalQty
                        : 0}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Phone Self Collect"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Phone Self Collect"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Phone Delivery"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Phone Delivery"
                          ).totalQty
                        : 0}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {row.details.ORDER_SOURCE.find(
                        (x) => x.category === "Phone Delivery"
                      )
                        ? row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Phone Delivery"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {Number(
                        (row.details.ORDER_SOURCE.find(
                          (x) => x.category === "Dine In"
                        )
                          ? row.details.ORDER_SOURCE.find(
                              (x) => x.category === "Dine In"
                            ).totalQty
                          : 0) +
                          (row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Store Take Away"
                          )
                            ? row.details.ORDER_SOURCE.find(
                                (x) => x.category === "Store Take Away"
                              ).totalQty
                            : 0) +
                          (row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Store Delivery"
                          )
                            ? row.details.ORDER_SOURCE.find(
                                (x) => x.category === "Store Delivery"
                              ).totalQty
                            : 0) +
                          (row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Phone Delivery"
                          )
                            ? row.details.ORDER_SOURCE.find(
                                (x) => x.category === "Phone Delivery"
                              ).totalQty
                            : 0) +
                          (row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Phone Self Collect"
                          )
                            ? row.details.ORDER_SOURCE.find(
                                (x) => x.category === "Phone Self Collect"
                              ).totalQty
                            : 0)
                      )}

                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {Number(
                        (row.details.ORDER_SOURCE.find(
                          (x) => x.category === "Dine In"
                        )
                          ? row.details.ORDER_SOURCE.find(
                              (x) => x.category === "Dine In"
                            ).totalPrice
                          : 0) +
                          (row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Store Take Away"
                          )
                            ? row.details.ORDER_SOURCE.find(
                                (x) => x.category === "Store Take Away"
                              ).totalPrice
                            : 0) +
                          (row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Store Delivery"
                          )
                            ? row.details.ORDER_SOURCE.find(
                                (x) => x.category === "Store Delivery"
                              ).totalPrice
                            : 0) +
                          (row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Phone Delivery"
                          )
                            ? row.details.ORDER_SOURCE.find(
                                (x) => x.category === "Phone Delivery"
                              ).totalPrice
                            : 0) +
                          (row.details.ORDER_SOURCE.find(
                            (x) => x.category === "Phone Self Collect"
                          )
                            ? row.details.ORDER_SOURCE.find(
                                (x) => x.category === "Phone Self Collect"
                              ).totalPrice
                            : 0)
                      ).toFixed(2)}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "Cash"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Cash"
                          ).totalQty
                        : 0}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "Cash"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Cash"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "PayTM"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "PayTM"
                          ).totalQty
                        : 0}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "PayTM"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "PayTM"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "Credit/Debit"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Credit/Debit"
                          ).totalQty
                        : 0}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "Credit/Debit"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Credit/Debit"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "Amazon Pay"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Amazon Pay"
                          ).totalQty
                        : 0}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "Amazon Pay"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Amazon Pay"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "PhonePe"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "PhonePe"
                          ).totalQty
                        : 0}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>

                      {row.details.PAYMENT_MODE.find(
                        (x) => x.category === "PhonePe"
                      )
                        ? row.details.PAYMENT_MODE.find(
                            (x) => x.category === "PhonePe"
                          ).totalPrice
                        : 0}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {Number(
                        (row.details.PAYMENT_MODE.find(
                          (x) => x.category === "Cash"
                        )
                          ? row.details.PAYMENT_MODE.find(
                              (x) => x.category === "Cash"
                            ).totalQty
                          : 0) +
                          (row.details.PAYMENT_MODE.find(
                            (x) => x.category === "PayTM"
                          )
                            ? row.details.PAYMENT_MODE.find(
                                (x) => x.category === "PayTM"
                              ).totalQty
                            : 0) +
                          (row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Credit/Debit"
                          )
                            ? row.details.PAYMENT_MODE.find(
                                (x) => x.category === "Credit/Debit"
                              ).totalQty
                            : 0) +
                          (row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Amazon Pay"
                          )
                            ? row.details.PAYMENT_MODE.find(
                                (x) => x.category === "Amazon Pay"
                              ).totalQty
                            : 0) +
                          (row.details.PAYMENT_MODE.find(
                            (x) => x.category === "PhonePe"
                          )
                            ? row.details.PAYMENT_MODE.find(
                                (x) => x.category === "PhonePe"
                              ).totalQty
                            : 0)
                      )}
                      <br></br>
                      <div
                        style={{ borderBottom: "1px solid lightgray" }}
                      ></div>
                      {Number(
                        (row.details.PAYMENT_MODE.find(
                          (x) => x.category === "Cash"
                        )
                          ? row.details.PAYMENT_MODE.find(
                              (x) => x.category === "Cash"
                            ).totalPrice
                          : 0) +
                          (row.details.PAYMENT_MODE.find(
                            (x) => x.category === "PayTM"
                          )
                            ? row.details.PAYMENT_MODE.find(
                                (x) => x.category === "PayTM"
                              ).totalPrice
                            : 0) +
                          (row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Credit/Debit"
                          )
                            ? row.details.PAYMENT_MODE.find(
                                (x) => x.category === "Credit/Debit"
                              ).totalPrice
                            : 0) +
                          (row.details.PAYMENT_MODE.find(
                            (x) => x.category === "Amazon Pay"
                          )
                            ? row.details.PAYMENT_MODE.find(
                                (x) => x.category === "Amazon Pay"
                              ).totalPrice
                            : 0) +
                          (row.details.PAYMENT_MODE.find(
                            (x) => x.category === "PhonePe"
                          )
                            ? row.details.PAYMENT_MODE.find(
                                (x) => x.category === "PhonePe"
                              ).totalPrice
                            : 0)
                      )}
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
