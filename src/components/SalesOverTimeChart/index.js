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
import Pdf from "react-to-pdf";

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
};

export const SalesOverTimeChart = () => {
  const allReports = useSelector((state) => state.report.allReports);
  const ref = React.createRef();

  const labels = allReports?.salesSummeryByDateList?.map(
    (a) => `${a.month} ${new Date(a.orderDate).getDate()}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: allReports.salesSummeryByDateList.map((a) => a.orderValue),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
        <Pdf targetRef={ref} filename="Sales Over Time.pdf">
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
