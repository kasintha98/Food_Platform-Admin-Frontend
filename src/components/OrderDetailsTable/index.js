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
            <TableRow
              sx={{
                borderBottom: props.isBill
                  ? "8px dashed black"
                  : "2px solid black",
              }}
            >
              <CusTableCell>
                Dish Name
                {/* {props.isBill ? (
                  <p
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      fontFamily: "Billfont",
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    <br></br>
                    -------------
                  </p>
                ) : null} */}
              </CusTableCell>
              <CusTableCell>
                Qty
                {/* {props.isBill ? (
                  <p
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      fontFamily: "Billfont",
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    <br></br>
                    ---
                  </p>
                ) : null} */}
              </CusTableCell>
              <CusTableCell>
                Rate
                {/* {props.isBill ? (
                  <p
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      fontFamily: "Billfont",
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    <br></br>
                    -------
                  </p>
                ) : null} */}
              </CusTableCell>
              <CusTableCell>
                Amount
                {/* {props.isBill ? (
                  <p
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      fontFamily: "Billfont",
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    <br></br>
                    -------
                  </p>
                ) : null} */}
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
                  <CusTableCell align="right">
                    {props.isBill ? null : "Rs. "}
                    {(Number(row.quantity) * Number(row.price)).toFixed(2)}
                  </CusTableCell>
                </TableRow>
              </>
            ))}
            <TableRow
              sx={{
                borderTop: props.isBill
                  ? "8px dashed black"
                  : "2px solid black",
              }}
            >
              <CusTableCell component="th" scope="row" colspan="3">
                {props.isBill ? <hr></hr> : null}
                Total
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
                align="right"
              >
                {props.isBill ? <hr></hr> : null}
                {props.isBill ? null : "Rs. "}{" "}
                {props.fullResp.totalPrice.toFixed(2)}
              </CusTableCell>
            </TableRow>
            <TableRow
              sx={{
                borderTop: props.isBill
                  ? "8px dashed black"
                  : "2px solid black",
              }}
            >
              <CusTableCell component="th" scope="row" colspan="3">
                {props.isBill ? <hr></hr> : null}
                Discount
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
                align="right"
              >
                {props.isBill ? <hr></hr> : null}
                {props.isBill ? null : "Rs. "}{" "}
                {props.fullResp.discountAmount.toFixed(2)}
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
                align="right"
              >
                {props.isBill ? null : "Rs. "}{" "}
                {props.fullResp.cgstCalculatedValue.toFixed(2)}
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
                align="right"
              >
                {props.isBill ? null : "Rs. "}{" "}
                {props.fullResp.sgstCalculatedValue.toFixed(2)}
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
                align="right"
              >
                {props.isBill ? null : "Rs. "}{" "}
                {props.fullResp.deliveryCharges.toFixed(2)}
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
                align="right"
              >
                {props.isBill ? null : "Rs. "}{" "}
                {props.fullResp.packagingCharges.toFixed(2)}
              </CusTableCell>
            </TableRow>
            <TableRow
              sx={{
                borderTop: props.isBill
                  ? "8px dashed black"
                  : "2px solid black",
                borderBottom: props.isBill
                  ? "8px dashed black"
                  : "2px solid black",
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
                align="right"
              >
                {props.isBill ? <hr></hr> : null}
                {props.isBill ? null : "Rs. "}
                {props.fullResp.overallPriceWithTax.toFixed(2)}
                {props.isBill ? <hr></hr> : null}
              </CusTableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};
