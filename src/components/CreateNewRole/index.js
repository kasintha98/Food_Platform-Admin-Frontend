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
import { Typography, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import { saveRoleWithModules } from "../../actions";
import { toast } from "react-toastify";

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

export const CreateNewRole = () => {
  const modules = useSelector((state) => state.user.modules);
  const [checked, setChecked] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [checkedRoles, setCheckedRoles] = useState({});

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setCheckedRoles({
      ...checkedRoles,
      [event.target.name]: event.target.checked,
    });
    console.log(checkedRoles);
  };

  const saveRole = () => {
    if (!roleName) {
      toast.error("Role name is needed!");
      return;
    }
    if (Object.keys(checkedRoles).length < 1) {
      toast.error("Please select at least 1 module!");
      return;
    }

    const role = {
      restaurantId: "R001",
      storeId: "S001",
      roleCategory: roleName.toLocaleUpperCase(),
      roleDescription: roleName,
      roleStatus: "ACTIVE",
      moduleIds: Object.keys(checkedRoles).filter(function (key) {
        return checkedRoles[key] === true;
      }),
    };
    console.log(role);
    dispatch(saveRoleWithModules(role)).then((res) => {
      if (res) {
        setRoleName("");
        setCheckedRoles({});
      }
    });
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col className="col-3">
          <Typography
            sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
          >
            Define New Roles
          </Typography>
        </Col>
        <Col className="col-6">
          <TextField
            label="Enter new role"
            value={roleName}
            onChange={(e) => {
              setRoleName(e.target.value);
            }}
            fullWidth
          />
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
        <SaveButton onClick={saveRole}>Save</SaveButton>
      </div>
    </div>
  );
};
