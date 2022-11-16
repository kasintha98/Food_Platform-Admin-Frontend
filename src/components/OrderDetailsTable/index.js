import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

export const OrderDetailsTable = (props) => {
  const CusTableCell = styled(TableCell)`
    color: black;
    font-weight: 600 !important;
    ${props.isBill && "font-size: 3rem; font-family: Billfont"}
  `;

  return (
    <div>
      {props.fullResp ? (
        <Table
          sx={{ width: "100%", overflowX: "auto" }}
          aria-label="simple table"
        >
          <TableHead sx={{ display: "table-row-group" }}>
            <TableRow>
              <CusTableCell>
                Dish Name{props.isBill ? <hr></hr> : null}
              </CusTableCell>
              <CusTableCell>Qty{props.isBill ? <hr></hr> : null}</CusTableCell>
              <CusTableCell>Rate{props.isBill ? <hr></hr> : null}</CusTableCell>
              <CusTableCell>
                Amount{props.isBill ? <hr></hr> : null}
              </CusTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.fullResp.orderDetails.map((row) => (
              <>
                <TableRow
                  key={row.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <CusTableCell>
                    {row.subProductId !== "NAA" ? (
                      <span style={{ marginLeft: "15px" }}>
                        {row.ingredient}
                      </span>
                    ) : (
                      <span> {row.productName}</span>
                    )}
                  </CusTableCell>
                  <CusTableCell>{row.quantity}</CusTableCell>
                  <CusTableCell>
                    {props.isBill ? null : "Rs. "}
                    {Number(row.price).toFixed(2)}
                  </CusTableCell>
                  <CusTableCell align="center">
                    {props.isBill ? null : "Rs. "}
                    {Number(row.quantity) * Number(row.price).toFixed(2)}
                  </CusTableCell>
                </TableRow>
              </>
            ))}
            <TableRow sx={{ borderTop: "2px solid black" }}>
              <CusTableCell component="th" scope="row" colspan="3">
                {props.isBill ? <hr></hr> : null}
                Total
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
                align="center"
              >
                {props.isBill ? <hr></hr> : null}
                {props.isBill ? null : "Rs. "} {props.fullResp.totalPrice}
              </CusTableCell>
            </TableRow>
            <TableRow sx={{ borderTop: "2px solid black" }}>
              <CusTableCell component="th" scope="row" colspan="3">
                {props.isBill ? <hr></hr> : null}
                Discount
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
                align="center"
              >
                {props.isBill ? <hr></hr> : null}
                {props.isBill ? null : "Rs. "} {props.fullResp.discountAmount}
              </CusTableCell>
            </TableRow>
            <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                CGST
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
                align="center"
              >
                {props.isBill ? null : "Rs. "}{" "}
                {props.fullResp.cgstCalculatedValue}
              </CusTableCell>
            </TableRow>
            <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                SGST
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
                align="center"
              >
                {props.isBill ? null : "Rs. "}{" "}
                {props.fullResp.sgstCalculatedValue}
              </CusTableCell>
            </TableRow>
            <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                Delivery Charges
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
                align="center"
              >
                {props.isBill ? null : "Rs. "} {props.fullResp.deliveryCharges}
              </CusTableCell>
            </TableRow>
            <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                Packing Charges
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
                align="center"
              >
                {props.isBill ? null : "Rs. "} {props.fullResp.packagingCharges}
              </CusTableCell>
            </TableRow>
            <TableRow
              sx={{
                borderTop: "2px solid black",
                borderBottom: "2px solid black",
              }}
            >
              <CusTableCell component="th" scope="row" colspan="3">
                {props.isBill ? <hr></hr> : null}
                Grand Total
                {props.isBill ? <hr></hr> : null}
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                align="center"
              >
                {props.isBill ? <hr></hr> : null}
                {props.isBill ? null : "Rs. "}
                {props.fullResp.overallPriceWithTax}
                {props.isBill ? <hr></hr> : null}
              </CusTableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};
