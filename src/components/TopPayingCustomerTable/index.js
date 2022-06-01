import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const TopPayingCustomerTable = () => {
  return (
    <div className="mt-3">
      <div className="mb-3">
        <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
          Top Paying Customer
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#5B9BD5", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }} align="left">
                Customer Name
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="left">
                Phone No
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="left">
                No of Orders
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="left">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
