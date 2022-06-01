import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addDays } from "date-fns";
import Layout from "../NewLayout";
import MenuItem from "@mui/material/MenuItem";
import { Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { DateRangePicker, DefinedRange } from "react-date-range";
import { TopSellingDishTable } from "../../components/TopSellingDishTable";
import { TopPayingCustomerTable } from "../../components/TopPayingCustomerTable";
import { SalesOverTimeChart } from "../../components/SalesOverTimeChart";
import { SalesRevenueByChanelChart } from "../../components/SalesRevenueByChanelChart";
import { RevenueByPaymentMode } from "../../components/RevenueByPaymentMode";

const CusMenuItem = styled(MenuItem)``;

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
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [checked, setChecked] = React.useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

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
              <Dropdown.Toggle variant="secondary">Presets</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <DefinedRange
                    onChange={(item) => setState([item.selection])}
                    ranges={state}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <DropdownButton title="Custom" className="ml-2" variant="secondary">
              <Dropdown.Item>
                <CusDateRangePicker
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </Dropdown.Item>
            </DropdownButton>
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
        <div className="mt-2">
          <Row>
            <Col sm={2} className="pl-0">
              <NumberDiv>
                <Typography sx={{ color: "#595959" }}>Total Sales</Typography>
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
                <Typography sx={{ fontWeight: "bold" }}>Rs 500.65</Typography>
              </NumberDiv>
            </Col>
            <Col sm={2} className="pl-0">
              <NumberDiv>
                <Typography sx={{ color: "#595959" }}>Total Orders</Typography>
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
      </Layout>
    </div>
  );
};
