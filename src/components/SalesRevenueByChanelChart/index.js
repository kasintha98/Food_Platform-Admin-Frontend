import React from "react";
import { useSelector } from "react-redux";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Alert from "@mui/material/Alert";
import { Bar } from "react-chartjs-2";
import { Typography, Button } from "@mui/material";
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

export const SalesRevenueByChanelChart = () => {
  const salesSummeryByOrderSource = useSelector(
    (state) => state.report.salesSummeryByOrderSource
  );
  const orderSources = useSelector((state) => state.user.orderSources);

  const ref = React.createRef();

  //ChartJS.register(ChartDataLabels);

  let options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },

      datalabels: {
        formatter: function (value, context) {
          let label = context.dataset.label + ": " || "";

          if (getOrderNum(context.chart.data.labels[context.dataIndex]) > 0) {
            if (label) {
              label +=
                value +
                " | " +
                getOrderNum(context.chart.data.labels[context.dataIndex]);
            }

            return label;
          } else {
            return "";
          }
        },
        anchor: "end",
        color: "black",
        font: {
          size: "11px",
          weight: "bold",
        },
        padding: {
          bottom: 6,
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label + " : " || "";

            if (label) {
              label +=
                context.formattedValue + " | " + getOrderNum(context.label);
            }

            return label;
          },
        },
        xAlign: "center",
        yAlign: "top",
        bodyFont: {
          size: 10,
        },
        titleFont: {
          size: 10,
        },
        titleSpacing: 1,
        titleMarginBottom: 2,
        padding: 2,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  const getFilteredOrders = () => {
    let allData = [];

    if (
      orderSources &&
      Object.keys(salesSummeryByOrderSource).length > 0 &&
      salesSummeryByOrderSource.salesSummeryByOrderSource &&
      salesSummeryByOrderSource.salesSummeryByOrderSource.length > 0
    ) {
      for (let i = 0; i < orderSources.length; i++) {
        let foundMatch = salesSummeryByOrderSource.salesSummeryByOrderSource
          .filter(function (el) {
            return el.orderSource === orderSources[i].configCriteriaValue;
          })
          .map((a) => a.orderValue);
        if (foundMatch.length > 0) {
          allData.push(foundMatch.reduce((a, b) => a + b, 0));
        } else {
          allData.push(0);
        }
      }
    }

    return allData;
  };

  const data = {
    labels: orderSources
      ? orderSources.map((value) => value.configCriteriaDesc)
      : [],
    datasets: [
      {
        label: "Order",
        data: getFilteredOrders(),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const getOrderNum = (lable) => {
    if (
      orderSources &&
      Object.keys(salesSummeryByOrderSource).length > 0 &&
      salesSummeryByOrderSource.salesSummeryByOrderSource &&
      salesSummeryByOrderSource.salesSummeryByOrderSource.length > 0
    ) {
      if (lable) {
        let found = salesSummeryByOrderSource.salesSummeryByOrderSource.find(
          (x) => x.orderSourceDescription === lable
        );

        if (found) {
          return found.noOfOrders;
        } else {
          return "";
        }
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  return (
    <div className="mt-3 p-3">
      {orderSources &&
      Object.keys(salesSummeryByOrderSource).length > 0 &&
      salesSummeryByOrderSource.salesSummeryByOrderSource &&
      salesSummeryByOrderSource.salesSummeryByOrderSource.length > 0 ? (
        <>
          <div className="mb-3">
            <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
              Sales Revenue by Channels
            </Typography>
          </div>
          <div ref={ref}>
            <Bar
              options={options}
              data={data}
              height="100px"
              plugins={[ChartDataLabels]}
            />
          </div>
          <div>
            <ExcelFile
              element={<Button variant="text">Download Full Report</Button>}
            >
              <ExcelSheet
                data={salesSummeryByOrderSource.salesSummeryByOrderSource}
                name="Sales Revenue by Channels"
              >
                <ExcelColumn label="Restaurant ID" value="restaurantId" />
                <ExcelColumn label="Store ID" value="storeId" />
                <ExcelColumn label="Restaurant Name" value="restaurantName" />
                <ExcelColumn label="Number Of Orders" value="noOfOrders" />
                <ExcelColumn label="Total Order Value" value="orderValue" />
                <ExcelColumn label="Order Source" value="orderSource" />
                <ExcelColumn
                  label="Order Source Description"
                  value="orderSourceDescription"
                />
              </ExcelSheet>
            </ExcelFile>
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
