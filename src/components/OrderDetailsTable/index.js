import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

const CusTableCell = styled(TableCell)`
  color: black;
`;

export const OrderDetailsTable = (props) => {
  return (
    <div>
      {props.fullResp ? (
        <Table
          sx={{ width: "100%", overflowX: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Dish Name{props.isBill ? <hr></hr> : null}</TableCell>
              <TableCell>Qty{props.isBill ? <hr></hr> : null}</TableCell>
              <TableCell>Rate{props.isBill ? <hr></hr> : null}</TableCell>
              <TableCell>Amount{props.isBill ? <hr></hr> : null}</TableCell>
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
                    {props.isBill ? null : "Rs. "} {row.price}.00
                  </CusTableCell>
                  <CusTableCell>
                    {props.isBill ? null : "Rs. "}{" "}
                    {Number(row.quantity) * Number(row.price)}.00
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
              >
                {props.isBill ? <hr></hr> : null}
                {props.isBill ? null : "Rs. "} {props.fullResp.totalPrice}
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
              >
                {props.isBill ? null : "Rs. "} {props.fullResp.deliveryCharges}
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
              <CusTableCell component="th" scope="row" colspan="1">
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
