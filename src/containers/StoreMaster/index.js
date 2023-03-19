import React from "react";
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
import { getAllStores } from "../../actions";
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
import Button from "@mui/material/Button";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("01", 159, 6.0, 24, 4.0),
  createData("02", 237, 9.0, 37, 4.3),
  createData("03", 262, 16.0, 24, 6.0),
  createData("04", 305, 3.7, 67, 4.3),
  createData("05", 356, 16.0, 49, 3.9),
];

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

const StoreMaster = () => {
  const stores = useSelector((state) => state.store.stores);
  console.log("aaa str", stores);

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

  const dispatch = useDispatch();

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
                <div>
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
                  <button
                    className="mui-btn mui-btn--red mt-2 mb-4"
                    onClick={() => {
                      addStore();
                    }}
                  >
                    Add New Store
                  </button>
                </div>
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
                        shrink: zipcode !== "",
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
                        Deliver Chargers Set-up
                      </span>
                      <Drawer
                        anchor={"right"}
                        open={right}
                        onClose={toggleDrawer(false)}
                        sx={{ width: "400px" }}
                      >
                        <Box
                          sx={{
                            width: 450,
                            height: "100%",
                          }}
                          role="presentation"
                          onClick={toggleDrawer(false)}
                          onKeyDown={toggleDrawer(false)}
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
                            Deliver Chargers Set-up{" "}
                            <HighlightOffIcon
                              onClick={toggleDrawer(true)}
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
                                label="Age"
                                // onChange={handleChange}
                              >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 400 }}
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
                                {rows.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      width="10%"
                                    >
                                      {row.name}
                                    </TableCell>
                                    <TableCell align="center" width="20%">
                                      {row.calories}
                                    </TableCell>
                                    <TableCell align="center" width="20%">
                                      {row.fat}
                                    </TableCell>
                                    <TableCell align="center" width="20%">
                                      {row.carbs}
                                    </TableCell>
                                    <TableCell align="center" width="30%">
                                      {row.protein}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <button
                            className="mui-btn mui-btn--red"
                            style={{ marginTop: "20px" }}
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
