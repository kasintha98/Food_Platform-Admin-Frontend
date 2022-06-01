import React, { useState } from "react";
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

const DeleteButton = styled(Button)`
  background-color: #ff0000;
  width: 150px;
  color: #fff;
  border-radius: 10px;

  &:hover {
    background-color: #7cbf33;
    color: #fff;
  }
`;

export const DeleteRole = (props) => {
  const modules = useSelector((state) => state.user.modules);
  const roles = useSelector((state) => state.user.roles);
  const [checked, setChecked] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleObj, setSelectedRoleObj] = useState(null);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const shoAddNewRolePage = () => {
    props.setDecision("newRole");
    props.setShowActionPage(true);
  };

  return (
    <div>
      <Row className="align-items-center">
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
              {roles.map((role) => (
                <MenuItem
                  key={role.roleId}
                  value={role.roleId}
                  onClick={() => {
                    setSelectedRoleObj(role);
                  }}
                >
                  {role.roleCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
        <Col className="col-3 p-0">
          <Button variant="text" onClick={shoAddNewRolePage}>
            Add New Role
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col className="col-3">
          <Typography
            sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
          >
            Check Modules for Access
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
                      <Checkbox checked={checked} onChange={handleChange} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
      </Row>
      <div className="text-center mt-4">
        <DeleteButton>DELETE</DeleteButton>
      </div>
    </div>
  );
};
