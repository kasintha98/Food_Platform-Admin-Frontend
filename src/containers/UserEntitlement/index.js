import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../NewLayout";
import { Row, Col } from "react-bootstrap";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { getModules, getRoles } from "../../actions";
import { CreateNewRole } from "../../components/CreateNewRole";
import { UpdateEntitlements } from "../../components/UpdateEntitlements";
import { DeleteRole } from "../../components/DeleteRole";
import { AssignRole } from "../../components/AssignRole";

export const UserEntitlement = () => {
  const roles = useSelector((state) => state.user.roles);
  const modules = useSelector((state) => state.user.modules);

  const [decision, setDecision] = useState("");
  const [showActionPage, setShowActionPage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getModules());
  }, []);

  const handleChangeDecision = (event) => {
    setDecision(event.target.value);
    setShowActionPage(false);
  };

  const renderActionPage = () => {
    if (showActionPage) {
      return (
        <div className="mt-3">
          {decision === "assignRole" && (
            <AssignRole
              setDecision={setDecision}
              setShowActionPage={setShowActionPage}
            ></AssignRole>
          )}
          {decision === "newRole" && <CreateNewRole></CreateNewRole>}
          {decision === "updateEntitlements" && (
            <UpdateEntitlements
              setDecision={setDecision}
              setShowActionPage={setShowActionPage}
            ></UpdateEntitlements>
          )}
          {decision === "deleteRole" && (
            <DeleteRole
              setDecision={setDecision}
              setShowActionPage={setShowActionPage}
            ></DeleteRole>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Layout sidebar>
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
              USER ENTITLEMENTS
            </Typography>
          </div>
        </Row>
      </div>
      <div>
        <Row className="align-items-center">
          <Col className="col-3">
            <Typography
              sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
            >
              I want to
            </Typography>
          </Col>
          <Col className="col-6" style={{ display: "flex" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Decision</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={decision}
                label="Decision"
                onChange={handleChangeDecision}
              >
                <MenuItem value={"assignRole"}>
                  assign role to an Employee
                </MenuItem>
                <MenuItem value={"newRole"}>
                  create new role and entitlements
                </MenuItem>
                <MenuItem value={"updateEntitlements"}>
                  view and update entitlements to an existing role
                </MenuItem>
                <MenuItem value={"deleteRole"}>
                  delete a role &amp; entitlements
                </MenuItem>
              </Select>
            </FormControl>
          </Col>
          <div style={{ maxWidth: "125px !important" }}>
            <Button
              onClick={() => {
                setShowActionPage(true);
              }}
              variant="contained"
              sx={{ backgroundColor: "#1F4E79" }}
              disabled={decision ? false : true}
            >
              Go
            </Button>
          </div>
        </Row>

        <div>{renderActionPage()}</div>
      </div>
    </Layout>
  );
};
