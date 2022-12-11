import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Chart } from "react-google-charts";

import { Typography, Button } from "@mui/material";
import randomColor from "randomcolor";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//   },
//   scales: {
//     x: {
//       ticks: {
//         display: false,
//       },
//     },
//   },
// };

export const SalesOverTimeChart = () => {
  const salesSummeryByDateList = useSelector(
    (state) => state.report.salesSummeryByDateList
  );
  const ref = React.createRef();

  const labels = salesSummeryByDateList?.salesSummeryByDateList
    ? salesSummeryByDateList?.salesSummeryByDateList?.map(
        (a) =>
          `${Number(new Date(a.orderDate).getMonth()) + 1}/ ${new Date(
            a.orderDate
          ).getDate()} - ${a.restaurantName}`
      )
    : [];

  // const data = {
  //   labels,
  //   datasets: salesSummeryByDateList.salesSummeryByDateList
  //     ? [
  //         {
  //           label: "Sales",
  //           data: salesSummeryByDateList.salesSummeryByDateList.map(
  //             (a) => [a.orderValue, a.restaurantName]
  //           ),
  //           backgroundColor: salesSummeryByDateList.salesSummeryByDateList.map(
  //             (a) =>
  //               randomColor({
  //                 luminosity: "dark",
  //                 format: "rgba",
  //                 alpha: 0.5,
  //               })
  //           ),
  //         },
  //       ]
  //     : [],
  // };

  const data_formatted = [["store", "Value",{ role: "annotation", type: "string" }]];

  const dataPrimary = salesSummeryByDateList.salesSummeryByDateList.map(
    (a) => 
    data_formatted.push([a.restaurantName,a.orderValue,a.orderValue])
  );

  

  // console.log("++++++++");
  // console.log(dataPrimary);
  // console.log(data_formatted);


  // const dataV = [["store", "Value", { role: "annotation", type: "string" }], ["Yamuna Nagar",210,"210"], ["Delhi", 260,"260"],["Pune", 150,"150"],["Mumbai",480,"480"],["Chennai",399,"399"]];
  // const data = [["store", "Value"], ["Yamuna Nagar",210], ["Delhi", 260],["Pune", 150],["Mumbai",480],["Chennai",399],
  // ["Delhi1", 260],["Pune1", 150],["Mumbai1",480],["Chennai1",399],
  // ["Delhi2", 260],["Pune2", 150],["Mumbai2",480],["Chennai2",399]];

  // console.log("*********");
  // console.log(data);
  // console.log(labels);

  var optionsChart = {
    title: "Sales",
    bar: {groupWidth: "50%"},
    colors: ['#38b6ff'],
    width:'100%',
    height:'490',
    legend: 'none',
    vAxis: {
      // title: 'Stores',
      titleTextStyle: {
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
  annotations: {
    textStyle: {
      fontName:'Roboto Condensed, sans-serif',
      bold: true,
      fontSize: 9,
      color: '#fff',
    }
  },
  hAxis: {
    viewWindow: {
      min: 0,
    },
    gridlines: {
        color: 'transparent',
        // count: 10
    }
  },
  };

  return (
    <div style={{marginTop:'10px'}}>
      <div ref={ref}>
        <Chart
        chartType="BarChart"
        data={data_formatted}
        options={optionsChart}
      />
      </div>
    </div>
  );
};
