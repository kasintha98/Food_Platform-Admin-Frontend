import React from "react";
import Layout from "../NewLayout";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer, Button } from "@mui/material";

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
`;

const CusTableCell2 = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
  font-weight: bold;
  background-color: #add8e6;
`;

export const Coupon = () => {
  return (
    <Layout sidebar headerTitle="Coupons">
      <TableContainer className="mt-2">
        <Table sx={{ minWidth: 800 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <CusTableCell2 align="center">No</CusTableCell2>
              <CusTableCell2 align="center">Store Name</CusTableCell2>
              <CusTableCell2 align="center">Coupon Code</CusTableCell2>
              <CusTableCell2 align="center">Discount Percentage</CusTableCell2>
              <CusTableCell2 align="center">Description</CusTableCell2>
              <CusTableCell2 align="center">Start Date</CusTableCell2>
              <CusTableCell2 align="center">End Date</CusTableCell2>
              <CusTableCell2 align="center">Active Flag</CusTableCell2>
              {/* <CusTableCell2 align="center">Created By</CusTableCell2>
              <CusTableCell2 align="center">Created Date</CusTableCell2>
              <CusTableCell2 align="center">Updated By</CusTableCell2>
              <CusTableCell2 align="center">Updated Date</CusTableCell2> */}
              <CusTableCell2 align="center">Action</CusTableCell2>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <CusTableCell>1</CusTableCell>
              <CusTableCell>aa</CusTableCell>
              <CusTableCell>aa</CusTableCell>
              <CusTableCell>aa</CusTableCell>
              <CusTableCell>aa</CusTableCell>
              <CusTableCell>aa</CusTableCell>
              <CusTableCell>aa</CusTableCell>
              <CusTableCell>aa</CusTableCell>
              <CusTableCell align="center">
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    fontSize: "0.75rem",
                    lineHeight: "1rem",
                    padding: "5px 16px",
                  }}
                >
                  EDIT
                </Button>
              </CusTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};
