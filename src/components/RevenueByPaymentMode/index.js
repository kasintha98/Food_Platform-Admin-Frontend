import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Button } from "@mui/material";
import Pdf from "react-to-pdf";

export const RevenueByPaymentMode = (props) => {
  const allReports = useSelector((state) => state.report.allReports);
  const [cashOrders, setCashOrders] = useState([]);
  const [ccOrders, setCcOrders] = useState([]);
  const [payTmOrders, setPayTmOrders] = useState([]);
  const [payuOrders, setPayuOrders] = useState([]);
  const [gPOrders, setGPOrders] = useState([]);
  const [cODOrders, setCODOrders] = useState([]);

  const ref = React.createRef();

  useEffect(() => {
    setCashOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "CASH";
      })
    );

    setCcOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "CREDITCARD";
      })
    );

    setPayTmOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "PAYTM";
      })
    );

    setPayuOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "PayU";
      })
    );

    setGPOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "GOOGLEPAY";
      })
    );

    setCODOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "COD";
      })
    );
  }, [allReports]);
  return (
    <div className="mt-3 p-3">
      <div className="mb-3">
        <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
          Revenue By Payment Mode
        </Typography>
      </div>
      <TableContainer ref={ref} component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ED7D31", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }} align="left">
                Payment Mode
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="left">
                No of Orders
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="left">
                % of Total
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="left">
                Revenue
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">Cash</TableCell>
              <TableCell align="center">
                {cashOrders.length > 0 ? (
                  <>
                    {cashOrders
                      .map((a) => a.noOfOrders)
                      .reduce((a, b) => a + b, 0)}
                  </>
                ) : (
                  0
                )}
              </TableCell>
              <TableCell align="center">
                {Number(
                  Number(
                    cashOrders.length > 0
                      ? cashOrders
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0) * 100
                      : 0
                  ) / props.totalOrders
                ).toFixed(2)}{" "}
                %
              </TableCell>
              <TableCell align="center">
                {cashOrders.length > 0 ? (
                  <>
                    Rs.{" "}
                    {cashOrders
                      .map((a) => a.orderValue)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </>
                ) : (
                  "Rs. 0.00"
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">Credit Card</TableCell>
              <TableCell align="center">
                {ccOrders.length > 0 ? (
                  <>
                    {ccOrders
                      .map((a) => a.noOfOrders)
                      .reduce((a, b) => a + b, 0)}
                  </>
                ) : (
                  0
                )}
              </TableCell>
              <TableCell align="center">
                {Number(
                  Number(
                    ccOrders.length > 0
                      ? ccOrders
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0) * 100
                      : 0
                  ) / props.totalOrders
                ).toFixed(2)}{" "}
                %
              </TableCell>
              <TableCell align="center">
                {ccOrders.length > 0 ? (
                  <>
                    Rs.{" "}
                    {ccOrders
                      .map((a) => a.orderValue)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </>
                ) : (
                  "Rs. 0.00"
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">PayTM</TableCell>
              <TableCell align="center">
                {payTmOrders.length > 0 ? (
                  <>
                    {payTmOrders
                      .map((a) => a.noOfOrders)
                      .reduce((a, b) => a + b, 0)}
                  </>
                ) : (
                  0
                )}
              </TableCell>
              <TableCell align="center">
                {Number(
                  Number(
                    payTmOrders.length > 0
                      ? payTmOrders
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0) * 100
                      : 0
                  ) / props.totalOrders
                ).toFixed(2)}{" "}
                %
              </TableCell>
              <TableCell align="center">
                {payTmOrders.length > 0 ? (
                  <>
                    Rs.{" "}
                    {payTmOrders
                      .map((a) => a.orderValue)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </>
                ) : (
                  "Rs. 0.00"
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">Payu</TableCell>
              <TableCell align="center">
                {payuOrders.length > 0 ? (
                  <>
                    {payuOrders
                      .map((a) => a.noOfOrders)
                      .reduce((a, b) => a + b, 0)}
                  </>
                ) : (
                  0
                )}
              </TableCell>
              <TableCell align="center">
                {Number(
                  Number(
                    payuOrders.length > 0
                      ? payuOrders
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0) * 100
                      : 0
                  ) / props.totalOrders
                ).toFixed(2)}{" "}
                %
              </TableCell>
              <TableCell align="center">
                {payuOrders.length > 0 ? (
                  <>
                    Rs.{" "}
                    {payuOrders
                      .map((a) => a.orderValue)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </>
                ) : (
                  "Rs. 0.00"
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">GooglePay</TableCell>
              <TableCell align="center">
                {gPOrders.length > 0 ? (
                  <>
                    {gPOrders
                      .map((a) => a.noOfOrders)
                      .reduce((a, b) => a + b, 0)}
                  </>
                ) : (
                  0
                )}
              </TableCell>
              <TableCell align="center">
                {Number(
                  Number(
                    gPOrders.length > 0
                      ? gPOrders
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0) * 100
                      : 0
                  ) / props.totalOrders
                ).toFixed(2)}{" "}
                %
              </TableCell>
              <TableCell align="center">
                {gPOrders.length > 0 ? (
                  <>
                    Rs.{" "}
                    {gPOrders
                      .map((a) => a.orderValue)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </>
                ) : (
                  "Rs. 0.00"
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">Cash on Delivery</TableCell>
              <TableCell align="center">
                {cODOrders.length > 0 ? (
                  <>
                    {cODOrders
                      .map((a) => a.noOfOrders)
                      .reduce((a, b) => a + b, 0)}
                  </>
                ) : (
                  0
                )}
              </TableCell>
              <TableCell align="center">
                {Number(
                  Number(
                    cODOrders.length > 0
                      ? cODOrders
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0) * 100
                      : 0
                  ) / props.totalOrders
                ).toFixed(2)}{" "}
                %
              </TableCell>
              <TableCell align="center">
                {cODOrders.length > 0 ? (
                  <>
                    Rs.{" "}
                    {cODOrders
                      .map((a) => a.orderValue)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </>
                ) : (
                  "Rs. 0.00"
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Pdf targetRef={ref} filename="Revenue By Payment Mode.pdf">
          {({ toPdf }) => (
            <Button onClick={toPdf} variant="text">
              Download Full Report
            </Button>
          )}
        </Pdf>
      </div>
    </div>
  );
};
