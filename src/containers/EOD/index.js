import React, { useState } from "react";
import Layout from "../NewLayout";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays } from "date-fns";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Alert,
  Button,
  Popover,
} from "@mui/material";

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #add8e6;
  padding: 5px;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
  padding: 0;
`;

export const EOD = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [updateBusDate, setUpdateBusDate] = useState({});

  const onChangeDate = (date, id) => {
    const dates = { ...updateBusDate, [id]: date };
    setUpdateBusDate(dates);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Layout sidebar headerTitle="Customer">
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <CusTableCell1 align="center">ID</CusTableCell1>
                <CusTableCell1 align="center">STORE NAME</CusTableCell1>
                <CusTableCell1 align="center">BUSINESS DATE</CusTableCell1>
                <CusTableCell1 align="center">ACTION</CusTableCell1>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={1}>
                <CusTableCell2 align="center">1</CusTableCell2>
                <CusTableCell2 align="center">Yamunagar</CusTableCell2>
                <CusTableCell2 align="center">2022/5/15</CusTableCell2>
                <CusTableCell2 align="center">
                  <Button
                    key={1}
                    aria-describedby={id}
                    variant="contained"
                    color="warning"
                    sx={{
                      fontSize: "0.75rem",
                      lineHeight: "1rem",
                      padding: "5px 16px",
                    }}
                    onClick={handleClick}
                  >
                    EDIT
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <DatePicker
                      minDate={subDays(new Date(), 1)}
                      maxDate={addDays(new Date(), 1)}
                      selected={
                        updateBusDate["1"] ? updateBusDate["1"] : new Date()
                      }
                      onChange={(date) => onChangeDate(date, 1)}
                      inline
                    />
                    <div className="text-center mb-2">
                      <Button
                        key={1}
                        aria-describedby={id}
                        variant="contained"
                        color="success"
                        sx={{
                          fontSize: "0.75rem",
                          lineHeight: "1rem",
                          padding: "5px 16px",
                        }}
                        onClick={handleClose}
                      >
                        SAVE
                      </Button>
                    </div>
                  </Popover>
                </CusTableCell2>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};
