import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveNewCoupon, updateCoupon } from "../../actions";
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
    padding: 0.25rem;
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

  const dispatch = useDispatch();

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
    }
  };

  const handleStartDateChange = (newValue) => {
    setNewStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setNewEndDate(newValue);
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
    };

    dispatch(saveNewCoupon(couponObj)).then((res) => {
      if (res) {
        handleIsnewCoupon();
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
            <TableRow>
              <CusTableCell align="center">1</CusTableCell>
              <CusTableCell>testing</CusTableCell>
              <CusTableCell>testing</CusTableCell>
              <CusTableCell>testing</CusTableCell>
              <CusTableCell>testing</CusTableCell>
              <CusTableCell>testing</CusTableCell>
              <CusTableCell>testing</CusTableCell>
              <CusTableCell>testing</CusTableCell>
              <CusTableCell align="center">
                {isSave[1] ? (
                  <Button
                    key={1}
                    variant="contained"
                    color="success"
                    sx={{
                      fontSize: "0.75rem",
                      lineHeight: "1rem",
                      padding: "5px 16px",
                    }}
                    onClick={() => {
                      onSaveClickHandle(1);
                      //saveUpdateProduct(product);
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
                      onEditClickHandle(1);
                    }}
                  >
                    EDIT
                  </Button>
                )}
              </CusTableCell>
            </TableRow>

            {isNewCoupon ? (
              <TableRow>
                <CusTableCell align="center">2</CusTableCell>
                <CusTableCell>{selectedStoreObj.resturantName}</CusTableCell>
                <CusTableCell>
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
                <CusTableCell>
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
                <CusTableCell>
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
                    padding: "10px !important",
                    maxWidth: "110px",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CusDesktopDatePicker
                      label="Start Date"
                      inputFormat="MM/dd/yyyy"
                      value={newStartDate}
                      onChange={handleStartDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </CusTableCell>
                <CusTableCell
                  align="center"
                  sx={{
                    padding: "10px !important",
                    maxWidth: "110px",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CusDesktopDatePicker
                      label="End Date"
                      inputFormat="MM/dd/yyyy"
                      value={newEndDate}
                      onChange={handleEndDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </CusTableCell>
                <CusTableCell>
                  <FormControl fullWidth className="mt-3">
                    <CusInputLabel
                      sx={{
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        top: "-11px",
                      }}
                    >
                      (Y/N)
                    </CusInputLabel>
                    <CusSelect
                      label="(Y/N)"
                      onChange={(event) => {
                        setNewActiveFlag(event.target.value);
                      }}
                      sx={{ fontSize: "0.75rem" }}
                      defaultValue="Y"
                      //variant="standard"
                    >
                      <CusMenuItem value={"Y"} style={{ fontSize: "0.75rem" }}>
                        Y
                      </CusMenuItem>
                      <CusMenuItem value={"N"} style={{ fontSize: "0.75rem" }}>
                        N
                      </CusMenuItem>
                    </CusSelect>
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
      </TableContainer>
    </Layout>
  );
};
