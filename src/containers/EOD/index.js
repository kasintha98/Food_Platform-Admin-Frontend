import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../NewLayout";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays } from "date-fns";
import {
  getAllBusinessDates,
  updateBusinessDate,
  getBusinessDate,
} from "../../actions";
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
  const allBusinessDates = useSelector((state) => state.user.allBusinessDates);
  const user = useSelector((state) => state.auth.user);
  const stores = useSelector((state) => state.store.stores);

  const [anchorEl, setAnchorEl] = useState(null);
  const [updateBusDate, setUpdateBusDate] = useState({});
  const [openPop, setOpenPop] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBusinessDates(user.restaurantId));
  }, []);

  const onChangeDate = (date, id) => {
    const dates = { ...updateBusDate, [id]: date };
    setUpdateBusDate(dates);
  };

  const handleClick = (event, idA) => {
    setAnchorEl(event.currentTarget);
    setOpenPop({ ...openPop, [idA]: true });
  };

  const handleClose = (idA) => {
    setAnchorEl(null);
    setOpenPop({ ...openPop, [idA]: false });
  };

  const handleUpdateBusDate = (busDate) => {
    const obj = {
      restaurantId: busDate.restaurantId,
      storeId: busDate.storeId,
      businessDate: updateBusDate[busDate.id]
        ? `${updateBusDate[busDate.id].getFullYear()}-${
            Number(updateBusDate[busDate.id].getMonth() + 1).toString().length <
            2
              ? `0${updateBusDate[busDate.id].getMonth() + 1}`
              : updateBusDate[busDate.id].getMonth() + 1
          }-${
            Number(updateBusDate[busDate.id].getDate()).toString().length < 2
              ? `0${updateBusDate[busDate.id].getDate()}`
              : updateBusDate[busDate.id].getDate()
          }`
        : busDate.businessDate,
    };
    dispatch(updateBusinessDate(obj)).then((res) => {
      if (res) {
        dispatch(getBusinessDate(user.restaurantId, user.storeId));
        handleClose(busDate.id);
      }
    });
  };

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
              {allBusinessDates && allBusinessDates.length > 0 ? (
                <>
                  {allBusinessDates.map((busDate, index) => (
                    <TableRow key={index}>
                      <CusTableCell2 align="center">{busDate.id}</CusTableCell2>
                      <CusTableCell2 align="center">
                        {/* {stores && stores.length > 0 ? (
                          <>
                            {
                              stores.find(
                                (o) =>
                                  o.restaurantId === busDate.restaurantId &&
                                  o.storeId === busDate.storeId
                              ).storeId
                            }
                          </>
                        ) : (
                          <>
                            {busDate.restaurantId} - {busDate.storeId}
                          </>
                        )} */}
                        {busDate.restaurantId} - {busDate.storeId}
                      </CusTableCell2>
                      <CusTableCell2 align="center">
                        {`${
                          Number(
                            new Date(busDate.businessDate).getDate()
                          ).toString().length < 2
                            ? `0${new Date(busDate.businessDate).getDate()}`
                            : new Date(busDate.businessDate).getDate()
                        }-${new Date(busDate.businessDate).toLocaleString(
                          "default",
                          {
                            month: "short",
                          }
                        )}-${new Date(busDate.businessDate).getFullYear()}`}
                      </CusTableCell2>
                      <CusTableCell2 align="center">
                        <Button
                          key={index}
                          aria-describedby={busDate.id}
                          variant="contained"
                          color="warning"
                          sx={{
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            padding: "5px 16px",
                          }}
                          onClick={(e) => {
                            handleClick(e, busDate.id);
                          }}
                        >
                          EDIT
                        </Button>
                        <Popover
                          key={index}
                          id={busDate.id}
                          open={openPop[busDate.id]}
                          anchorEl={anchorEl}
                          onClose={() => {
                            handleClose(busDate.id);
                          }}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <DatePicker
                            key={index}
                            minDate={subDays(new Date(busDate.businessDate), 1)}
                            maxDate={addDays(new Date(busDate.businessDate), 1)}
                            selected={
                              updateBusDate[busDate.id]
                                ? updateBusDate[busDate.id]
                                : new Date(busDate.businessDate)
                            }
                            onChange={(date) => onChangeDate(date, busDate.id)}
                            inline
                          />
                          <div className="text-center mb-2">
                            <Button
                              key={index}
                              aria-describedby={busDate.id}
                              variant="contained"
                              color="success"
                              sx={{
                                fontSize: "0.75rem",
                                lineHeight: "1rem",
                                padding: "5px 16px",
                              }}
                              onClick={() => {
                                handleUpdateBusDate(busDate);
                              }}
                            >
                              SAVE
                            </Button>
                          </div>
                        </Popover>
                      </CusTableCell2>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <CusTableCell2 align="center" colSpan={4}>
                    <Alert severity="warning" className="mt-4">
                      No business dates to show!
                    </Alert>
                  </CusTableCell2>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};
