import React, { useEffect, useState } from "react";
import Layout from "../NewLayout";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Experimental_CssVarsProvider,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsersByRole } from "../../actions";
import styled from "@emotion/styled";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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

  &:disabled {
    background-color: #d3d3d3 !important;
  }
`;

export default function Employee(props) {
  const stores = useSelector((state) => state.store.stores);
  const usersByRole = useSelector((state) => state.user.usersByRole);
  const rolesWithModules = useSelector((state) => state.user.rolesWithModules);

  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedEmployeeObj, setSelectedEmployeeObj] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleObj, setSelectedRoleObj] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [pId, setPId] = useState("");
  const [aId, setAId] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [emergency, setEmergency] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersByRole("ALL"));
  }, []);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
    console.log(store);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleEmployeeChangeObj = (employee) => {
    setSelectedEmployeeObj(employee);
    if (employee) {
      setFirstName(employee.firstName);
      setMiddleName(employee.middleName);
      setLastName(employee.lastName);
      setLicenseNo(employee.drivingLicenseNumber);
      setPId(employee.panId);
      setAId(employee.adhaarId);
      setAddress1(employee.address1);
      setAddress2(employee.address2);
      setState(employee.state);
      setZip(employee.zipCode);
      setCountry(employee.country);
      setCity(employee.city);
      setEmail(employee.emailId);
      setEmergency(employee.emergencyNumber);
      setMobile(employee.mobileNumber);
      setDob(employee.dob);
      setStartDate(new Date(employee.effectiveStartDate));
      setEndDate(new Date(employee.effectiveEndDate));
    } else {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setLicenseNo("");
      setPId("");
      setAId("");
      setAddress1("");
      setAddress2("");
      setState("");
      setZip("");
      setCountry("");
      setCity("");
      setEmail("");
      setEmergency("");
      setMobile("");
      setDob(new Date());
      setStartDate(new Date());
      setEndDate(new Date());
    }
  };

  const handleChangeDob = (newValue) => {
    setDob(newValue);
  };

  const handleChangeStart = (newValue) => {
    setStartDate(newValue);
  };

  const handleChangeEnd = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <Layout sidebar headerTitle="Employee" bgColor="#F2F2F2">
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
                ADD | UPDATE | DELETE EMPLOYEE PARTICULARS
              </Typography>
            </div>
          </Row>
        </div>
        <Row>
          <Col sm={6}>
            <Row className="align-items-center">
              <Col className="col-4">
                <Typography
                  sx={{
                    color: "#7F7F7F",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Select Store
                </Typography>
              </Col>
              <Col className="col-6">
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
                          <span
                            style={{ fontSize: "0.70rem", color: "#767171" }}
                          >
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
            </Row>
          </Col>
          <Col sm={6}>
            <Row className="align-items-center">
              <Col className="col-3">
                <Typography
                  sx={{
                    color: "#7F7F7F",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Select Employee
                </Typography>
              </Col>
              <Col className="col-6">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label2">
                    Employee
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    value={selectedEmployee}
                    label="Employee"
                    onChange={handleEmployeeChange}
                  >
                    <MenuItem
                      value={"ADD NEW EMPLOYEE"}
                      onClick={() => {
                        handleEmployeeChangeObj(null);
                      }}
                    >
                      ++ ADD NEW EMPLOYEE
                    </MenuItem>
                    {usersByRole.map((user) => (
                      <MenuItem
                        key={user.userSeqNo}
                        value={user.userSeqNo}
                        onClick={() => {
                          handleEmployeeChangeObj(user);
                        }}
                      >
                        {user.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="align-items-center mt-3">
          <Col className="col-2">
            <Typography
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
            >
              Employee Details
            </Typography>
          </Col>
          <Col
            className="col-10"
            style={{
              backgroundColor: "#fff",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <Row>
              <Col sm={4}>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="Middle Name"
                  value={middleName}
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Date of Birth"
                    inputFormat="yyyy/MM/dd"
                    value={dob}
                    onChange={handleChangeDob}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <TextField
                  label="Aadhar Id"
                  value={aId}
                  onChange={(e) => {
                    setAId(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="Pan ID"
                  value={pId}
                  onChange={(e) => {
                    setPId(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="Driving License No"
                  value={licenseNo}
                  onChange={(e) => {
                    setLicenseNo(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="align-items-center mt-3">
          <Col className="col-2">
            <Typography
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
            >
              Address and Contact Details
            </Typography>
          </Col>
          <Col
            className="col-10"
            style={{
              backgroundColor: "#fff",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <Row>
              <Col sm={4}>
                <TextField
                  label="Address 1"
                  value={address1}
                  onChange={(e) => {
                    setAddress1(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="Address 2"
                  value={address2}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <TextField
                  label="State"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="Zip Code"
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="Country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <TextField
                  label="Phone No (Mobile)"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="Emergency Contact No"
                  value={emergency}
                  onChange={(e) => {
                    setEmergency(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
              <Col sm={4}>
                <TextField
                  label="E-Mail Id"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  fullWidth
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="align-items-center mt-3">
          <Col className="col-2">
            <Typography
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
            >
              Duration and Role
            </Typography>
          </Col>
          <Col
            className="col-10"
            style={{
              backgroundColor: "#fff",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <Row>
              <Col sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Start Date"
                    inputFormat="yyyy/MM/dd"
                    value={startDate}
                    onChange={handleChangeStart}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Col>
              <Col sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="End Date"
                    inputFormat="yyyy/MM/dd"
                    value={endDate}
                    onChange={handleChangeEnd}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Col>
              <Col sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label2">
                    Select Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    value={selectedRole}
                    label="Select Role"
                    onChange={handleRoleChange}
                  >
                    {rolesWithModules.map((role) => (
                      <MenuItem
                        key={role.role.roleId}
                        value={role.role.roleId}
                        onClick={() => {
                          setSelectedRoleObj(role.role);
                        }}
                      >
                        {role.role.roleCategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Row>
            <Col sm={4}>
              <SaveButton disabled={selectedEmployee !== "ADD NEW EMPLOYEE"}>
                ADD NEW <br></br> EMPLOYEE
              </SaveButton>
            </Col>
            <Col sm={4}>
              <SaveButton disabled={selectedEmployeeObj === null}>
                UPDATE <br></br> EMPLOYEE
              </SaveButton>
            </Col>
            <Col sm={4}>
              <SaveButton disabled={selectedEmployeeObj === null}>
                DELETE <br></br> EMPLOYEE
              </SaveButton>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
}
