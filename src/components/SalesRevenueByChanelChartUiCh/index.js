import React from "react";
import { useSelector } from "react-redux";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
import Alert from "@mui/material/Alert";
// import { Bar } from "react-chartjs-2";
import { Typography, Button } from "@mui/material";

import { Chart } from "react-google-charts";
import "./style.css";

// import ReactExport from "react-export-excel";
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

export const SalesRevenueByChanelChart = () => {
  const salesSummeryByOrderSource = useSelector(
    (state) => state.report.salesSummeryByOrderSource
  );
  const orderSources = useSelector((state) => state.user.orderSources);

  console.log("================orderSources");
  console.log(orderSources);
  console.log(salesSummeryByOrderSource.salesSummeryByOrderSource);

  const ref = React.createRef();

  // const getFilteredOrders = () => {
  //   let allData = [];

  //   console.log("##########");
  //   console.log(salesSummeryByOrderSource.salesSummeryByOrderSource);

  //   if (
  //     orderSources &&
  //     Object.keys(salesSummeryByOrderSource).length > 0 &&
  //     salesSummeryByOrderSource.salesSummeryByOrderSource &&
  //     salesSummeryByOrderSource.salesSummeryByOrderSource.length > 0
  //   ) {
  //     for (let i = 0; i < orderSources.length; i++) {
  //       let foundMatch = salesSummeryByOrderSource.salesSummeryByOrderSource
  //         .filter(function (el) {
  //           return el.orderSource === orderSources[i].configCriteriaValue;
  //         })
  //         .map((a) => a.orderValue);
  //       if (foundMatch.length > 0) {
  //         allData.push(foundMatch.reduce((a, b) => a + b, 0));
  //       } else {
  //         allData.push(0);
  //       }
  //     }
  //   }

  //   console.log("Sales Revenue Channel");
  //   console.log(allData);

  //   return allData;
  // };

  // const data = {
  //   labels: orderSources
  //     ? orderSources.map((value) => value.configCriteriaDesc)
  //     : [],
  //   datasets: [
  //     {
  //       label: "Order",
  //       data: getFilteredOrders(),
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };

// ------Data Formatting Start ------------
  const data_formatted = [["channel", "Sales",{ role: "annotation", type: "number" }]];

  const getFilteredOrdersFormatted = () => {
    let allData = [];

    if (
      orderSources &&
      Object.keys(salesSummeryByOrderSource).length > 0 &&
      salesSummeryByOrderSource.salesSummeryByOrderSource &&
      salesSummeryByOrderSource.salesSummeryByOrderSource.length > 0
    ) {
      for (let i = 0; i < orderSources.length; i++) {
        var source = orderSources[i].configCriteriaDesc;
        var value = 0;
        let foundMatch = salesSummeryByOrderSource.salesSummeryByOrderSource
          .filter(function (el) {
            return el.orderSource === orderSources[i].configCriteriaValue;
          })
          .map((a) => a.orderValue);
          
        if (foundMatch.length > 0) {
          value = foundMatch.reduce((a, b) => a + b, 0);
        } else {
          value = 0;
        }
        data_formatted.push([source,value,value]);
      }
    }

    console.log("Sales Revenue Channel data_formatted");
    console.log(data_formatted);

    return data_formatted;
  };

  const finalData = getFilteredOrdersFormatted();

  var optionsBar = {
    title: "Sales by Channels",
    bar: {groupWidth: "50%"},
    colors: ['#ffbd59'],
    width:'100%',
    height:'350',
    legend: 'none',
    // legend: {
    //   // position: 'bottom',
    //   textStyle: {
    //     bold: true,
    //     color: 'cyan',
    //     fontSize: 18
    //   }
    // },
    hAxis: {
      // title: 'Payment Modes',
      titleTextStyle: {
          // color: "#000",
          fontName: 'Roboto Condensed, sans-serif',
          fontSize: 9,
          bold: true,
          italic: false
      },
      textStyle : {
            fontSize: 9,
            fontName:'Roboto Condensed, sans-serif',
            bold: true,
        }
  },
  vAxis: {
    textPosition: 'none',
    gridlines: {
        color: 'transparent'
    }
  },
  annotations: {
    textStyle: {
      fontName:'Roboto Condensed, sans-serif',
      bold: true,
      fontSize: 11,
      color: '#000',
    }
  },
  chartArea: {
    height: "80%",
    width: "95%"
},
  };


  // console.log("Chart Data Sales Revenue Channel finalData ");
  // console.log(finalData);

  // -----------------Data Formatting End --------------

  // const getOrderNum = (lable) => {
  //   if (
  //     orderSources &&
  //     Object.keys(salesSummeryByOrderSource).length > 0 &&
  //     salesSummeryByOrderSource.salesSummeryByOrderSource &&
  //     salesSummeryByOrderSource.salesSummeryByOrderSource.length > 0
  //   ) {
  //     if (lable) {
  //       let found = salesSummeryByOrderSource.salesSummeryByOrderSource.find(
  //         (x) => x.orderSourceDescription === lable
  //       );

  //       if (found) {
  //         return found.noOfOrders;
  //       } else {
  //         return "";
  //       }
  //     } else {
  //       return "";
  //     }
  //   } else {
  //     return "";
  //   }
  // };


  return (
    <div className="mainDivStyle">
      {orderSources &&
      Object.keys(salesSummeryByOrderSource).length > 0 && finalData.length > 1 &&
      salesSummeryByOrderSource.salesSummeryByOrderSource &&
      salesSummeryByOrderSource.salesSummeryByOrderSource.length > 0 ? (
        <>
          <div ref={ref}>
            <Chart
              chartType="ColumnChart"
              data={finalData}
              options={optionsBar}
            />
          </div>
        </>
      ) : (
        <Alert severity="warning" className="mt-4">
          No data to show the report, please refresh and try again!
        </Alert>
      )}
    </div>
  );
};
