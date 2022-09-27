import React, { useEffect, useState } from "react";
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
  //const allReports = useSelector((state) => state.report.allReports);
  const salesSummeryByOrderSource = useSelector(
    (state) => state.report.salesSummeryByOrderSource
  );
  const orderSources = useSelector((state) => state.user.orderSources);
  /* const [webOrders, setWebOrders] = useState([]);
  const [webDelOrders, setWebDelOrders] = useState([]);
  const [storePickupOrders, setStorePickupOrders] = useState([]);
  const [selfDineQROrders, setSelfDineQROrders] = useState([]);
  const [webSelfOrders, setWebSelfOrders] = useState([]);
  const [mobileOrders, setMobileOrders] = useState([]);
  const [selfOrders, setSelfOrders] = useState([]);
  const [dineOrders, setDineOrders] = useState([]);
  const [zomatoOrders, setZomatoOrders] = useState([]);
  const [swizyOrders, setSwizyOrders] = useState([]);
  const [storeTakeAwayOrders, setStoreTakeAwayOrders] = useState([]);
  const [storeDeliveryOrders, setStoreDeliveryOrders] = useState([]);
  const [phoneSelfCollectOrders, setPhoneSelfCollectOrders] = useState([]);
  const [phoneDeliveryOrders, setPhoneDeliveryOrders] = useState([]); */

  /* defaults.font.size = "10px"; */

  const ref = React.createRef();

  ChartJS.register(ChartDataLabels);

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
      /* title: {
        display: true,
        text: "Chart.js Bar Chart",
      }, */
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

  /* useEffect(() => {

    setMobileOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "M";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setSwizyOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "S";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setZomatoOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "Z";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setDineOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "D";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setWebDelOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "WD";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setStorePickupOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "SP";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setPhoneDeliveryOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "PD";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setStoreDeliveryOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "SD";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setSelfDineQROrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "Q";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setStoreTakeAwayOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "ST";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setWebSelfOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "WS";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );

    setPhoneSelfCollectOrders(
      allReports.salesSummeryByOrderSource
        .filter(function (el) {
          return el.orderSource === "PT";
        })
        .map((a) => a.orderValue)
        .reduce((a, b) => a + b, 0)
    );
  }, [allReports]); */

  const getFilteredOrders = () => {
    let allData = [];

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

    return allData;
  };

  const data = {
    labels: orderSources.map((value) => value.configCriteriaDesc),
    //labels,
    datasets: [
      /* {
        label: "Sale",
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }, */
      {
        label: "Order",
        data: getFilteredOrders(),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const getOrderNum = (lable) => {
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
  };

  return (
    <div className="mt-3 p-3">
      <div className="mb-3">
        <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
          Sales Revenue by Channels
        </Typography>
      </div>
      <div ref={ref}>
        <Bar options={options} data={data} height="100px" />
      </div>
      <div>
        {/* <Pdf targetRef={ref} filename="Sales Revenue by Channels.pdf">
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
            {/* <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/> */}
          </ExcelSheet>
        </ExcelFile>
      </div>
    </div>
  );
};
