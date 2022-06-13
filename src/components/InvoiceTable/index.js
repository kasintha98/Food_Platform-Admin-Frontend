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

export const InvoiceTable = (props) => {
  return (
    <div>
      {props.allProducts ? (
        <Table
          sx={{ width: "100%", overflowX: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <CusTableCell>Dish Name</CusTableCell>
              <CusTableCell>Qty</CusTableCell>
              <CusTableCell>Rate</CusTableCell>
              <CusTableCell>Amount</CusTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allProducts.map((row) => (
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
                  <CusTableCell>Rs. {row.price}.00</CusTableCell>
                  <CusTableCell>
                    Rs. {Number(row.quantity) * Number(row.price)}.00
                  </CusTableCell>
                </TableRow>
              </>
            ))}
            <TableRow sx={{ borderTop: "2px solid black" }}>
              <CusTableCell component="th" scope="row" colspan="3">
                Total
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
              >
                Rs. {props.grandTot}
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
                Rs. {props.cgst}
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
                Rs. {props.sgst}
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
                Rs. {props.fullResp.deliveryCharges}
              </CusTableCell>
            </TableRow>
            <TableRow
              sx={{
                borderTop: "2px solid black",
                borderBottom: "2px solid black",
              }}
            >
              <CusTableCell component="th" scope="row" colspan="3">
                Grand Total
              </CusTableCell>
              <CusTableCell component="th" scope="row" colspan="1">
                Rs. {props.overallPriceWithTax}
              </CusTableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};
