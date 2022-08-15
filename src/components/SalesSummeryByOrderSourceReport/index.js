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

export const SalesSummeryByOrderSourceReport = (props) => {
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
      allReports.salesSummeryByOrderSource &&
      allReports.salesSummeryByOrderSource.length > 0 ? (
        <div>
          <ExcelFile
            element={<Button variant="text">Download Full Report</Button>}
          >
            <ExcelSheet
              data={allReports.salesSummeryByOrderSource}
              name="Sales Summery By Order Source"
            >
              <ExcelColumn label="RESTAURANT ID" value="restaurantId" />
              <ExcelColumn label="STORE ID" value="storeId" />
              <ExcelColumn label="RESTAURANT NAME" value="restaurantName" />
              <ExcelColumn label="ORDER SOURCE" value="orderSource" />
              <ExcelColumn
                label="ORDER SOURCE DESC."
                value="orderSourceDescription"
              />
              <ExcelColumn label="NO OF ORDERS" value="noOfOrders" />
              <ExcelColumn label="ORDER VALUE" value="orderValue" />
            </ExcelSheet>
          </ExcelFile>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <CusTableCell1 align="center">RESTAURANT ID</CusTableCell1>
                  <CusTableCell1 align="center">STORE ID</CusTableCell1>
                  <CusTableCell1 align="center">RESTAURANT NAME</CusTableCell1>
                  <CusTableCell1 align="center">ORDER SOURCE</CusTableCell1>
                  <CusTableCell1 align="center">
                    ORDER SOURCE DESC.
                  </CusTableCell1>
                  <CusTableCell1 align="center">NO OF ORDERS</CusTableCell1>
                  <CusTableCell1 align="center">ORDER VALUE</CusTableCell1>
                </TableRow>
              </TableHead>
              <TableBody>
                {allReports.salesSummeryByOrderSource.map((row, index) => (
                  <TableRow key={index}>
                    <CusTableCell2 align="center">
                      {row.restaurantId}
                    </CusTableCell2>
                    <CusTableCell2 align="center"> {row.storeId}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.restaurantName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderSource}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderSourceDescription}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.noOfOrders}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      Rs. {row.orderValue}
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
