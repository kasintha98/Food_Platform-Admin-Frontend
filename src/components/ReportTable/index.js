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
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { Row, Col, Modal } from "react-bootstrap";

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
`;

export const ReportTable = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    dispatch(
      getCustomerOrders(
        null,
        null,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      )
    );
  }, []);

  return (
    <div>
      <Button>Download Full Report</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">NO</CusTableCell1>
              <CusTableCell1 align="center">RESTAURANT ID</CusTableCell1>
              <CusTableCell1 align="center">RESTAURANT NAME</CusTableCell1>
              <CusTableCell1 align="center">ORDER STATUS</CusTableCell1>
              <CusTableCell1 align="center">ORDER NO</CusTableCell1>
              <CusTableCell1 align="center">ORDER DATE</CusTableCell1>
              <CusTableCell1 align="center">SOURCE</CusTableCell1>
              <CusTableCell1 align="center">ORDER TYPE</CusTableCell1>
              <CusTableCell1 align="center">PYMT. STATUS</CusTableCell1>
              <CusTableCell1 align="center">PYMT. MODE</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER NAME</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER ADDRESS</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER PHONE NO</CusTableCell1>
              <CusTableCell1 align="center">
                TOTAL AMOUNT INC. TAX
              </CusTableCell1>
              <CusTableCell1 align="center">CGST</CusTableCell1>
              <CusTableCell1 align="center">SGST</CusTableCell1>
              <CusTableCell1 align="center">DELIVERY CHARGES</CusTableCell1>
              <CusTableCell1 align="center">ITEM ORDERED</CusTableCell1>
              <CusTableCell1 align="center">ACTION</CusTableCell1>
              <CusTableCell1 align="center">VIEW | PRINT INVOICE</CusTableCell1>
              <CusTableCell1 align="center">ORDER ENTERED BY</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.length > 0 ? (
              <>
                {orders.map((row, index) => (
                  <TableRow key={row.orderId}>
                    <CusTableCell2 align="center">{index + 1}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.restaurantId}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.restaurantId}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderId.slice(0, 11)} <br></br>
                      {row.orderId.slice(11, 19)}
                      <span style={{ color: "#4472c4" }}>
                        {row.orderId.slice(19, 23)}
                      </span>
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {new Date(row.createdDate).getFullYear()}-
                      {new Date(row.createdDate).getMonth() + 1}-
                      {new Date(row.createdDate).getDate()}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderSource === "W" ? "Web" : row.orderSource}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderDeliveryType}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.paymentStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.paymentMode}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.customerName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.address}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.mobileNumber}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.overallPriceWithTax}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.cgstCalculatedValue}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.sgstCalculatedValue}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.deliveryCharges}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderDetails.map((item) => (
                        <>
                          {item.ingredient === "No Ingredient" ? (
                            <div>
                              {item.productName} X {item.quantity} Rs.
                              {Number(item.quantity) * Number(item.price)}
                              <br></br>
                            </div>
                          ) : (
                            <div style={{}}>
                              {item.ingredient} X {item.quantity} Rs.
                              {Number(item.quantity) * Number(item.price)}
                              <br></br>
                            </div>
                          )}
                        </>
                      ))}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      <Button>Invoice</Button>
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.createdBy}
                    </CusTableCell2>
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
