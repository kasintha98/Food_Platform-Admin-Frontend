import React from "react";
import Layout from "../NewLayout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

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

const labelStyle = {
  fontSize: 12,
  color: "white", // Set the label color to white
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
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#fcb900",
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
    border: `1px solid ${theme.palette.grey[500]}`,
    backgroundColor: theme.palette.common.white,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
}))(Switch);

const StoreMaster = () => {
  const stores = useSelector((state) => state.store.stores);
  console.log("aaa stores", stores);

  const [storeName, setStoreName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [gstno, setGstno] = useState("");
  const [starttime, setStarttime] = useState("");

  const handleStoreClick = (store) => {
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
  };

  const classes = useStyles();

  return (
    <Layout sidebar headerTitle="Employee" bgColor="#F2F2F2">
      <Container style={{ backgroundColor: "lightgray" }}>
        <Row style={{ minHeight: "90vh" }}>
          <Col sm={4}>
            <div className="store-leftpanel">
              <label className="store-leftpanel-label">STORE INFORMATION</label>
              <div>
                {stores.map((store) => (
                  <div
                    className="store-leftpanel-btn"
                    onClick={() => {
                      handleStoreClick(store);
                    }}
                  >
                    <StarIcon className="store-leftpanel-btn-icon1" />
                    {store.resturantName}{" "}
                    <ArrowForwardIosIcon className="store-leftpanel-btn-icon2" />
                  </div>
                ))}
                <button className="mui-btn mui-btn--red mt-2 mb-4">Add New Store</button>
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
                    // value={keywords}
                    // onChange={handleChangeKeywords}
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
                    // value={keywords}
                    // onChange={handleChangeKeywords}
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
                    // value={keywords}
                    // onChange={handleChangeKeywords}
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
                    // value={keywords}
                    // onChange={handleChangeKeywords}
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
                    // value={keywords}
                    // onChange={handleChangeKeywords}
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
                    <DeliveryDiningIcon fontSize="large" />
                    <span className="ml-3" style={{ fontSize: "12px" }}>
                      Deliver Chargers Set-up
                    </span>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <span style={{ marginRight: "76px" }}>KOT Flag</span>
                    <YellowSwitch
                      // checked={checked}
                      // onChange={handleChange}
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
                      // checked={checked}
                      // onChange={handleChange}
                      name="toggleSwitch"
                      inputProps={{ "aria-label": "Toggle switch" }}
                      color="default"
                      className="ml-10"
                    />
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <span style={{ marginRight: "55px" }}>Online Store</span>
                    <YellowSwitch
                      // checked={checked}
                      // onChange={handleChange}
                      name="toggleSwitch"
                      inputProps={{ "aria-label": "Toggle switch" }}
                      color="default"
                      className="ml-10"
                    />
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <span style={{ marginRight: "51px" }}>Store Dine-in</span>
                    <YellowSwitch
                      // checked={checked}
                      // onChange={handleChange}
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
                  <button className="mui-btn mui-btn--yellow">SAVE</button>
                  <button className="mui-btn mui-btn--red">MENU SET-UP</button>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default StoreMaster;
