import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { DateRangePicker, DefinedRange } from "react-date-range";
import { addDays } from "date-fns";
import Layout from "../NewLayout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TopSellingDishTable } from "../../components/TopSellingDishTable";
import { TopPayingCustomerTable } from "../../components/TopPayingCustomerTable";
import { getAllReports } from "../../actions";
import DropdownMenu from "@atlaskit/dropdown-menu";
import "./style.css";
import { ReportTable } from "../../components/ReportTable";

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

const reportTypes = ["Order Report"];

export const NewReports = () => {
  const allReports = useSelector((state) => state.report.allReports);
  const stores = useSelector((state) => state.store.stores);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState("ALL");
  const [selectedReport, setSelectedReport] = useState("Order Report");
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId: null,
    storeId: null,
  });

  const dispatch = useDispatch();

  /* useEffect(() => {
    dispatch(
      getAllReports(
        "ALL",
        "ALL",
        `${dateState[0].startDate.getFullYear()}-${
          dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${
          dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`
      )
    );
  }, [dateState]); */

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const handleChangeReport = (event) => {
    setSelectedReport(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Layout sidebar headerTitle="Reports">
      <div>
        <div>
          <Row>
            <Col md={4}>
              <Row className="align-items-center">
                <div style={{ maxWidth: "125px !important" }}>
                  <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                    Select Date Range
                  </Typography>
                </div>
                <Col className="col-8 p-0">
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

                  <DropdownMenu
                    isOpen={isOpen}
                    onOpenChange={(attrs) => {
                      setIsOpen(attrs.isOpen);
                    }}
                    trigger="Custom"
                  >
                    <CusDateRangePicker
                      editableDateInputs={true}
                      onChange={(item) => setDateState([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dateState}
                    />
                  </DropdownMenu>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="align-items-center">
                <div style={{ maxWidth: "125px !important" }}>
                  <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                    Select Store
                  </Typography>
                </div>
                <Col className="col-8" style={{ display: "flex" }}>
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
                      <CusMenuItem
                        onClick={() => {
                          handleSelectedStore({
                            restaurantId: null,
                            storeId: null,
                          });
                        }}
                        value={"ALL"}
                      >
                        All Stores
                      </CusMenuItem>
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
            </Col>
            <Col md={4}>
              <Row className="align-items-center">
                <div style={{ maxWidth: "125px !important" }}>
                  <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
                    Select Report
                  </Typography>
                </div>
                <Col className="col-8" style={{ display: "flex" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Please select the report
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedReport}
                      label="Please select the store"
                      onChange={handleChangeReport}
                    >
                      {reportTypes.map((type) => (
                        <CusMenuItem value={type}>
                          <span>{type}</span>
                        </CusMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="mt-3">
          {selectedReport === "Order Report" && (
            <ReportTable
              startDate={dateState[0].startDate}
              endDate={dateState[0].endDate}
              storeId={selectedStoreObj.storeId}
              restaurantId={selectedStoreObj.restaurantId}
            ></ReportTable>
          )}
        </div>
      </div>
    </Layout>
  );
};
