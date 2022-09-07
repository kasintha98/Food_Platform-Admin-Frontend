import React, { useState } from "react";
import Layout from "../NewLayout";
import { Form, Button, Row, Col } from "react-bootstrap";
import { resetPassword } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./style.css";
import logo from "../../img/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";

export const ForgotPasswordNew = () => {
  const [loginId, setLoginId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  //geting user's authenticate status (from auth.reducers.js) and storing in the auth variable
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const resetPasswordHandle = (e) => {
    e.preventDefault();

    if (!loginId || !newPassword || !passwordRepeat) {
      toast.error("Please fill all the fields!");
      return;
    }

    if (newPassword !== passwordRepeat) {
      toast.error("Passwords do not match. Please repeat the same password!");
      return;
    }

    dispatch(resetPassword(loginId, newPassword)).then((res) => {
      if (res) {
        setLoginId("");
        setNewPassword("");
        setPasswordRepeat("");
        //history.push("/signin");
      }
    });
  };

  if (auth.authenticate === true) {
    //if authenticate is true (this means  user's LOGIN_SUCCESS) redirecting the user to the home page
    //return <Redirect to={"/"} />;
  }

  return (
    <div>
      <ToastContainer />
      <Layout>
        <Row style={{ height: "100vh", marginTop: "-90px" }}>
          <Col className="main col-4"></Col>
          <Col className="col-8">
            <Row
              style={{ marginTop: "50px", padding: "20px" }}
              className="text-center"
            >
              <Col md={{ span: 6, offset: 3 }}>
                <img width="100px" src={logo} alt="logo" />

                <h2 className="text-center">Reset Password</h2>
                <br></br>
                <Form onSubmit={resetPasswordHandle}>
                  <TextField
                    variant="standard"
                    label="Login ID"
                    type="text"
                    value={loginId}
                    className="w-100"
                    onChange={(e) => {
                      setLoginId(e.target.value);
                    }}
                  />

                  <TextField
                    variant="standard"
                    label="New Password"
                    type="password"
                    value={newPassword}
                    className="w-100"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />

                  <TextField
                    variant="standard"
                    label="Confirm Password"
                    type="password"
                    value={passwordRepeat}
                    className="w-100"
                    onChange={(e) => {
                      setPasswordRepeat(e.target.value);
                    }}
                  />

                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3"
                    style={{ width: "100%", marginBottom: "50px" }}
                  >
                    Reset Password
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};
