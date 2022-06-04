import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
              <TableCell>Dish Name</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.fullResp.orderDetails.map((row) => (
              <>
                <TableRow key={row.orderId}>
                  <TableCell>
                    {row.productName}
                    {row.subProductId !== "NAA" && (
                      <span>
                        {" - "}
                        {row.ingredient}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.price}.00</TableCell>
                  <TableCell>
                    {Number(row.quantity) * Number(row.price)}.00
                  </TableCell>
                </TableRow>
              </>
            ))}
            <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                Total
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.fullResp.totalPrice}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                CGST
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.fullResp.cgstCalculatedValue}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                SGST
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.fullResp.sgstCalculatedValue}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                Delivery Charges
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.fullResp.deliveryCharges}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" colspan="3">
                Grand Total
              </TableCell>
              <TableCell component="th" scope="row" colspan="1">
                {props.fullResp.overallPriceWithTax}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};
