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

import { Chart } from "react-google-charts";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const RevenueByPaymentMode = (props) => {
  const allReports = useSelector((state) => state.report.allReports);
  const salesSummeryByPaymentMode = useSelector(
    (state) => state.report.salesSummeryByPaymentMode
  );
  const configPaymentModes = useSelector(
    (state) => state.user.configPaymentModes
  );

  const dispatch = useDispatch();
  const ref = React.createRef();

  const renderOrderPerc = (mode) => {
    const foundMode = salesSummeryByPaymentMode
      ? salesSummeryByPaymentMode.find(
          (x) => x.paymentMode === mode.configCriteriaValue
        )
      : null;

    let totalOrderNo =
      salesSummeryByPaymentMode && salesSummeryByPaymentMode.length
        ? Number(
            salesSummeryByPaymentMode
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
      salesSummeryByPaymentMode && salesSummeryByPaymentMode.length
        ? Number(
            salesSummeryByPaymentMode
              .map((a) => a.noOfOrders)
              .reduce((a, b) => a + b, 0)
          )
        : 0;

    let percCalac = Number(
      Number(mode.noOfOrders / totalOrderNo) * 100
    ).toFixed(2);

    return `${percCalac} %`;
  };

  // ---------------- Data Formatting Start ---------------
  // const data_formatted = [
  //   ["Task", "Hours per Day"],
  //   ["Work", 11],
  //   ["Eat", 2],
  //   ["Commute", 2],
  //   ["Watch TV", 2],
  //   ["Sleep", 7], // CSS-style declaration
  // ];

  const data_formatted = [["paymentmode", "Value"]];

  // const renderOrderPercFormatted = (mode) => {
  //   var paymentMode = mode.configCriteriaDesc;
  //   var paymentValue = 0;
  //   const foundMode = salesSummeryByPaymentMode
  //     ? salesSummeryByPaymentMode.find(
  //         (x) => x.paymentMode === mode.configCriteriaValue
  //       )
  //     : null;

  //   let totalOrderNo =
  //     salesSummeryByPaymentMode && salesSummeryByPaymentMode.length
  //       ? Number(
  //           salesSummeryByPaymentMode
  //             .map((a) => a.noOfOrders)
  //             .reduce((a, b) => a + b, 0)
  //         )
  //       : 0;

  //   if (foundMode) {
  //     let percCalac = Number(
  //       Number(foundMode.noOfOrders / totalOrderNo) * 100
  //     ).toFixed(2);

  //     paymentValue = percCalac;
  //   } else {
  //     paymentValue = 0;
  //   }

  //   data_formatted.push([paymentMode,paymentValue]);
  //   return data_formatted;
  // };

  const renderOrderPercFormatted = () => {

  for (let i = 0; i < configPaymentModes.length; i++) {

      var paymentMode = configPaymentModes[i].configCriteriaDesc;
      var paymentValue = 0;

      const foundMode = salesSummeryByPaymentMode
      ? salesSummeryByPaymentMode.find(
          (x) => x.paymentMode === configPaymentModes[i].configCriteriaValue
        )
      : null;

    let totalOrderNo =
      salesSummeryByPaymentMode && salesSummeryByPaymentMode.length
        ? Number(
            salesSummeryByPaymentMode
              .map((a) => a.noOfOrders)
              .reduce((a, b) => a + b, 0)
          )
        : 0;

        if (foundMode) {
          let percCalac = Number(
            Number(foundMode.noOfOrders / totalOrderNo) * 100
          ).toFixed(2);
    
          paymentValue = Number(percCalac);
        } else {
          paymentValue = 0;
        }

        data_formatted.push([paymentMode,paymentValue]);
    }
    
    return data_formatted;
  };


  // const finalData = configPaymentModes.map((mode) => (renderOrderPercFormatted(mode)));

  const finalData = renderOrderPercFormatted();


  console.log("Pie Chart Data");
  console.log(finalData);

  const options = {
    title: "Sales by payment mode",
    pieHole: 0.35,
    width:'100%',
    height:'400',
    is3D: false,
    chartArea: {
      left: "1%",
      top: "5%",
      height: "100%",
      width: "100%"
  },
  // legend: 'none',
  // tooltip: { isHtml: true }
  // tooltip: { trigger: "selection" }
  legend: {
    position: 'labeled',
    textStyle: {
          bold: true,
          fontSize: 11,
          fontName: 'Roboto Condensed, sans-serif',
        }
  },
  pieSliceText: 'none',
  };

  // ----------------- Data Formatting End ----------------


  return (
    <div style={{marginTop:'0px'}} >
      <Chart
        chartType="PieChart"
        data={finalData}
        options={options}
      />
    </div>
  );

 /* return (
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
                  {salesSummeryByPaymentMode.find(
                    (x) => x.paymentMode === mode.configCriteriaValue
                  ) ? (
                    <span>
                      {
                        salesSummeryByPaymentMode.find(
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
                  {salesSummeryByPaymentMode.find(
                    (x) => x.paymentMode === mode.configCriteriaValue
                  ) ? (
                    <span>
                      Rs.
                      {
                        salesSummeryByPaymentMode.find(
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
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <ExcelFile
          element={<Button variant="text">Download Full Report</Button>}
        >
          <ExcelSheet
            data={salesSummeryByPaymentMode}
            name="Revenue By Payment Mode"
          >
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
          </ExcelSheet>
        </ExcelFile>
      </div>
    </div>
  );*/
};
