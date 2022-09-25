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

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
  padding: 0;
`;

export const CashierSummaryReport = (props) => {
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
        }-${props.endDate.getDate()}`,
        props.selectedReport
      )
    );
  }, [
    props.restaurantId,
    props.storeId,
    props.startDate,
    props.endDate,
    props.selectedReport,
  ]);

  return (
    <div>
      {allReports &&
      allReports.reportCashierSummery &&
      allReports.reportCashierSummery.length > 0 ? (
        <div>
          <ExcelFile
            element={<Button variant="text">Download Full Report</Button>}
          >
            <ExcelSheet
              data={allReports.reportCashierSummery}
              name="Report Cashier Summary"
            >
              <ExcelColumn label="RESTAURANT ID" value="restaurantId" />
              <ExcelColumn label="STORE ID" value="storeId" />
              <ExcelColumn label="STORE NAME" value="storeName" />
              <ExcelColumn label="CASHIER NAME" value="cashierName" />
              <ExcelColumn label="CATEGORY" value="category" />
              <ExcelColumn label="TYPE OF DATA" value="typeOfData" />
              <ExcelColumn label="TOTAL QTY" value="totalQty" />
              <ExcelColumn label="TOTAL PRICE" value="totalPrice" />
            </ExcelSheet>
          </ExcelFile>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <CusTableCell1 align="center">RESTAURANT ID</CusTableCell1>
                  <CusTableCell1 align="center">STORE ID</CusTableCell1>
                  <CusTableCell1 align="center">STORE NAME</CusTableCell1>
                  <CusTableCell1 align="center">CASHIER NAME</CusTableCell1>
                  <CusTableCell1 align="center">CATEGORY</CusTableCell1>
                  <CusTableCell1 align="center">TYPE OF DATA</CusTableCell1>
                  <CusTableCell1 align="center">TOTAL QTY</CusTableCell1>
                  <CusTableCell1 align="center">TOTAL PRICE</CusTableCell1>
                </TableRow>
              </TableHead>
              <TableBody>
                {allReports.reportCashierSummery.map((row, index) => (
                  <TableRow key={index}>
                    <CusTableCell2 align="center">
                      {row.restaurantId}
                    </CusTableCell2>
                    <CusTableCell2 align="center"> {row.storeId}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.storeName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.cashierName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.category}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.typeOfData}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.totalQty}</CusTableCell2>
                    <CusTableCell2 align="center">
                      Rs. {row.totalPrice}
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
            <Alert severity="warning">No orders to show!</Alert>
          )}
        </div>
      )}
    </div>
  );
};
