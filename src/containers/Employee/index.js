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
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersByRole,
  getRoles,
  addUpdateEmployee,
  getEmployeesByRes,
} from "../../actions";
import styled from "@emotion/styled";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { toast } from "react-toastify";
import "./style.css";

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
  const employeesByRes = useSelector((state) => state.employees.employeesByRes);
  const rolesWithModules = useSelector((state) => state.user.rolesWithModules);
  const allRoles = useSelector((state) => state.user.roles);
  const user = useSelector((state) => state.auth.user);

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
  const [loginId, setLoginId] = useState("");
  const [dob, setDob] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersByRole("ALL",user.restaurantId, user.storeId));
    dispatch(getRoles(user.restaurantId));
  }, []);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    dispatch(
      getEmployeesByRes(store.restaurantId, store.storeId, "ACTIVE")
    ).then((res) => {
      if (res) {
        clearFields();
        setSelectedEmployee("");
        setSelectedEmployeeObj(null);
      }
    });
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
      setDob(new Date(employee.userDob));
      setStartDate(new Date(employee.effectiveStartDate));
      setEndDate(new Date(employee.effectiveEndDate));
      setSelectedRole(employee.roleCategory);
      setLoginId(employee.loginId);
    } else {
      clearFields();
    }
  };

  const clearFields = () => {
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
    setSelectedRole("");
    setLoginId("");
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

  const updateEmployee = (isDelete) => {
    if (!dob || !firstName || !selectedRole || !loginId) {
      toast.error("Please fill all the mandatory fields!");
      return;
    }

    const obj = {
      userSeqNo: selectedEmployeeObj.userSeqNo,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      loginId: loginId,
      loginPassword: selectedEmployeeObj.loginPassword,
      userDob: `${dob.getFullYear()}-${("0" + (dob.getMonth() + 1)).slice(
        -2
      )}-${("0" + dob.getDate()).slice(-2)}`,
      restaurantId: selectedStoreObj.restaurantId,
      storeId: selectedStoreObj.storeId,
      status: isDelete ? "INACTIVE" : selectedEmployeeObj.status,
      adhaarId: aId,
      panId: pId,
      state: state,
      drivingLicenseNumber: licenseNo,
      address1: address1,
      address2: address2,
      address3: selectedEmployeeObj.address3,
      city: city,
      country: country,
      zipCode: zip,
      mobileNumber: mobile,
      alternativeContactId: emergency,
      emailId: email,
      qualification: selectedEmployeeObj.qualification,
      photoFileLocation: selectedEmployeeObj.photoFileLocation,
      roleCategory: selectedRole,
      effectiveStartDate: `${startDate.getFullYear()}-${(
        "0" +
        (startDate.getMonth() + 1)
      ).slice(-2)}-${("0" + startDate.getDate()).slice(-2)}`,
      effectiveEndDate: `${endDate.getFullYear()}-${(
        "0" +
        (endDate.getMonth() + 1)
      ).slice(-2)}-${("0" + endDate.getDate()).slice(-2)}`,
    };

    dispatch(addUpdateEmployee(obj)).then((res) => {
      if (res) {
        clearFields();
        setSelectedEmployee("");
        setSelectedEmployeeObj(null);
        toast.success(
          isDelete
            ? "Employee deleted successfully!"
            : "Employee updated successfully!"
        );
      }
    });
  };

  const addEmployee = () => {
    if (!dob || !firstName || !selectedRole || !loginId) {
      toast.error("Please fill all the mandatory fields!");
      return;
    }

    const obj = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      loginId: loginId,
      loginPassword: "default",
      userDob: `${dob.getFullYear()}-${("0" + (dob.getMonth() + 1)).slice(
        -2
      )}-${("0" + dob.getDate()).slice(-2)}`,
      restaurantId: selectedStoreObj.restaurantId,
      storeId: selectedStoreObj.storeId,
      status: "ACTIVE",
      adhaarId: aId,
      panId: pId,
      state: state,
      drivingLicenseNumber: licenseNo,
      address1: address1,
      address2: address2,
      address3: "",
      city: city,
      country: country,
      zipCode: zip,
      mobileNumber: mobile,
      alternativeContactId: emergency,
      emailId: email,
      qualification: "",
      photoFileLocation: "",
      roleCategory: selectedRole,
      effectiveStartDate: `${startDate.getFullYear()}-${(
        "0" +
        (startDate.getMonth() + 1)
      ).slice(-2)}-${("0" + startDate.getDate()).slice(-2)}`,
      effectiveEndDate: `${endDate.getFullYear()}-${(
        "0" +
        (endDate.getMonth() + 1)
      ).slice(-2)}-${("0" + endDate.getDate()).slice(-2)}`,
    };

    console.log(obj);

    dispatch(addUpdateEmployee(obj)).then((res) => {
      if (res) {
        clearFields();
        setSelectedEmployee("");
        setSelectedEmployeeObj(null);
        toast.success("Employee added successfully!");
      }
    });
  };

  const checkSelectStore = () => {
    if (!selectedStore) {
      toast.error("Please select a store first!");
    }
  };

  return (
    <Layout sidebar headerTitle="Employee" bgColor="#F2F2F2" >
      <div>
        <div>
        <Row>
            <div
              className="w-100 text-center "
              style={{
                color: "#2E75B6",
                backgroundColor: "#F2F2F2",
              }}
            >
              <Typography className="topTxtStyle">
                Employee Details
              </Typography>
            </div>
          </Row>
          <Row>
            <div
              className="w-100 text-center mb-4"
              style={{
                color: "#408697",
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
              {/* <Col className="col-4">
                <Typography
                  sx={{
                    color: "#7F7F7F",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Select Store
                </Typography>
              </Col> */}
              <Col className="col-6" style={{marginLeft:'35%'}}>
                <FormControl fullWidth>
                  <InputLabel className="inputlabeltxt" id="demo-simple-select-label">
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
              {/* <Col className="col-3">
                <Typography
                  sx={{
                    color: "#7F7F7F",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Select Employee
                </Typography>
              </Col> */}
              <Col className="col-6" style={{marginLeft:'15%'}}>
                <FormControl fullWidth>
                  <InputLabel className="inputlabeltxt" id="demo-simple-select-label2">
                    Employee
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    value={selectedEmployee}
                    label="Employee"
                    onChange={handleEmployeeChange}
                    disabled={selectedStore ? false : true}
                    onClick={checkSelectStore}
                  >
                    <MenuItem
                      value={"ADD NEW EMPLOYEE"}
                      onClick={() => {
                        handleEmployeeChangeObj(null);
                      }}
                    >
                      ++ ADD NEW EMPLOYEE
                    </MenuItem>
                    {employeesByRes.map((user) => (
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
        <Typography className="textheader"
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "left",marginLeft:'14.5%',backgroundColor:'' }}
            >
              Personal Details:
            </Typography>
        </Row>
        <Row className="align-items-center mt-3" style={{marginLeft:'13.5%'}}>
          {/* <Col className="col-2">
            <Typography
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
            >
              Employee Details
            </Typography>
          </Col> */}
          <Col
            className="col-10"
            style={{
              backgroundColor: "#FFF",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <Row>
              <Col sm={4}>
                <TextField
                  size="small"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  fullWidth
                  required
                  InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                 size="small"
                  label="Middle Name"
                  value={middleName}
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                 size="small"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
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
                      <TextField size="small" {...params} fullWidth required
                     InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}} />
                    )}
                  />
                </LocalizationProvider>
              </Col>
              <Col sm={4}>
                <TextField
                 size="small"
                  label="Login ID"
                  value={loginId}
                  onChange={(e) => {
                    setLoginId(e.target.value);
                  }}
                  fullWidth
                  required
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <TextField
                 size="small"
                  label="Aadhar Id"
                  value={aId}
                  onChange={(e) => {
                    setAId(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                 size="small"
                  label="Pan ID"
                  value={pId}
                  onChange={(e) => {
                    setPId(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                 size="small"
                  label="Driving License No"
                  value={licenseNo}
                  onChange={(e) => {
                    setLicenseNo(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="align-items-center mt-3">
        <Typography className="textheader"
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "left",marginLeft:'14.5%',backgroundColor:'' }}
            >
            Contact Details:
            </Typography>
        </Row>
        <Row className="align-items-center mt-3" style={{marginLeft:'13.5%'}}>
          {/* <Col className="col-2">
            <Typography
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
            >
              Address and Contact Details
            </Typography>
          </Col> */}
          <Col
            className="col-10"
            style={{
              backgroundColor: "#FFF",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <Row>
              <Col sm={4}>
                <TextField
                size="small"
                  label="Address 1"
                  value={address1}
                  onChange={(e) => {
                    setAddress1(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                size="small"
                  label="Address 2"
                  value={address2}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                size="small"
                  label="City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <TextField
                size="small"
                  label="State"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                size="small"
                  label="Zip Code"
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                size="small"
                  label="Country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <TextField
                size="small"
                  label="Phone No (Mobile)"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                size="small"
                  label="Emergency Contact No"
                  value={emergency}
                  onChange={(e) => {
                    setEmergency(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
              <Col sm={4}>
                <TextField
                size="small"
                  label="E-Mail Id"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  fullWidth
                 InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="align-items-center mt-3">
        <Typography className="textheader"
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "left",marginLeft:'14.5%',backgroundColor:'' }}
            >
            Duration and Role:
            </Typography>
        </Row>
        <Row className="align-items-center mt-3" style={{marginLeft:'13.5%'}}>
          {/* <Col className="col-2">
            <Typography
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
            >
              Duration and Role
            </Typography>
          </Col> */}
          <Col
            className="col-10"
            style={{
              backgroundColor: "#FFF",
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
                      <TextField size="small" {...params} fullWidth 
                     InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}/>
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
                      <TextField size="small" {...params} fullWidth 
                     InputProps={{style: {fontSize: 14, fontFamily: 'Roboto, sans-serif'}}} 
                  InputLabelProps={{style: {fontSize: 12, fontFamily: 'Roboto Condensed, sans-serif'}}}/>
                    )}
                  />
                </LocalizationProvider>
              </Col>
              <Col sm={4}>
                <FormControl size="small" fullWidth>
                  <InputLabel className="inputlabeltxt" id="demo-simple-select-label2">
                    Select Role *
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    value={selectedRole}
                    label="Select Role *"
                    onChange={handleRoleChange}
                    required
                  >
                    {allRoles.map((role) => (
                      <MenuItem key={role.roleId} value={role.roleCategory}>
                        {role.roleCategory}
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
              <SaveButton
                disabled={selectedEmployee !== "ADD NEW EMPLOYEE"}
                onClick={addEmployee}
              >
                SAVE
              </SaveButton>
            </Col>
            <Col sm={4}>
              <SaveButton
                disabled={selectedEmployeeObj === null}
                onClick={() => {
                  updateEmployee(false);
                }}
              >
                UPDATE
              </SaveButton>
            </Col>
            <Col sm={4}>
              <SaveButton
                disabled={selectedEmployeeObj === null}
                onClick={() => {
                  updateEmployee(true);
                }}
              >
                DELETE
              </SaveButton>
            </Col>
          </Row>
        </div>
        {/* <div className="text-center mt-4">
          <Row>
            <Col sm={4}>
              <SaveButton
                disabled={selectedEmployee !== "ADD NEW EMPLOYEE"}
                onClick={addEmployee}
              >
                ADD NEW <br></br> EMPLOYEE
              </SaveButton>
            </Col>
            <Col sm={4}>
              <SaveButton
                disabled={selectedEmployeeObj === null}
                onClick={() => {
                  updateEmployee(false);
                }}
              >
                UPDATE <br></br> EMPLOYEE
              </SaveButton>
            </Col>
            <Col sm={4}>
              <SaveButton
                disabled={selectedEmployeeObj === null}
                onClick={() => {
                  updateEmployee(true);
                }}
              >
                DELETE <br></br> EMPLOYEE
              </SaveButton>
            </Col>
          </Row>
        </div> */}
      </div>
    </Layout>
  );
}
