import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveNewCoupon, updateCoupon, getAllCoupons } from "../../actions";
import { toast } from "react-toastify";
import Layout from "../NewLayout";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  TableContainer,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  NativeSelect,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

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
const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const CusInputLabel = styled(InputLabel)`
  &.Mui-focused {
    top: 0px !important;
  }

  &.MuiFormLabel-filled {
    top: 0px !important;
  }
`;

const CusMenuItem = styled(MenuItem)``;

const CusDesktopDatePicker = styled(DesktopDatePicker)`
  & input {
    font-size: 0.75rem;
    padding: 0 !important;
  }

  &.MuiOutlinedInput-input {
    padding: 0 !important;
  }

  &.MuiInputBase-input {
    padding: 0 !important;
  }

  &.MuiInputBase-inputAdornedEnd {
    padding: 0 !important;
  }

  &.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 0 !important;
  }
`;

const CusTextField = styled(TextField)`
 & label {
  font-size: 0.75rem;
  top: -11px;
}

& .Mui-focused{
  top: 0px !important;
}

& fieldset{
  font-size: 0.75rem;
}

& .MuiFormLabel-filled{
  top: 0px !important;
}

& input{
  font-size: 0.75rem;
  padding: 0.25rem;
}
 }
`;

export const Coupon = () => {
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const allCoupons = useSelector((state) => state.user.allCoupons);

  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [isSave, setIsSave] = useState({});
  const [isNewCoupon, setIsNewCoupon] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStartDate, setNewStartDate] = useState(new Date());
  const [newEndDate, setNewEndDate] = useState(new Date());
  const [newActiveFlag, setNewActiveFlag] = useState("Y");
  const [updateStartDate, setUpdateStartDate] = useState({});
  const [updateEndDate, setUpdateEndDate] = useState({});
  const [isRefresh, setIsRefresh] = useState(false);
  const [currentCode, setCurrentCode] = useState({});
  const [currentDiscount, setCurrentDiscount] = useState({});
  const [currentDescription, setCurrentDescription] = useState({});
  const [currentActiveFlag, setCurrentActiveFlag] = useState("");

  const dispatch = useDispatch();
  const newRowRef = useRef(null);

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getAllCoupons(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      );
    }
  }, [selectedStoreObj, isRefresh]);

  const handleRefresh = () => {
    if (isRefresh) {
      setIsRefresh(false);
    } else {
      setIsRefresh(true);
    }
  };

  const scrollToBottom = () => {
    newRowRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  const handleIsnewCoupon = () => {
    if (isNewCoupon) {
      setIsNewCoupon(false);
    } else {
      setIsNewCoupon(true);
      scrollToBottom();
    }
  };

  const handleStartDateChange = (newValue) => {
    setNewStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setNewEndDate(newValue);
  };

  const handleUpdateStartDateChange = (newValue, id) => {
    const start = { ...updateStartDate, [id]: newValue };
    setUpdateStartDate(start);
  };

  const handleUpdateEndDateChange = (newValue, id) => {
    const end = { ...updateEndDate, [id]: newValue };
    setUpdateEndDate(end);
  };

  const saveUpdateCouponHandle = (coupon) => {
    const updatedCoupon = {
      ...coupon,
      id: coupon.id,
      restaurantId: coupon.restaurantId,
      storeId: coupon.storeId,
      couponCode: currentCode[coupon.id]
        ? currentCode[coupon.id]
        : coupon.couponCode,
      discountPercentage: currentDiscount[coupon.id]
        ? currentDiscount[coupon.id]
        : coupon.discountPercentage,
      description: currentDescription[coupon.id]
        ? currentDescription[coupon.id]
        : coupon.description,
      effectiveStartDate: updateStartDate[coupon.id]
        ? `${updateStartDate[coupon.id].getFullYear()}-${
            Number(updateStartDate[coupon.id].getMonth() + 1).toString()
              .length < 2
              ? `0${updateStartDate[coupon.id].getMonth() + 1}`
              : updateStartDate[coupon.id].getMonth() + 1
          }-${
            Number(updateStartDate[coupon.id].getDate()).toString().length < 2
              ? `0${updateStartDate[coupon.id].getDate()}`
              : updateStartDate[coupon.id].getDate()
          }`
        : coupon.effectiveStartDate,
      effectiveEndDate: updateEndDate[coupon.id]
        ? `${updateEndDate[coupon.id].getFullYear()}-${
            Number(updateEndDate[coupon.id].getMonth() + 1).toString().length <
            2
              ? `0${updateEndDate[coupon.id].getMonth() + 1}`
              : updateEndDate[coupon.id].getMonth() + 1
          }-${
            Number(updateEndDate[coupon.id].getDate()).toString().length < 2
              ? `0${updateEndDate[coupon.id].getDate()}`
              : updateEndDate[coupon.id].getDate()
          }`
        : coupon.effectiveEndDate,
      activeFlag: currentActiveFlag ? currentActiveFlag : coupon.activeFlag,
    };

    dispatch(updateCoupon(updatedCoupon)).then((res) => {
      if (res) {
      }
    });
  };

  const handleCouponActiveFlag = (event) => {
    setCurrentActiveFlag(event.target.value);
  };

  const saveNewCouponHandle = () => {
    if (!newCode || !newDiscount || !newDescription) {
      toast.error("Please fill all the fields!");
      return;
    }

    if (!Number(newDiscount)) {
      toast.error("Discount percentage should be a number!");
      return;
    }

    const couponObj = {
      restaurantId: selectedStoreObj.restaurantId,
      storeId: selectedStoreObj.storeId,
      couponCode: newCode,
      discountPercentage: Number(newDiscount),
      description: newDescription,
      effectiveStartDate: `${newStartDate.getFullYear()}-${
        Number(newStartDate.getMonth() + 1).toString().length < 2
          ? `0${newStartDate.getMonth() + 1}`
          : newStartDate.getMonth() + 1
      }-${
        Number(newStartDate.getDate()).toString().length < 2
          ? `0${newStartDate.getDate()}`
          : newStartDate.getDate()
      }`,
      effectiveEndDate: `${newEndDate.getFullYear()}-${
        Number(newEndDate.getMonth() + 1).toString().length < 2
          ? `0${newEndDate.getMonth() + 1}`
          : newEndDate.getMonth() + 1
      }-${
        Number(newEndDate.getDate()).toString().length < 2
          ? `0${newEndDate.getDate()}`
          : newEndDate.getDate()
      }`,
      activeFlag: newActiveFlag,
      createdBy: user.loginId,
    };

    dispatch(saveNewCoupon(couponObj)).then((res) => {
      if (res) {
        handleIsnewCoupon();
        setNewCode("");
        setNewDiscount("");
        setNewDescription("");
        setNewStartDate(new Date());
        setNewEndDate(new Date());
        setNewActiveFlag("Y");
        handleRefresh();
      }
    });
  };

  return (
    <Layout sidebar headerTitle="Coupons">
      <div className="text-center">
        <Typography
          sx={{ color: "#2F5597", fontSize: "20px", fontWeight: "bold" }}
        >
          COUPON CODE
        </Typography>
      </div>
      <Row className="align-items-center">
        <div style={{ minWidth: "180px" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Select Store
          </Typography>
        </div>
        <Col sm={2}>
          <FormControl fullWidth>
            <CusInputLabel
              sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              id="demo-simple-select-label"
            >
              Please select the store
            </CusInputLabel>
            <CusSelect
              sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedStore}
              label="Please select the store"
              onChange={handleChangeStore}
            >
              {stores.map((store) => (
                <CusMenuItem
                  onClick={() => {
                    handleSelectedStore(store);
                  }}
                  value={store.resturantName}
                >
                  <span>{store.resturantName}</span>
                </CusMenuItem>
              ))}
            </CusSelect>
          </FormControl>
        </Col>
        <Col sm={8} style={{ display: "flex", justifyContent: "end" }}>
          <Button
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              padding: "5px 16px",
            }}
            variant="contained"
            color="success"
            onClick={() => {
              if (!selectedStoreObj) {
                toast.error("Please select a store first!");
              } else {
                handleIsnewCoupon();
              }
            }}
          >
            ADD NEW COUPON
          </Button>
        </Col>
      </Row>
      <TableContainer className="mt-2">
        <Table sx={{ minWidth: 800 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <CusTableCell2 align="center">ID</CusTableCell2>
              <CusTableCell2 align="center">Store Name</CusTableCell2>
              <CusTableCell2 align="center">Code</CusTableCell2>
              <CusTableCell2 align="center">Discount (%)</CusTableCell2>
              <CusTableCell2 align="center">Code Description</CusTableCell2>
              <CusTableCell2 align="center">Start Date</CusTableCell2>
              <CusTableCell2 align="center">End Date</CusTableCell2>
              <CusTableCell2 align="center">Active Flag</CusTableCell2>
              <CusTableCell2 align="center">Action</CusTableCell2>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCoupons && allCoupons.length > 0 ? (
              <>
                {allCoupons.map((coupon, index) => (
                  <TableRow key={index}>
                    <CusTableCell align="center">
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: isSave[coupon.id] ? "black" : "#404040",
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </CusTableCell>
                    <CusTableCell align="center">
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: isSave[coupon.id] ? "black" : "#404040",
                        }}
                      >
                        {selectedStoreObj
                          ? selectedStoreObj.resturantName
                          : `${coupon.restaurantId}-${coupon.storeId}`}
                      </Typography>
                    </CusTableCell>
                    <CusTableCell align="center">
                      <CusTextField
                        disabled={!isSave[coupon.id]}
                        key={coupon.id}
                        defaultValue={coupon.couponCode}
                        value={currentCode[coupon.id]}
                        onChange={(event) => {
                          const codes = {
                            ...currentCode,
                            [coupon.id]: event.target.value,
                          };
                          setCurrentCode(codes);
                        }}
                        sx={{
                          fontSize: "0.75rem",
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: isSave[coupon.id]
                              ? "black"
                              : "#404040",
                          },
                        }}
                        fullWidth
                        variant="standard"
                      />
                    </CusTableCell>
                    <CusTableCell align="center">
                      <CusTextField
                        disabled={!isSave[coupon.id]}
                        key={coupon.id}
                        defaultValue={coupon.discountPercentage}
                        value={currentDiscount[coupon.id]}
                        onChange={(event) => {
                          const discounts = {
                            ...currentDiscount,
                            [coupon.id]: event.target.value,
                          };
                          setCurrentDiscount(discounts);
                        }}
                        sx={{
                          fontSize: "0.75rem",
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: isSave[coupon.id]
                              ? "black"
                              : "#404040",
                          },
                        }}
                        fullWidth
                        variant="standard"
                      />
                    </CusTableCell>
                    <CusTableCell align="center">
                      <CusTextField
                        disabled={!isSave[coupon.id]}
                        key={coupon.id}
                        defaultValue={coupon.description}
                        value={currentDescription[coupon.id]}
                        onChange={(event) => {
                          const descs = {
                            ...currentDescription,
                            [coupon.id]: event.target.value,
                          };
                          setCurrentDescription(descs);
                        }}
                        sx={{
                          fontSize: "0.75rem",
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: isSave[coupon.id]
                              ? "black"
                              : "#404040",
                          },
                        }}
                        fullWidth
                        variant="standard"
                      />
                    </CusTableCell>
                    <CusTableCell
                      sx={{
                        maxWidth: "130px",
                      }}
                      align="center"
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <CusDesktopDatePicker
                          disabled={!isSave[coupon.id]}
                          label="Start Date"
                          inputFormat="MM/dd/yyyy"
                          value={
                            updateStartDate[coupon.id]
                              ? updateStartDate[coupon.id]
                              : coupon.effectiveStartDate
                          }
                          onChange={(e) => {
                            handleUpdateStartDateChange(e, coupon.id);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                fontSize: "0.75rem",
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: isSave[coupon.id]
                                    ? "black"
                                    : "#404040",
                                },
                                "& .MuiInputBase-input": {
                                  fontSize: "0.75rem",
                                  padding: "0.25rem",
                                },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </CusTableCell>
                    <CusTableCell
                      sx={{
                        maxWidth: "130px",
                        height: "50px",
                      }}
                      align="center"
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <CusDesktopDatePicker
                          disabled={!isSave[coupon.id]}
                          label="End Date"
                          inputFormat="MM/dd/yyyy"
                          value={
                            updateEndDate[coupon.id]
                              ? updateEndDate[coupon.id]
                              : coupon.effectiveEndDate
                          }
                          onChange={(e) => {
                            handleUpdateEndDateChange(e, coupon.id);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                fontSize: "0.75rem",
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: isSave[coupon.id]
                                    ? "black"
                                    : "#404040",
                                },
                                "& .MuiInputBase-input": {
                                  fontSize: "0.75rem",
                                  padding: "0.25rem",
                                },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </CusTableCell>
                    <CusTableCell align="center">
                      <NativeSelect
                        disabled={!isSave[coupon.id]}
                        defaultValue={coupon.activeFlag}
                        inputProps={{
                          name: "status",
                          id: "uncontrolled-native",
                        }}
                        onChange={handleCouponActiveFlag}
                        sx={{
                          fontSize: "0.75rem",
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: isSave[coupon.id]
                              ? "black"
                              : "#404040",
                          },
                        }}
                      >
                        <option value={"Y"} style={{ fontSize: "0.75rem" }}>
                          Y
                        </option>
                        <option value={"N"} style={{ fontSize: "0.75rem" }}>
                          N
                        </option>
                      </NativeSelect>
                    </CusTableCell>
                    <CusTableCell align="center">
                      {isSave[coupon.id] ? (
                        <Button
                          key={coupon.id}
                          variant="contained"
                          color="success"
                          sx={{
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            padding: "5px 16px",
                          }}
                          onClick={() => {
                            onSaveClickHandle(coupon.id);
                            saveUpdateCouponHandle(coupon);
                          }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          key={1}
                          variant="contained"
                          color="warning"
                          sx={{
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            padding: "5px 16px",
                          }}
                          onClick={() => {
                            onEditClickHandle(coupon.id);
                          }}
                        >
                          EDIT
                        </Button>
                      )}
                    </CusTableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {selectedStoreObj ? (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <Alert severity="warning">No coupons found!</Alert>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <Alert severity="warning">
                        Please select a store first!
                      </Alert>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}

            {isNewCoupon ? (
              <TableRow>
                <CusTableCell align="center">
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                    }}
                  >
                    {allCoupons.length + 1}
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                    }}
                  >
                    {selectedStoreObj.resturantName}
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <CusTextField
                    label="Code"
                    value={newCode}
                    onChange={(event) => {
                      setNewCode(event.target.value);
                    }}
                    fullWidth
                    variant="standard"
                  />
                </CusTableCell>
                <CusTableCell align="center">
                  <CusTextField
                    label="Discount"
                    value={newDiscount}
                    onChange={(event) => {
                      setNewDiscount(event.target.value);
                    }}
                    fullWidth
                    variant="standard"
                  />
                </CusTableCell>
                <CusTableCell align="center">
                  <CusTextField
                    label="Description"
                    value={newDescription}
                    onChange={(event) => {
                      setNewDescription(event.target.value);
                    }}
                    fullWidth
                    variant="standard"
                  />
                </CusTableCell>
                <CusTableCell
                  align="center"
                  sx={{
                    maxWidth: "130px",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CusDesktopDatePicker
                      label="Start Date"
                      inputFormat="MM/dd/yyyy"
                      value={newStartDate}
                      onChange={handleStartDateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            fontSize: "0.75rem",

                            "& .MuiInputBase-input": {
                              fontSize: "0.75rem",
                              padding: "0.25rem",
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </CusTableCell>
                <CusTableCell
                  align="center"
                  sx={{
                    maxWidth: "130px",
                    height: "50px",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CusDesktopDatePicker
                      label="End Date"
                      inputFormat="MM/dd/yyyy"
                      value={newEndDate}
                      onChange={handleEndDateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            fontSize: "0.75rem",

                            "& .MuiInputBase-input": {
                              fontSize: "0.75rem",
                              padding: "0.25rem",
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </CusTableCell>
                <CusTableCell align="center">
                  <FormControl className="mt-3">
                    <NativeSelect
                      onChange={(event) => {
                        setNewActiveFlag(event.target.value);
                      }}
                      sx={{ fontSize: "0.75rem" }}
                      defaultValue="Y"
                    >
                      <option value={"Y"} style={{ fontSize: "0.75rem" }}>
                        Y
                      </option>
                      <option value={"N"} style={{ fontSize: "0.75rem" }}>
                        N
                      </option>
                    </NativeSelect>
                  </FormControl>
                </CusTableCell>
                <CusTableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      fontSize: "0.75rem",
                      lineHeight: "1rem",
                      padding: "5px 16px",
                    }}
                    onClick={saveNewCouponHandle}
                  >
                    Save
                  </Button>
                </CusTableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
        <div className="mb-4" ref={newRowRef}></div>
      </TableContainer>
    </Layout>
  );
};
