import React, { useState, useEffect } from "react";
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
import {
  deleteRoleWithModuleAccess,
  getRoleWithModuleAccess,
} from "../../actions";
import { toast } from "react-toastify";

const DeleteButton = styled(Button)`
  background-color: #ff0000;
  width: 150px;
  color: #fff;
  border-radius: 10px;

  &:hover {
    background-color: #8b0000 !important;
    color: #fff;
  }
`;

export const DeleteRole = (props) => {
  const modules = useSelector((state) => state.user.modules);
  const user = useSelector((state) => state.auth.user);
  const rolesWithModules = useSelector((state) => state.user.rolesWithModules);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleObj, setSelectedRoleObj] = useState(null);
  const [checkedRoles, setCheckedRoles] = useState({});
  const [prevCheckedRoles, setPrevCheckedRoles] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoleWithModuleAccess(user.restaurantId, user.storeId, "ALL"));
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleRoleObj = (role) => {
    setSelectedRoleObj(role);
    let ob = {};
    if (role) {
      for (let i = 0; i < role.modules.length; i++) {
        Object.assign(ob, { [role.modules[i].moduleId]: true });
      }
    }
    setPrevCheckedRoles(ob);
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

  const deleteRole = () => {
    if (selectedRoleObj) {
      const obj = {
        restaurantId: selectedRoleObj.role.restaurantId,
        storeId: selectedRoleObj.role.storeId,
        roleCategory: selectedRoleObj.role.roleCategory,
        roleDescription: selectedRoleObj.role.roleDescription,
        roleStatus: selectedRoleObj.role.roleStatus,
        moduleIds: Object.keys(checkedRoles),
      };
      dispatch(deleteRoleWithModuleAccess(obj)).then((res) => {
        if (res) {
          dispatch(
            getRoleWithModuleAccess(user.restaurantId, user.storeId, "ALL")
          );
          setSelectedRole("");
          setSelectedRoleObj(null);
          setCheckedRoles({});
          setPrevCheckedRoles({});
        }
      });
    } else {
      toast.error("Please select a role first!");
    }
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
            Check Modules for Delete
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
                        disabled={prevCheckedRoles[row.moduleId] ? false : true}
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
        <DeleteButton onClick={deleteRole}>DELETE</DeleteButton>
      </div>
    </div>
  );
};
