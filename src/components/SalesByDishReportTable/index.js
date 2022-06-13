import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders } from "../../actions";
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

export const SalesByDishReportTable = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    dispatch(
      getCustomerOrders(
        props.restaurantId,
        props.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      )
    );
  }, [props.restaurantId, props.storeId]);

  return (
    <div>
      <ExcelFile element={<Button variant="text">Download Full Report</Button>}>
        <ExcelSheet data={orders} name="Orders">
          <ExcelColumn label="restaurantId" value="restaurantId" />
          <ExcelColumn label="orderStatus" value="orderStatus" />
          <ExcelColumn label="orderId" value="orderId" />
          <ExcelColumn label="createdDate" value="createdDate" />
          <ExcelColumn label="orderSource" value="orderSource" />
          <ExcelColumn label="orderDeliveryType" value="orderDeliveryType" />
          <ExcelColumn label="paymentStatus" value="paymentStatus" />
          <ExcelColumn label="paymentMode" value="paymentMode" />
          <ExcelColumn label="customerName" value="customerName" />
          <ExcelColumn label="mobileNumber" value="mobileNumber" />
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
          <ExcelColumn label="orderStatus" value="orderStatus" />
          <ExcelColumn label="createdBy" value="createdBy" />
        </ExcelSheet>
      </ExcelFile>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">RESTAURANT</CusTableCell1>
              <CusTableCell1 align="center">STORE</CusTableCell1>
              <CusTableCell1 align="center">SYSTEM ID</CusTableCell1>
              <CusTableCell1 align="center">DISH NAME</CusTableCell1>
              <CusTableCell1 align="center">DISH SIZE</CusTableCell1>
              <CusTableCell1 align="center">DISH UNIT PRICE</CusTableCell1>
              <CusTableCell1 align="center">ITEM SOLD</CusTableCell1>
              <CusTableCell1 align="center">TOTAL SALES REVENUE</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.length > 0 ? (
              <>
                {orders.map((row, index) => (
                  <TableRow key={row.orderId}>
                    <CusTableCell2 align="center">
                      {row.restaurantId}
                    </CusTableCell2>
                    <CusTableCell2 align="center">Yamuna Nagar</CusTableCell2>
                    <CusTableCell2 align="center">S001</CusTableCell2>
                    <CusTableCell2 align="center">Onion</CusTableCell2>
                    <CusTableCell2 align="center">Small</CusTableCell2>
                    <CusTableCell2 align="center">Rs. 10</CusTableCell2>
                    <CusTableCell2 align="center">3</CusTableCell2>
                    <CusTableCell2 align="center">Rs. 30</CusTableCell2>
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
                    <Alert severity="warning">No orders to show!</Alert>
                  )}
                </CusTableCell2>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
