import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../NewLayout";
import { Row, Col } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Alert,
  TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { getConfigDetails, addConfigDetails } from "../../actions";
import { toast } from "react-toastify";

const CusMenuItem = styled(MenuItem)``;

const SaveButton = styled(Button)`
  background-color: #92d050;
  width: 150px;
  color: #fff;
  border-radius: 10px;

  &:hover {
    background-color: #7cbf33;
    color: #fff;
  }
`;

export const OrderAutomation = () => {
  const stores = useSelector((state) => state.store.stores);
  const configDetails = useSelector((state) => state.user.configDetails);
  const [selectedStore, setSelectedStore] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceDescription, setSourceDescription] = useState("");
  const [isAutomate, setIsAutomate] = useState("Y");
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId: null,
    storeId: null,
  });
  const [checkedRoles, setCheckedRoles] = useState({});
  const [prevCheckedRoles, setPrevCheckedRoles] = useState({});
  const [showAdd, setShowAdd] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setCheckedRoles({
      ...checkedRoles,
      [event.target.name]: event.target.checked,
    });
    console.log(checkedRoles);
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    dispatch(
      getConfigDetails(store.restaurantId, store.storeId, "ORDER_SOURCE")
    ).then((data) => {
      let ob = {};
      console.log(data);
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].configValue === "Y") {
            Object.assign(ob, { [data[i].configCriteriaValue]: true });
          }
        }
      }
      //setPrevCheckedRoles(ob);
      setCheckedRoles(ob);
    });
    setSelectedStoreObj(store);
  };

  const addSource = () => {
    if (!selectedStore || !sourceDescription || !sourceName) {
      toast.error("Please fill all the fields!");
      return;
    }
    const obj = {
      restaurantId: selectedStoreObj.restaurantId,
      storeId: selectedStoreObj.storeId,
      configCriteria: "ORDER_SOURCE",
      configCriteriaValue: sourceName,
      configCriteriaDesc: sourceDescription,
      configParameter: "ORDER_AUTO_APPROVE_FLAG",
      configValue: isAutomate,
    };

    dispatch(addConfigDetails(obj)).then((res) => {
      if (res) {
        handleSelectedStore(selectedStoreObj);
        setSourceDescription("");
        setSourceName("");
        setIsAutomate("Y");
      }
    });
  };

  return (
    <Layout sidebar headerTitle="Order Automation">
      <Row className="align-items-center">
        <Col className="col-3">
          <Typography
            sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
          >
            Select Store
          </Typography>
        </Col>
        <Col sm={6} style={{ display: "flex" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Please select the store
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedStore}
              label="Please select the store"
              onChange={handleChangeStore}
            >
              {/* <CusMenuItem
                onClick={() => {
                  handleSelectedStore({
                    restaurantId: null,
                    storeId: null,
                  });
                }}
                value={"ALL"}
              >
                All Stores
              </CusMenuItem> */}
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
            </Select>
          </FormControl>
        </Col>
      </Row>
      {showAdd ? (
        <div>
          <Row className="align-items-center mt-3">
            <Col className="col-3">
              <Typography
                sx={{
                  color: "#7F7F7F",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Order Source Name
              </Typography>
            </Col>
            <Col sm={6} style={{ display: "flex" }}>
              <TextField
                label="Order Source Name"
                variant="standard"
                value={sourceName}
                onChange={(event) => {
                  setSourceName(event.target.value);
                }}
                fullWidth
              />
            </Col>
            <Col sm={3}>
              <Button
                onClick={() => {
                  setShowAdd(false);
                }}
              >
                BACK
              </Button>
            </Col>
          </Row>
          <Row className="align-items-center mt-3">
            <Col className="col-3">
              <Typography
                sx={{
                  color: "#7F7F7F",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Order Source Description
              </Typography>
            </Col>
            <Col sm={6} style={{ display: "flex" }}>
              <TextField
                label="Order Source Name"
                variant="standard"
                value={sourceDescription}
                onChange={(event) => {
                  setSourceDescription(event.target.value);
                }}
                fullWidth
              />
            </Col>
            <Col sm={3}></Col>
          </Row>
          <Row className="align-items-center mt-3">
            <Col className="col-3">
              <Typography
                sx={{
                  color: "#7F7F7F",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Is Automate?
              </Typography>
            </Col>
            <Col sm={6} style={{ display: "flex" }}>
              <FormControl fullWidth>
                <InputLabel id="isAutomate">Is Automate?</InputLabel>
                <Select
                  labelId="isAutomate"
                  value={isAutomate}
                  label="Is Automate?"
                  onChange={(event) => {
                    setIsAutomate(event.target.value);
                  }}
                >
                  <MenuItem value="Y">Yes</MenuItem>
                  <MenuItem value="N">No</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col sm={3}></Col>
          </Row>
          <div className="text-center mt-4">
            <SaveButton onClick={addSource}>Add</SaveButton>
          </div>
        </div>
      ) : (
        <div>
          <Row className="align-items-center mt-3">
            <Col className="col-3">
              <Typography
                sx={{
                  color: "#7F7F7F",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Check Order Source for automation
              </Typography>
            </Col>
            <Col sm={6} style={{ display: "flex" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#A5A5A5" }}>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        ORDER SOURCE
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        AUTOMATE flag
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {configDetails && configDetails.length > 0 ? (
                    <TableBody>
                      {configDetails.map((item) => (
                        <TableRow>
                          <TableCell align="center">
                            {item.configCriteriaDesc}
                          </TableCell>
                          <TableCell align="center">
                            <Checkbox
                              checked={
                                // prevCheckedRoles[item.configCriteriaValue] ||
                                checkedRoles[item.configCriteriaValue]
                                  ? true
                                  : false
                              }
                              onChange={handleChange}
                              name={item.configCriteriaValue}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={2}>
                          <Alert severity="warning" className="w-100">
                            No data to show / Select a store!
                          </Alert>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Col>
            <Col sm={3}>
              <Button
                onClick={() => {
                  setShowAdd(true);
                }}
              >
                ADD NEW ORDER SOURCE
              </Button>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <SaveButton>Save</SaveButton>
          </div>
        </div>
      )}
    </Layout>
  );
};
