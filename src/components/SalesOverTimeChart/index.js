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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    /* title: {
      display: true,
      text: "Chart.js Bar Chart",
    }, */
  },
  scales: {
    x: {
      ticks: {
        display: false,
      },
    },
  },
};

export const SalesOverTimeChart = () => {
  const allReports = useSelector((state) => state.report.allReports);
  const ref = React.createRef();

  const labels = allReports?.salesSummeryByDateList?.map(
    (a) =>
      `${Number(new Date(a.orderDate).getMonth()) + 1}/ ${new Date(
        a.orderDate
      ).getDate()} - ${a.restaurantName}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: allReports.salesSummeryByDateList.map((a) => a.orderValue),
        backgroundColor: allReports.salesSummeryByDateList.map((a) =>
          randomColor({
            luminosity: "dark",
            format: "rgba",
            alpha: 0.5,
          })
        ),
      },
    ],
  };

  return (
    <div className="mt-3 p-3">
      <div className="mb-3">
        <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
          Sales Over Time
        </Typography>
      </div>
      <div ref={ref}>
        <Bar options={options} data={data} height="100px" />
      </div>
      <div>
        {/* <Pdf targetRef={ref} filename="Sales Over Time.pdf">
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
            data={allReports.salesSummeryByDateList}
            name="Sales Over Time"
          >
            <ExcelColumn label="Year" value="year" />
            <ExcelColumn label="Month" value="month" />
            <ExcelColumn label="Full Date" value="orderDate" />
            <ExcelColumn label="Restaurant ID" value="restaurantId" />
            <ExcelColumn label="Store ID" value="storeId" />
            <ExcelColumn label="Restaurant Name" value="restaurantName" />
            <ExcelColumn label="Number Of Orders" value="noOfOrders" />
            <ExcelColumn label="Total Order Value" value="orderValue" />
            <ExcelColumn label="Report Name" value="reportName" />
            {/* <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/> */}
          </ExcelSheet>
        </ExcelFile>
      </div>
    </div>
  );
};
