import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Layout from "../NewLayout";
import { Container, Row, Col } from "react-bootstrap";
import { TextField } from "@mui/material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import Switch from "@mui/material/Switch";
import { withStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { saveStore } from "../../actions";
import { SaveDeliveryPrice } from "../../actions";
import { GetDeliveryPrice } from "../../actions";
// import { getAllStores } from "../../actions";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: "white",
    fontSize: "12px",
    transition: "transform 200ms",
  },
  inputLabelShrink: {
    color: "white",
    fontSize: "10px",
    transform: "translate(0, 0px)",
    width: "200px",
    textAlign: "left",
  },
}));

const rootStyle = {
  width: "320px", // Set the width of the TextField to 400px
};

const inputStyle = {
  color: "white", // Set the text color to white
};

const underlineStyle = {
  "&:before": {
    borderBottomWidth: 2, // Set the underline width to 2px
    borderBottomStyle: "solid",
    borderBottomColor: "white", // Change the color of the underline when the field is not focused
  },
  "&:after": {
    borderBottomColor: "white", // Change the color of the underline when the field is focused
  },
};

const underlineStyle2 = {
  "&:before": {
    borderBottomWidth: 2, // Set the underline width to 2px
    borderBottomStyle: "solid",
    borderBottomColor: "black", // Change the color of the underline when the field is not focused
  },
  "&:after": {
    borderBottomColor: "black", // Change the color of the underline when the field is focused
  },
};

const YellowSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
  },
  switchBase: {
    padding: 2,
    "&$checked": {
      transform: "translateX(12px)",
      "& + $track": {
        backgroundColor: "#e3f522",
        opacity: 1,
        border: "none",
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    borderRadius: 16 / 2,
    opacity: 1,
  },
  checked: {},
}))(Switch);

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
  color: #000;
}

& .MuiFormLabel-filled{
  top: 0px !important;
}

& input{
  font-size: 0.75rem;
  padding: 0.25rem;
  text-align: center;
  font-family: 'Roboto';
  color: #000;
}
 }

 & .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color:  #000;
  }
`;

const StoreMaster = () => {
  const stores = useSelector((state) => state.store.stores);

  // console.log("aaa str", stores);

  const now = new Date();
  const dateString = now.toISOString();

  const [storeId, setStoreId] = useState("");
  const [resturantId, setResturantId] = useState("R001");
  const [storeName, setStoreName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState(null);
  const [gstno, setGstno] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [weraMerchantId, setWeraMerchantId] = useState("");
  const [weraAPIKey, setweraAPIKey] = useState("");
  const [weraAPIValue, setweraAPIValue] = useState("");
  const [storeKOTPrintFlag, setStoreKOTPrintFlag] = useState("");
  const [storeActiveFlag, setStoreActiveFlag] = useState("");
  const [onlineAvailableFlag, setOnlineAvailableFlag] = useState("");
  const [dineinAvailableFlag, setDineinAvailableFlag] = useState("");
  const [storeGstNumber, setStoreGstNumber] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [right, setRight] = useState(false);
  const [newrule, setNewrule] = useState(false);
  const [currentminAmount, setCurrentminAmount] = useState(0);
  const [currentmaxAmount, setCurrentmaxAmount] = useState(0);
  const [currentdeliveryfee, setCurrentdeliveryfee] = useState(0);
  const [deliveryEdit, setdeliveryEdit] = useState("");
  // console.log("aaa currentdeliveryfee", currentdeliveryfee);
  // console.log("aaa currentmaxAmount", currentmaxAmount);
  // console.log("aaa currentdeliveryfee", currentdeliveryfee);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDeliveryPrice(resturantId, storeId));
  }, [storeId]);
  const deliveryCharges = useSelector((state) => state.user.deliveryPrice);
  console.log("aaa deliveryCharges", deliveryCharges);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleStoreClick = (store) => {
    setStoreId(store.storeId);
    setResturantId(store.restaurantId);
    setStoreName(store.resturantName);
    setAddress1(store.address1);
    setAddress2(store.address2);
    setLandmark(store.landmrk);
    setState(store.state);
    setCountry(store.country);
    setCity(store.city);
    setZipcode(store.zipCode);
    setGstno(store.gstno);
    setStarttime(store.storeStartTime);
    setEndtime(store.storeEndTime);
    setWeraMerchantId(store.weraMerchantId == null ? "" : store.weraMerchantId);
    setweraAPIKey(store.weraAPIKey == null ? "" : store.weraAPIKey);
    setweraAPIValue(store.weraAPIValue == null ? "" : store.weraAPIValue);
    setStoreKOTPrintFlag(
      store.storeKOTPrintFlag == null ? "N" : store.storeKOTPrintFlag
    );
    setStoreActiveFlag(
      store.storeActiveFlag == null ? "N" : store.storeActiveFlag
    );
    setOnlineAvailableFlag(
      store.onlineAvailableFlag == null ? "N" : store.onlineAvailableFlag
    );
    setDineinAvailableFlag(
      store.dineinAvailableFlag == null ? "N" : store.dineinAvailableFlag
    );
    setStoreGstNumber(store.storeGstNumber);
    setCreatedDate(store.createdDate);
    setUpdatedDate(store.updatedDate);
  };

  const addStore = () => {
    toast.info("Fill Store Information!");
    setStoreId("");
    setResturantId("R001");
    setStoreName("");
    setAddress1("");
    setAddress2("");
    setLandmark("");
    setState("");
    setCountry("");
    setCity("");
    setZipcode(null);
    setGstno("");
    setStarttime("");
    setEndtime("");
    setWeraMerchantId("");
    setweraAPIValue("");
    setweraAPIKey("");
    setStoreKOTPrintFlag("N");
    setStoreActiveFlag("N");
    setOnlineAvailableFlag("N");
    setDineinAvailableFlag("N");
    setStoreGstNumber("");
    setCreatedDate("");
    setUpdatedDate("");
  };

  const saveNewStore = async () => {
    const newStore = {
      storeId: storeId,
      restaurantId: resturantId,
      resturantName: storeName,
      country: country,
      city: city,
      storeActiveFlag: storeActiveFlag,
      storeKOTPrintFlag: storeKOTPrintFlag,
      zipCode: zipcode,
      storeStartTime: starttime,
      storeEndTime: endtime,
      storeGstNumber: gstno,
      address1: address1,
      address2: address2,
      address3: "",
      storeAvailableForPickup: "",
      storeAvailableForDelivery: "",
      weraMerchantId: weraMerchantId == "" ? null : weraMerchantId,
      weraAPIKey: weraAPIKey,
      weraAPIValue: weraAPIValue,
      menuCloneFlag: "",
      onlineAvailableFlag: onlineAvailableFlag,
      dineinAvailableFlag: dineinAvailableFlag,
      longitude: "",
      latitude: "",
      createdBy: user.createdBy,
      createdDate: storeId ? createdDate : dateString,
      updatedBy: "SYSTEM",
      updatedDate: dateString,
      storeGstNumber: storeGstNumber,
    };
    await dispatch(saveStore(newStore));
  };

  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setRight(open);
  };

  const handleNewRuleSave = async () => {
    const newdelivery = {
      restaurantId: resturantId,
      storeId: storeId,
      criteria: "AMOUNT",
      minDistanceKms: 0,
      maxDistanceKms: 0,
      minAmount: currentminAmount,
      maxAmount: currentmaxAmount,
      deliveryTimeMins: 0,
      deliveryFeeCurrency: "INR",
      deliveryFee: currentdeliveryfee,
      ruleStatus: "ACTIVE",
      effectiveStartDate: "2022-04-21T16:00:00.000+00:00",
      effectiveEndDate: "9999-12-30T16:00:00.000+00:00",
      defaultCriteriaFlag: "Y",
    };
    await dispatch(SaveDeliveryPrice(newdelivery));
    setNewrule(false);
    setCurrentminAmount(0);
    setCurrentmaxAmount(0);
    setCurrentdeliveryfee(0);
    dispatch(GetDeliveryPrice(resturantId, storeId));
    toast.success("Delivery Chargers Added Successfully!");
  };

  const handledeliveryDelete = async (delivery) => {
    const newdelivery = { ...delivery, ruleStatus: "INACTIVE" };
    await dispatch(SaveDeliveryPrice(newdelivery));
    dispatch(GetDeliveryPrice(resturantId, storeId));
    toast.success("Delivery Chargers Deleted Successfully!");
  };

  const handledeliveryUpdate = async (delivery) => {
    const newdelivery = {
      ...delivery,
      minAmount: currentminAmount,
      maxAmount: currentmaxAmount,
      deliveryFee: currentdeliveryfee,
    };
    setdeliveryEdit(0);
    await dispatch(SaveDeliveryPrice(newdelivery));
    dispatch(GetDeliveryPrice(resturantId, storeId));
    toast.success("Delivery Chargers Updated Successfully!");
  };

  return (
    <Layout sidebar headerTitle="Store Master" classes={{}}>
      <div>
        <Container style={{ backgroundColor: "lightgray" }}>
          <Row style={{ minHeight: "90vh" }}>
            <Col sm={4}>
              <div className="store-leftpanel">
                <label className="store-leftpanel-label">
                  STORE INFORMATION
                </label>
                <div
                  style={{
                    height: "70vh",
                    overflowY: "scroll",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#888 #f1f1f1",
                  }}
                >
                  {stores?.map((store) => (
                    <div
                      className={
                        store.storeId == storeId
                          ? "store-leftpanel-btn-selected"
                          : "store-leftpanel-btn"
                      }
                      onClick={() => {
                        handleStoreClick(store);
                      }}
                    >
                      <StarIcon className="store-leftpanel-btn-icon1" />
                      {store.resturantName}
                      <ArrowForwardIosIcon className="store-leftpanel-btn-icon2" />
                    </div>
                  ))}
                </div>
                <button
                  className="mui-btn mui-btn--red mt-2 mb-4"
                  onClick={() => {
                    addStore();
                  }}
                >
                  Add New Store
                </button>
              </div>
            </Col>
            <Col style={{ backgroundColor: "#4d4d4d", color: "white" }} sm={8}>
              <div className="store-rightpanel">
                <Row style={{ justifyContent: "center" }}>
                  <TextField
                    label="Store Name *"
                    variant="standard"
                    InputLabelProps={{
                      shrink: storeName !== "",
                      classes: {
                        root: classes.inputLabel,
                        shrink: classes.inputLabelShrink,
                      },
                    }}
                    InputProps={{
                      style: inputStyle,
                      sx: {
                        ...rootStyle,
                        ...underlineStyle,
                      },
                    }}
                    value={storeName}
                    onChange={(e) => {
                      setStoreName(e.target.value);
                    }}
                    className="mt-3"
                  />
                </Row>
                <Row>
                  <Col md={6} className="text-center">
                    <TextField
                      label="Address 1 *"
                      variant="standard"
                      InputLabelProps={{
                        shrink: address1 !== "",
                        classes: {
                          root: classes.inputLabel,
                          shrink: classes.inputLabelShrink,
                        },
                      }}
                      InputProps={{
                        style: inputStyle,
                        sx: {
                          ...rootStyle,
                          ...underlineStyle,
                        },
                      }}
                      value={address1}
                      onChange={(e) => {
                        setAddress1(e.target.value);
                      }}
                      className="mt-3"
                    />
                    <TextField
                      label="Landmark "
                      variant="standard"
                      InputLabelProps={{
                        shrink: landmark !== "",
                        classes: {
                          root: classes.inputLabel,
                          shrink: classes.inputLabelShrink,
                        },
                      }}
                      InputProps={{
                        style: inputStyle,
                        sx: {
                          ...rootStyle,
                          ...underlineStyle,
                        },
                      }}
                      value={landmark}
                      onChange={(e) => {
                        setLandmark(e.target.value);
                      }}
                      className="mt-2"
                    />
                    <TextField
                      label="State *"
                      variant="standard"
                      InputLabelProps={{
                        shrink: state !== "",
                        classes: {
                          root: classes.inputLabel,
                          shrink: classes.inputLabelShrink,
                        },
                      }}
                      InputProps={{
                        style: inputStyle,
                        sx: {
                          ...rootStyle,
                          ...underlineStyle,
                        },
                      }}
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                      className="mt-2"
                    />
                    <TextField
                      label="Country *"
                      variant="standard"
                      InputLabelProps={{
                        shrink: country !== "",
                        classes: {
                          root: classes.inputLabel,
                          shrink: classes.inputLabelShrink,
                        },
                      }}
                      InputProps={{
                        style: inputStyle,
                        sx: {
                          ...rootStyle,
                          ...underlineStyle,
                        },
                      }}
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      className="mt-2"
                    />
                  </Col>
                  <Col md={6} className="text-center">
                    {/* <Row> */}
                    <TextField
                      label="Address 2 "
                      variant="standard"
                      InputLabelProps={{
                        shrink: address2 !== "",
                        classes: {
                          root: classes.inputLabel,
                          shrink: classes.inputLabelShrink,
                        },
                      }}
                      InputProps={{
                        style: inputStyle,
                        sx: {
                          ...rootStyle,
                          ...underlineStyle,
                        },
                      }}
                      value={address2}
                      onChange={(e) => {
                        setAddress2(e.target.value);
                      }}
                      className="mt-3"
                    />
                    <TextField
                      label="City *"
                      variant="standard"
                      InputLabelProps={{
                        shrink: city !== "",
                        classes: {
                          root: classes.inputLabel,
                          shrink: classes.inputLabelShrink,
                        },
                      }}
                      InputProps={{
                        style: inputStyle,
                        sx: {
                          ...rootStyle,
                          ...underlineStyle,
                        },
                      }}
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      className="mt-2"
                    />
                    <TextField
                      label="Zip Code *"
                      variant="standard"
                      InputLabelProps={{
                        shrink: zipcode !== null,
                        classes: {
                          root: classes.inputLabel,
                          shrink: classes.inputLabelShrink,
                        },
                      }}
                      InputProps={{
                        style: inputStyle,
                        sx: {
                          ...rootStyle,
                          ...underlineStyle,
                        },
                      }}
                      value={zipcode}
                      onChange={(e) => {
                        setZipcode(e.target.value);
                      }}
                      className="mt-2"
                    />
                    <TextField
                      label="GST NO#"
                      variant="standard"
                      InputLabelProps={{
                        shrink: gstno !== "",
                        classes: {
                          root: classes.inputLabel,
                          shrink: classes.inputLabelShrink,
                        },
                      }}
                      InputProps={{
                        style: inputStyle,
                        sx: {
                          ...rootStyle,
                          ...underlineStyle,
                        },
                      }}
                      value={gstno}
                      onChange={(e) => {
                        setGstno(e.target.value);
                      }}
                      className="mt-2"
                    />
                    {/* </Row> */}
                  </Col>
                </Row>
                <Row
                  style={{
                    margin: "25px 20px 10px 20px",
                    padding: "0 0 10px 0",
                    backgroundColor: "white",
                  }}
                >
                  <Col md={6}>
                    <TextField
                      label="Store Start Time "
                      variant="standard"
                      // InputLabelProps={{
                      //   shrink: starttime !== "",
                      //   style: {
                      //     fontSize: 12,
                      //   },
                      // }}
                      // InputProps={{
                      //   sx: {
                      //     ...rootStyle,
                      //     ...underlineStyle2,
                      //   },
                      // }}
                      InputLabelProps={{
                        style: {
                          fontSize: 12,
                        },
                      }}
                      InputProps={{
                        sx: {
                          ...rootStyle,
                          ...underlineStyle2,
                        },
                      }}
                      value={starttime}
                      onChange={(e) => {
                        setStarttime(e.target.value);
                      }}
                      className="mt-2"
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      label="Store End Time"
                      variant="standard"
                      InputLabelProps={{
                        style: {
                          fontSize: 12,
                        },
                      }}
                      InputProps={{
                        sx: {
                          ...rootStyle,
                          ...underlineStyle2,
                        },
                      }}
                      value={endtime}
                      onChange={(e) => {
                        setEndtime(e.target.value);
                      }}
                      className="mt-2"
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    margin: "25px 20px 10px 20px",
                    padding: "0 0 10px 0",
                    backgroundColor: "white",
                  }}
                >
                  <Col xs={2}>
                    <TextField
                      label="WARA Merchant Id"
                      variant="standard"
                      InputLabelProps={{
                        style: {
                          fontSize: 12,
                        },
                      }}
                      InputProps={{
                        sx: {
                          // ...rootStyle,
                          ...underlineStyle2,
                        },
                      }}
                      value={weraMerchantId}
                      onChange={(e) => {
                        setWeraMerchantId(e.target.value);
                      }}
                      className="mt-2"
                    />
                  </Col>
                  <Col xs={5}>
                    <TextField
                      label="WARA API Key"
                      variant="standard"
                      InputLabelProps={{
                        style: {
                          fontSize: 12,
                        },
                      }}
                      InputProps={{
                        sx: {
                          // ...rootStyle,
                          ...underlineStyle2,
                        },
                      }}
                      value={weraAPIKey}
                      onChange={(e) => {
                        setweraAPIKey(e.target.value);
                      }}
                      className="mt-2"
                    />
                  </Col>
                  <Col xs={5}>
                    <TextField
                      label="WARA API Value"
                      variant="standard"
                      InputLabelProps={{
                        style: {
                          fontSize: 12,
                        },
                      }}
                      InputProps={{
                        sx: {
                          // ...rootStyle,
                          ...underlineStyle2,
                        },
                      }}
                      value={weraAPIValue}
                      onChange={(e) => {
                        setweraAPIValue(e.target.value);
                      }}
                      className="mt-2"
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    margin: "25px 20px 10px 20px",
                    padding: "0 0 10px 0",
                  }}
                >
                  <Col xs={7}>
                    <div className="mb-3">
                      <DeliveryDiningIcon
                        fontSize="large"
                        style={{ color: "#e3f522" }}
                      />
                      <span
                        className="ml-3"
                        style={{ fontSize: "12px", cursor: "pointer" }}
                        onClick={toggleDrawer(true)}
                      >
                        Delivery Chargers Set-up
                      </span>
                      <Drawer
                        anchor={"right"}
                        open={right}
                        // onClose={toggleDrawer(false)}
                        sx={{ width: "400px" }}
                      >
                        <Box
                          sx={{
                            width: 500,
                            height: "100%",
                          }}
                          role="presentation"
                          // onClick={toggleDrawer(false)}
                          // onKeyDown={toggleDrawer(false)}
                          style={{ backgroundColor: "#e6e6e6" }}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              backgroundColor: "#a19f9f",
                              padding: "13px",
                              fontWeight: "bold",
                            }}
                          >
                            Delivery Chargers Set-up{" "}
                            <HighlightOffIcon
                              onClick={toggleDrawer(false)}
                              fontSize="large"
                              style={{
                                position: "absolute",
                                right: "2px",
                                top: "6px",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                          <div>
                            <FormControl
                              style={{
                                display: "flex",
                                margin: "auto",
                                marginTop: "10px",
                                marginBottom: "10px",
                                width: "75%",
                              }}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Delivery Criteria
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Delivery Criteria"
                                defaultValue={1}
                                // onChange={handleChange}
                              >
                                <MenuItem value={1}>Amount</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 500 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell width="10%">No</TableCell>
                                  <TableCell align="center" width="20%">
                                    Min Amt.
                                  </TableCell>
                                  <TableCell align="center" width="20%">
                                    Max Amt.
                                  </TableCell>
                                  <TableCell align="center" width="20%">
                                    Charges
                                  </TableCell>
                                  <TableCell align="center" width="30%">
                                    Actions
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {deliveryCharges &&
                                deliveryCharges.filter(
                                  (delivery) => delivery.ruleStatus === "ACTIVE"
                                )?.length > 0 ? (
                                  deliveryCharges
                                    .filter(
                                      (delivery) =>
                                        delivery.ruleStatus === "ACTIVE"
                                    )
                                    .map((delivery, id) => (
                                      <TableRow
                                        key={id}
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell
                                          component="th"
                                          scope="row"
                                          width="5%"
                                        >
                                          {id + 1}
                                        </TableCell>
                                        <TableCell align="center" width="15%">
                                          <CusTextField
                                            defaultValue={delivery.minAmount}
                                            value={
                                              currentminAmount[
                                                delivery.minAmount
                                              ]
                                            }
                                            // onChange={(e) => {
                                            //   setCurrentminAmount(
                                            //     e.target.value
                                            //   );
                                            // }}
                                            onChange={(e) => {
                                              const value = parseFloat(
                                                e.target.value
                                              );
                                              setCurrentminAmount(value);
                                            }}
                                            fullWidth
                                            variant="standard"
                                            disabled={
                                              delivery.delivery_rule_Id !=
                                              deliveryEdit
                                            }
                                            InputProps={{
                                              disableUnderline: true,
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell align="center" width="15%">
                                          <CusTextField
                                            defaultValue={delivery.maxAmount}
                                            value={
                                              currentmaxAmount[
                                                delivery.maxAmount
                                              ]
                                            }
                                            // onChange={(e) => {
                                            //   setCurrentmaxAmount(
                                            //     e.target.value
                                            //   );
                                            // }}
                                            onChange={(e) => {
                                              const value = parseFloat(
                                                e.target.value
                                              );
                                              setCurrentmaxAmount(value);
                                            }}
                                            fullWidth
                                            variant="standard"
                                            disabled={
                                              delivery.delivery_rule_Id !=
                                              deliveryEdit
                                            }
                                            InputProps={{
                                              disableUnderline: true,
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell align="center" width="15%">
                                          <CusTextField
                                            defaultValue={delivery.deliveryFee}
                                            value={
                                              currentdeliveryfee[
                                                delivery.deliveryFee
                                              ]
                                            }
                                            // onChange={(e) => {
                                            //   setCurrentdeliveryfee(
                                            //     e.target.value
                                            //   );
                                            // }}
                                            onChange={(e) => {
                                              const value = parseFloat(
                                                e.target.value
                                              );
                                              setCurrentdeliveryfee(value);
                                            }}
                                            fullWidth
                                            variant="standard"
                                            disabled={
                                              delivery.delivery_rule_Id !=
                                              deliveryEdit
                                            }
                                            InputProps={{
                                              disableUnderline: true,
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell align="center" width="50%">
                                          {delivery.delivery_rule_Id !=
                                          deliveryEdit ? (
                                            <IconButton aria-label="edit">
                                              <EditIcon
                                                style={{
                                                  fontSize: "17px",
                                                  color: "#bdba02",
                                                }}
                                                onClick={() =>
                                                  setdeliveryEdit(
                                                    delivery.delivery_rule_Id
                                                  )
                                                }
                                              />
                                            </IconButton>
                                          ) : (
                                            <IconButton aria-label="save">
                                              <SaveIcon
                                                style={{
                                                  fontSize: "17px",
                                                  color: "green",
                                                }}
                                                onClick={() =>
                                                  handledeliveryUpdate(delivery)
                                                }
                                              />
                                            </IconButton>
                                          )}
                                          <IconButton aria-label="delete">
                                            <DeleteIcon
                                              style={{
                                                fontSize: "17px",
                                                color: "red",
                                              }}
                                              onClick={() =>
                                                handledeliveryDelete(delivery)
                                              }
                                            />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={5} align="center">
                                      No records found
                                    </TableCell>
                                  </TableRow>
                                )}
                                {newrule ? (
                                  <TableRow>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      width="5%"
                                    >
                                      {deliveryCharges.filter(
                                        (delivery) =>
                                          delivery.ruleStatus === "ACTIVE"
                                      )?.length + 1}
                                    </TableCell>
                                    <TableCell align="center" width="68px">
                                      <CusTextField
                                        value={currentminAmount}
                                        onChange={(e) => {
                                          setCurrentminAmount(e.target.value);
                                        }}
                                        fullWidth
                                        variant="standard"
                                      />
                                    </TableCell>
                                    <TableCell width="68px">
                                      <CusTextField
                                        value={currentmaxAmount}
                                        onChange={(e) => {
                                          setCurrentmaxAmount(e.target.value);
                                        }}
                                        fullWidth
                                        variant="standard"
                                      />
                                    </TableCell>
                                    <TableCell width="68px">
                                      <CusTextField
                                        value={currentdeliveryfee}
                                        onChange={(e) => {
                                          setCurrentdeliveryfee(e.target.value);
                                        }}
                                        fullWidth
                                        variant="standard"
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <IconButton
                                        aria-label="save"
                                        onClick={handleNewRuleSave}
                                      >
                                        <SaveIcon
                                          style={{
                                            fontSize: "17px",
                                            color: "green",
                                          }}
                                        />
                                      </IconButton>
                                      <IconButton
                                        aria-label="delete"
                                        onClick={() => setNewrule(!newrule)}
                                      >
                                        <DeleteIcon
                                          style={{
                                            fontSize: "17px",
                                            color: "red",
                                          }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ) : null}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <button
                            className="mui-btn mui-btn--red"
                            style={{ marginTop: "20px" }}
                            onClick={() => setNewrule(!newrule)}
                          >
                            Add New Rule
                          </button>
                        </Box>
                      </Drawer>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ marginRight: "76px" }}>KOT Flag</span>
                      <YellowSwitch
                        checked={storeKOTPrintFlag == "Y" ? true : false}
                        onChange={() => {
                          setStoreKOTPrintFlag(
                            storeKOTPrintFlag === "Y" ? "N" : "Y"
                          );
                        }}
                        name="toggleSwitch"
                        inputProps={{ "aria-label": "Toggle switch" }}
                        color="default"
                        className="ml-10"
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ marginRight: "20px" }}>
                        Store Active Flag
                      </span>
                      <YellowSwitch
                        checked={storeActiveFlag == "Y" ? true : false}
                        onChange={() => {
                          setStoreActiveFlag(
                            storeActiveFlag === "Y" ? "N" : "Y"
                          );
                        }}
                        name="toggleSwitch"
                        inputProps={{ "aria-label": "Toggle switch" }}
                        color="default"
                        className="ml-10"
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ marginRight: "55px" }}>Online Store</span>
                      <YellowSwitch
                        checked={onlineAvailableFlag == "Y" ? true : false}
                        onChange={() => {
                          setOnlineAvailableFlag(
                            onlineAvailableFlag === "Y" ? "N" : "Y"
                          );
                        }}
                        name="toggleSwitch"
                        inputProps={{ "aria-label": "Toggle switch" }}
                        color="default"
                        className="ml-10"
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ marginRight: "51px" }}>Store Dine-in</span>
                      <YellowSwitch
                        checked={dineinAvailableFlag == "Y" ? true : false}
                        onChange={() => {
                          setDineinAvailableFlag(
                            dineinAvailableFlag === "Y" ? "N" : "Y"
                          );
                        }}
                        name="toggleSwitch"
                        inputProps={{ "aria-label": "Toggle switch" }}
                        color="default"
                        className="ml-10"
                      />
                    </div>
                  </Col>
                  <Col xs={5}></Col>
                </Row>
                <Row className="button-row">
                  <div className="button-group">
                    <button
                      className={`mui-btn ${
                        !storeName || !city || !country
                          ? "mui-btn--disabled"
                          : "mui-btn--yellow"
                      }`}
                      onClick={saveNewStore}
                      disabled={!storeName || !city || !country}
                    >
                      SAVE
                    </button>
                    <button className="mui-btn mui-btn--red">
                      MENU SET-UP
                    </button>
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default StoreMaster;
