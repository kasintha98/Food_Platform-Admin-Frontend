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

export const NewReports = () => {
  const allReports = useSelector((state) => state.report.allReports);
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
    dispatch(
      getAllReports(
        "R001",
        "S001",
        `${dateState[0].startDate.getFullYear()}-${
          dateState[0].startDate.getMonth() + 1
        }-${dateState[0].startDate.getDate()}`,
        `${dateState[0].endDate.getFullYear()}-${
          dateState[0].endDate.getMonth() + 1
        }-${dateState[0].endDate.getDate()}`
      )
    );
  }, [dateState]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Layout sidebar>
      <div>
        <div>
          <Row>
            <div
              className="w-100 text-center p-3 mb-3"
              style={{
                color: "#2E75B6",
                backgroundColor: "#F2F2F2",
              }}
            >
              <Typography sx={{ fontWeight: "bold !important" }}>
                REPORTS
              </Typography>
            </div>
          </Row>
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
                Custom{" "}
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
          <Row>
            <Col sm={3}>
              <Typography sx={{ fontWeight: "bold", color: "#595959" }}>
                Role
              </Typography>
            </Col>
            <Col sm={3}>
              <Typography sx={{ fontWeight: "bold", color: "#595959" }}>
                : XXXXX
              </Typography>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Typography sx={{ fontWeight: "bold", color: "#595959" }}>
                Store Name
              </Typography>
            </Col>
            <Col sm={3}>
              <Typography sx={{ fontWeight: "bold", color: "#595959" }}>
                : Hangries YamunaNagar
              </Typography>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col sm={3}>
              <NumberDiv className="mt-3">
                <Typography sx={{ color: "#595959" }}>Total Orders</Typography>
                {allReports.salesSummeryByDateList &&
                allReports.salesSummeryByDateList.length ? (
                  <Typography sx={{ fontWeight: "bold" }}>
                    {allReports.salesSummeryByDateList
                      .map((a) => a.noOfOrders)
                      .reduce((a, b) => a + b, 0)}
                  </Typography>
                ) : (
                  <Typography sx={{ fontWeight: "bold" }}>0</Typography>
                )}
              </NumberDiv>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col sm={6}>
              {allReports.salesSummeryByDishType &&
              allReports.salesSummeryByDishType.length > 0 ? (
                <TopSellingDishTable></TopSellingDishTable>
              ) : (
                <div className="mb-3 pl-3 pt-3">
                  <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                    Top Selling Dish
                  </Typography>
                  <Alert severity="warning" className="mt-4">
                    No reports to show!
                  </Alert>
                </div>
              )}
            </Col>
            <Col sm={6}>
              {allReports.salesSummeryByCustomer &&
              allReports.salesSummeryByCustomer.length > 0 ? (
                <TopPayingCustomerTable></TopPayingCustomerTable>
              ) : (
                <div className="mb-3 pl-3 pt-3">
                  <Typography sx={{ fontWeight: "bold", color: "#7F7F7F" }}>
                    Top Paying Customer
                  </Typography>
                  <Alert severity="warning" className="mt-4">
                    No reports to show!
                  </Alert>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};
