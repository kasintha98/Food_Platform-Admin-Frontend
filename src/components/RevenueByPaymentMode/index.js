import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPaymentModeConfigDetails } from "../../actions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Button } from "@mui/material";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const RevenueByPaymentMode = (props) => {
  const allReports = useSelector((state) => state.report.allReports);
  const configPaymentModes = useSelector(
    (state) => state.user.configPaymentModes
  );

  /* const [cashOrders, setCashOrders] = useState([]);
  const [ccOrders, setCcOrders] = useState([]);
  const [payTmOrders, setPayTmOrders] = useState([]);
  const [payuOrders, setPayuOrders] = useState([]);
  const [gPOrders, setGPOrders] = useState([]);
  const [cODOrders, setCODOrders] = useState([]);
  const [phonePeOrders, setPhonePeOrders] = useState([]);
  const [amznOrders, setAmznOrders] = useState([]);
  const [notPaidOrders, setNotPaidOrders] = useState([]); */

  const dispatch = useDispatch();
  const ref = React.createRef();

  /* useEffect(() => {
    setCashOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "CASH";
      })
    );

    setCcOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "EDC";
      })
    );

    setPayTmOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "PAYTM";
      })
    );

    setGPOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "GPAY";
      })
    );

    setCODOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "COD";
      })
    );

    setPhonePeOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "PHONEPE";
      })
    );

    setAmznOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "AMZNPAY";
      })
    );

    setNotPaidOrders(
      allReports.salesSummeryByPaymentMode.filter(function (el) {
        return el.paymentMode === "NOTPAID";
      })
    );
  }, [allReports]); */

  useEffect(() => {
    dispatch(
      getPaymentModeConfigDetails(
        props.restaurantId ? props.restaurantId : "ALL"
      )
    );
  }, [props.restaurantId]);

  const renderOrderPerc = (mode) => {
    const foundMode = allReports.salesSummeryByPaymentMode.find(
      (x) => x.paymentMode === mode.configCriteriaValue
    );

    let totalOrderNo =
      allReports.salesSummeryByPaymentMode &&
      allReports.salesSummeryByPaymentMode.length
        ? Number(
            allReports.salesSummeryByPaymentMode
              .map((a) => a.noOfOrders)
              .reduce((a, b) => a + b, 0)
          )
        : 0;

    if (foundMode) {
      let percCalac = Number(
        Number(foundMode.noOfOrders / totalOrderNo) * 100
      ).toFixed(2);

      return <span>{percCalac} %</span>;
    } else {
      return <span>0 %</span>;
    }
  };

  const renderExcelOrderPerc = (mode) => {
    let totalOrderNo =
      allReports.salesSummeryByPaymentMode &&
      allReports.salesSummeryByPaymentMode.length
        ? Number(
            allReports.salesSummeryByPaymentMode
              .map((a) => a.noOfOrders)
              .reduce((a, b) => a + b, 0)
          )
        : 0;

    let percCalac = Number(
      Number(mode.noOfOrders / totalOrderNo) * 100
    ).toFixed(2);

    return `${percCalac} %`;
  };

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
                Payment Mode Desc.
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
            {configPaymentModes.map((mode) => (
              <TableRow>
                <TableCell align="left">{mode.configCriteriaValue}</TableCell>
                <TableCell align="left">{mode.configCriteriaDesc}</TableCell>
                <TableCell align="center">
                  {allReports.salesSummeryByPaymentMode.find(
                    (x) => x.paymentMode === mode.configCriteriaValue
                  ) ? (
                    <span>
                      {
                        allReports.salesSummeryByPaymentMode.find(
                          (x) => x.paymentMode === mode.configCriteriaValue
                        ).noOfOrders
                      }
                    </span>
                  ) : (
                    0
                  )}
                </TableCell>
                <TableCell align="center">{renderOrderPerc(mode)}</TableCell>
                <TableCell align="center">
                  {allReports.salesSummeryByPaymentMode.find(
                    (x) => x.paymentMode === mode.configCriteriaValue
                  ) ? (
                    <span>
                      Rs.
                      {
                        allReports.salesSummeryByPaymentMode.find(
                          (x) => x.paymentMode === mode.configCriteriaValue
                        ).orderValue
                      }
                    </span>
                  ) : (
                    <span>Rs. 0</span>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {/* <TableRow>
              <TableCell align="left">CASH</TableCell>
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
              <TableCell align="left">EDC</TableCell>
              <TableCell align="left">Credit/Debit</TableCell>
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
              <TableCell align="left">PAYTM</TableCell>
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
              <TableCell align="left">GPAY</TableCell>
              <TableCell align="left">Google Pay</TableCell>
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
              <TableCell align="left">COD</TableCell>
              <TableCell align="left">Cash On Delivery</TableCell>
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
            <TableRow>
              <TableCell align="left">PHONEPE</TableCell>
              <TableCell align="left">PhonePe</TableCell>
              <TableCell align="center">
                {phonePeOrders.length > 0 ? (
                  <>
                    {phonePeOrders
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
                    phonePeOrders.length > 0
                      ? phonePeOrders
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0) * 100
                      : 0
                  ) / props.totalOrders
                ).toFixed(2)}{" "}
                %
              </TableCell>
              <TableCell align="center">
                {phonePeOrders.length > 0 ? (
                  <>
                    Rs.{" "}
                    {phonePeOrders
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
              <TableCell align="left">AMZNPAY</TableCell>
              <TableCell align="left">Amazon Pay</TableCell>
              <TableCell align="center">
                {amznOrders.length > 0 ? (
                  <>
                    {amznOrders
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
                    amznOrders.length > 0
                      ? amznOrders
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0) * 100
                      : 0
                  ) / props.totalOrders
                ).toFixed(2)}{" "}
                %
              </TableCell>
              <TableCell align="center">
                {amznOrders.length > 0 ? (
                  <>
                    Rs.{" "}
                    {amznOrders
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
              <TableCell align="left">NOTPAID</TableCell>
              <TableCell align="left">Not Paid</TableCell>
              <TableCell align="center">
                {notPaidOrders.length > 0 ? (
                  <>
                    {notPaidOrders
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
                    notPaidOrders.length > 0
                      ? notPaidOrders
                          .map((a) => a.noOfOrders)
                          .reduce((a, b) => a + b, 0) * 100
                      : 0
                  ) / props.totalOrders
                ).toFixed(2)}{" "}
                %
              </TableCell>
              <TableCell align="center">
                {notPaidOrders.length > 0 ? (
                  <>
                    Rs.{" "}
                    {notPaidOrders
                      .map((a) => a.orderValue)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </>
                ) : (
                  "Rs. 0.00"
                )}
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {/* <Pdf targetRef={ref} filename="Revenue By Payment Mode.pdf">
          {({ toPdf }) => (
            <Button onClick={toPdf} variant="text">
              Download Full Report
            </Button>
          )}
        </Pdf> */}
        <ExcelFile
          element={<Button variant="text">Download Full Report</Button>}
        >
          <ExcelSheet
            data={allReports.salesSummeryByPaymentMode}
            name="Revenue By Payment Mode"
          >
            {/* <ExcelColumn label="Year" value="year" />
            <ExcelColumn label="Month" value="month" />
            <ExcelColumn label="Full Date" value="orderDate" /> */}
            <ExcelColumn label="Restaurant ID" value="restaurantId" />
            <ExcelColumn label="Store ID" value="storeId" />
            <ExcelColumn label="Restaurant Name" value="restaurantName" />
            <ExcelColumn label="Number Of Orders" value="noOfOrders" />
            <ExcelColumn
              label="% of Total"
              value={(col) => renderExcelOrderPerc(col)}
            />
            <ExcelColumn label="Total Order Value" value="orderValue" />
            <ExcelColumn label="Payment Mode" value="paymentMode" />
            <ExcelColumn
              label="Payment Mode Description"
              value="paymentModeDescription"
            />

            {/* <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/> */}
          </ExcelSheet>
        </ExcelFile>
      </div>
    </div>
  );
};
