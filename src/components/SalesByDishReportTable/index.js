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

const CusTableCell5 = styled(TableCell)`
  font-size: 0.75rem;
  background-color: #6c757d;
  color: #fff;
`;

export const SalesByDishReportTable = (props) => {
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

  const getItemsSoldTotal = () => {
    if (
      allReports &&
      allReports.reportDishConsumptionSummary &&
      allReports.reportDishConsumptionSummary.length > 0
    ) {
      let total = 0;
      for (let i = 0; i < allReports.reportDishConsumptionSummary.length; i++) {
        total = total + allReports.reportDishConsumptionSummary[i].totalQty;
      }
      return total;
    } else {
      return 0;
    }
  };

  const getItemsSoldTotalValue = () => {
    if (
      allReports &&
      allReports.reportDishConsumptionSummary &&
      allReports.reportDishConsumptionSummary.length > 0
    ) {
      let total = 0;
      for (let i = 0; i < allReports.reportDishConsumptionSummary.length; i++) {
        total = total + allReports.reportDishConsumptionSummary[i].totalPrice;
      }
      return total;
    } else {
      return 0;
    }
  };

  return (
    <div>
      {allReports &&
      allReports.reportDishConsumptionSummary &&
      allReports.reportDishConsumptionSummary.length > 0 ? (
        <div>
          <ExcelFile
            element={<Button variant="text">Download Full Report</Button>}
          >
            <ExcelSheet
              data={allReports.reportDishConsumptionSummary}
              name="Orders"
            >
              <ExcelColumn
                label="RESTAURANT &amp; STORE"
                value="restaurantName"
              />
              <ExcelColumn label="SYSTEM ID" value="dishId" />
              <ExcelColumn label="DISH NAME" value="dishName" />
              <ExcelColumn label="DISH SIZE" value="size" />
              <ExcelColumn
                label="DISH UNIT PRICE"
                value={(col) => Number(col.totalPrice) / Number(col.totalQty)}
              />
              <ExcelColumn label="ITEM SOLD" value="totalQty" />
              <ExcelColumn label="TOTAL SALES REVENUE" value="totalPrice" />
            </ExcelSheet>
          </ExcelFile>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <CusTableCell1 align="center">
                    RESTAURANT &amp; STORE
                  </CusTableCell1>
                  <CusTableCell1 align="center">SYSTEM ID</CusTableCell1>
                  <CusTableCell1 align="center">DISH NAME</CusTableCell1>
                  <CusTableCell1 align="center">DISH SIZE</CusTableCell1>
                  <CusTableCell1 align="center">DISH UNIT PRICE</CusTableCell1>
                  <CusTableCell1 align="center">ITEM SOLD</CusTableCell1>
                  <CusTableCell1 align="center">
                    TOTAL SALES REVENUE
                  </CusTableCell1>
                </TableRow>
              </TableHead>
              <TableBody>
                {allReports.reportDishConsumptionSummary.map((row, index) => (
                  <TableRow key={row.orderId}>
                    <CusTableCell2 align="center">
                      {row.restaurantName}
                    </CusTableCell2>
                    <CusTableCell2 align="center"> {row.dishId}</CusTableCell2>
                    <CusTableCell2 align="center">{row.dishName}</CusTableCell2>
                    <CusTableCell2 align="center">{row.size}</CusTableCell2>
                    <CusTableCell2 align="center">
                      Rs.{" "}
                      {Number(
                        Number(row.totalPrice) / Number(row.totalQty)
                      ).toFixed(2)}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.totalQty}</CusTableCell2>
                    <CusTableCell2 align="center">
                      Rs. {row.totalPrice}
                    </CusTableCell2>
                  </TableRow>
                ))}
                <TableRow>
                  <CusTableCell5 colSpan={5} align="center">
                    TOTAL
                  </CusTableCell5>
                  <CusTableCell5 align="center">
                    {getItemsSoldTotal()}
                  </CusTableCell5>
                  <CusTableCell5 align="center">
                    Rs. {getItemsSoldTotalValue()}
                  </CusTableCell5>
                </TableRow>
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
