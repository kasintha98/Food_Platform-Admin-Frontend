import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styled from "@emotion/styled";
import { getUsersByRole } from "../../actions";

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

const CusMenuItem = styled(MenuItem)``;

const employees = [
  { employeeId: 1, name: "kasintha" },
  { employeeId: 2, name: "kasintha 2 " },
  { employeeId: 3, name: "kasintha 3 " },
];

export const AssignRole = (props) => {
  const usersByRole = useSelector((state) => state.user.usersByRole);
  const modules = useSelector((state) => state.user.modules);
  const rolesWithModules = useSelector((state) => state.user.rolesWithModules);
  const stores = useSelector((state) => state.store.stores);

  const [checked, setChecked] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleObj, setSelectedRoleObj] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedEmployeeObj, setSelectedEmployeeObj] = useState(null);
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [checkedRoles, setCheckedRoles] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersByRole("ALL"));
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleChange = (event) => {
    setCheckedRoles({
      ...checkedRoles,
      [event.target.name]: event.target.checked,
    });
    console.log(checkedRoles);
  };

  const shoAddNewRolePage = () => {
    props.setDecision("newRole");
    props.setShowActionPage(true);
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
    console.log(store);
  };

  const handleRoleObj = (role) => {
    setSelectedRoleObj(role);
    let ob = {};
    if (role) {
      for (let i = 0; i < role.modules.length; i++) {
        Object.assign(ob, { [role.modules[i].moduleId]: true });
      }
    }
    setCheckedRoles(ob);
  };

  const addRoleToEmp = () => {
    console.log(checkedRoles);
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col className="col-3">
          <Typography
            sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
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
      </Row>
      <Row className="align-items-center mt-3">
        <Col className="col-3">
          <Typography
            sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
          >
            Select Employee
          </Typography>
        </Col>
        <Col className="col-6">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label2">Employee</InputLabel>
            <Select
              labelId="demo-simple-select-label2"
              id="demo-simple-select2"
              value={selectedEmployee}
              label="Employee"
              onChange={handleEmployeeChange}
            >
              {usersByRole.map((user) => (
                <MenuItem
                  key={user.userSeqNo}
                  value={user.userSeqNo}
                  onClick={() => {
                    setSelectedEmployeeObj(user);
                  }}
                >
                  {user.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
        <Col className="col-3 p-0">
          <Button variant="text">Add New Employee</Button>
        </Col>
      </Row>
      <Row className="align-items-center mt-3">
        <Col className="col-3">
          <Typography
            sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
          >
            Select Role
          </Typography>
        </Col>
        <Col className="col-6">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label2">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label2"
              id="demo-simple-select2"
              value={selectedRole}
              label="Role"
              onChange={handleRoleChange}
            >
              {rolesWithModules.map((role) => (
                <MenuItem
                  key={role.role.roleId}
                  value={role.role.roleId}
                  onClick={() => {
                    handleRoleObj(role);
                  }}
                >
                  {role.role.roleCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
        <Col className="col-3 p-0">
          {/* <Button variant="text" onClick={shoAddNewRolePage}>
            Add New Role
          </Button> */}
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col className="col-3">
          <Typography
            sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
          >
            Modules
          </Typography>
        </Col>
        <Col className="col-6">
          <TableContainer
            component={Paper}
            sx={{ width: 450 }}
            className="mt-4 "
          >
            <Table sx={{ width: 450 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#A6A6A6" }}>
                  <TableCell align="center">MODULES</TableCell>
                  <TableCell align="center">ACCESS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modules.map((row) => (
                  <TableRow key={row.moduleId}>
                    <TableCell align="center">{row.moduleName}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={checkedRoles[row.moduleId] ? true : false}
                        onChange={handleChange}
                        name={row.moduleId}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
      </Row>
      <div className="text-center mt-4">
        <SaveButton onClick={addRoleToEmp}>SAVE</SaveButton>
      </div>
    </div>
  );
};
