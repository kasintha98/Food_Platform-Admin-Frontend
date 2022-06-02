import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDays } from "date-fns";
import Layout from "../NewLayout";
import MenuItem from "@mui/material/MenuItem";
import { Row, Col, Dropdown } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import { Button, Menu } from "@mui/material";
import { Typography } from "@mui/material";
import { DateRangePicker, DefinedRange } from "react-date-range";
import { TopSellingDishTable } from "../../components/TopSellingDishTable";
import { TopPayingCustomerTable } from "../../components/TopPayingCustomerTable";
import { SalesOverTimeChart } from "../../components/SalesOverTimeChart";
import { SalesRevenueByChanelChart } from "../../components/SalesRevenueByChanelChart";
import { RevenueByPaymentMode } from "../../components/RevenueByPaymentMode";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getAllReports } from "../../actions";

const CusMenuItem = styled(MenuItem)``;

const CusDDT = styled(Dropdown.Toggle)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
`;

const DRButton = styled(Button)`
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  text-transform: none;

  &:hover {
    color: #fff;
    background-color: #5a6268;
    border-color: #5a6268;
  }
`;

const CusDateRangePicker = styled(DateRangePicker)`
  & .rdrDefinedRangesWrapper {
    display: none;
  }
`;

const NumberDiv = styled.div`
  background-color: #e7e6e6;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
`;

export const AdminDashboard = () => {
  const stores = useSelector((state) => state.store.stores);
  const allReports = useSelector((state) => state.report.allReports);
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [checked, setChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getAllReports(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId,
          "2021-05-01",
          "2022-12-06"
        )
      );
    }
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
    console.log(store);
    dispatch(
      getAllReports(
        store.restaurantId,
        store.storeId,
        "2021-05-01",
        "2022-12-06"
      )
    );
  };

  return (
    <div>
      <Layout sidebar>
        <div>
          <Row>
            <Dropdown
              className="d-inline mx-2"
              autoClose="outside"
              variant="secondary"
            >
              <CusDDT variant="secondary">Presets</CusDDT>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <DefinedRange
                    onChange={(item) => setDateState([item.selection])}
                    ranges={dateState}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div>
              <DRButton
                className="btn btn-secondary"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Dashboard{" "}
                <ArrowDropDownIcon
                  sx={{ width: "20px", height: "20px" }}
                ></ArrowDropDownIcon>
              </DRButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem>
                  <CusDateRangePicker
                    editableDateInputs={true}
                    onChange={(item) => setDateState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateState}
                  />
                </MenuItem>
              </Menu>
            </div>
          </Row>
        </div>

        <div className="mt-3">
          <Row className="align-items-center">
            <Col sm={3} className="m-0 p-0">
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
                  {stores.map((store) => (
                    <CusMenuItem
                      onClick={() => {
                        handleSelectedStore(store);
                      }}
                      value={store.resturantName}
                    >
                      <span>
                        {store.resturantName}
                        <br></br>
                        <span style={{ fontSize: "0.70rem", color: "#767171" }}>
                          {store.address1}
                        </span>
                        {store.address2 ? (
                          <>
                            ,{" "}
                            <span
                              style={{
                                fontSize: "0.70rem",
                                color: "#767171",
                              }}
                            >
                              {store.address2}
                            </span>
                          </>
                        ) : null}
                        {store.address3 ? (
                          <>
                            ,{" "}
                            <span
                              style={{
                                fontSize: "0.70rem",
                                color: "#767171",
                              }}
                            >
                              {store.address3}
                            </span>
                          </>
                        ) : null}
                      </span>
                    </CusMenuItem>
                  ))}
                </Select>
              </FormControl>
            </Col>
            <Col sm={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Select All stores"
                />
              </FormGroup>
            </Col>
          </Row>
        </div>

        {allReports && selectedStoreObj ? (
          <>
            <div className="mt-2">
              <Row>
                <Col sm={2} className="pl-0">
                  <NumberDiv>
                    <Typography sx={{ color: "#595959" }}>
                      Total Sales
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Rs 109922.98
                    </Typography>
                  </NumberDiv>
                </Col>
                <Col sm={2} className="pl-0">
                  <NumberDiv>
                    <Typography sx={{ color: "#595959" }}>
                      Avg. Order Value
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Rs 500.65
                    </Typography>
                  </NumberDiv>
                </Col>
                <Col sm={2} className="pl-0">
                  <NumberDiv>
                    <Typography sx={{ color: "#595959" }}>
                      Total Orders
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>509</Typography>
                  </NumberDiv>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col sm={6} className="pl-0">
                  <SalesOverTimeChart></SalesOverTimeChart>
                </Col>
                <Col sm={6} className="pl-0">
                  <SalesRevenueByChanelChart></SalesRevenueByChanelChart>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="pl-0">
                  <TopSellingDishTable></TopSellingDishTable>
                </Col>
                <Col sm={6} className="pl-0">
                  <TopPayingCustomerTable></TopPayingCustomerTable>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="pl-0">
                  <RevenueByPaymentMode></RevenueByPaymentMode>
                </Col>
                <Col sm={6} className="pl-0"></Col>
              </Row>
            </div>
          </>
        ) : (
          <>
            <Alert severity="warning" className="mt-4">
              No reports to show! Please select a store!
            </Alert>
          </>
        )}
      </Layout>
    </div>
  );
};
