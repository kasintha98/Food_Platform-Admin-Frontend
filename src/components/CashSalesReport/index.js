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
  const dispatch = useDispatch();

  return (
    <div>
      {" "}
      <ExcelFile element={<Button variant="text">Download Full Report</Button>}>
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
              <CusTableCell3 align="center">STORE TAKE-AWAY</CusTableCell3>
              <CusTableCell3 align="center">STORE DELIVERY</CusTableCell3>
              <CusTableCell3 align="center">PHONE SELF-COLLECT</CusTableCell3>
              <CusTableCell3 align="center">PHONE DELIVERY</CusTableCell3>
              <CusTableCell3 align="center">TOTAL</CusTableCell3>
              <CusTableCell4 align="center">CASH</CusTableCell4>
              <CusTableCell4 align="center">PayTM</CusTableCell4>
              <CusTableCell4 align="center">EDC</CusTableCell4>
              <CusTableCell4 align="center">TOTAL</CusTableCell4>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <CusTableCell2 align="center">a</CusTableCell2>
              <CusTableCell2 align="center"> b</CusTableCell2>
              <CusTableCell2 align="center">c</CusTableCell2>
              <CusTableCell2 align="center">d</CusTableCell2>
              <CusTableCell2 align="center">e</CusTableCell2>
              <CusTableCell2 align="center">f</CusTableCell2>
              <CusTableCell2 align="center">g</CusTableCell2>
              <CusTableCell2 align="center">c</CusTableCell2>
              <CusTableCell2 align="center">d</CusTableCell2>
              <CusTableCell2 align="center">e</CusTableCell2>
              <CusTableCell2 align="center">f</CusTableCell2>
              <CusTableCell2 align="center">g</CusTableCell2>
              <CusTableCell2 align="center">g</CusTableCell2>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
