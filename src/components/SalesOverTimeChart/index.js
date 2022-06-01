import React from "react";
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const SalesOverTimeChart = () => {
  return (
    <div className="mt-3 p-3">
      <div className="mb-3">
        <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
          Sales Over Time
        </Typography>
      </div>
      <Bar options={options} data={data} height="100px" />
      <div>
        <Button variant="text">Download Full Report</Button>
      </div>
    </div>
  );
};
