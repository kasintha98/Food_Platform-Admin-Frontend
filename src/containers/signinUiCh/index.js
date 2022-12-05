import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../NewLayout";
import { Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login, loginTest, newLogin } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./style.css";
import logo from "../../img/logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { ForgotPassword } from "../ForgotPassword";

import bugerLogin from "../../img/burger_login.jpg";
import foodi_hangries_top from "../../img/hangries_foodi.png";
import arrow_white from "../../img/arrow_white.png";

function Signin(props) {
  //initial state of email
  const [loginId, setLoginId] = useState("");
  //initial state of password
  const [password, setPassword] = useState("");
  const [isResetPasswordpassword, setIsResetPasswordPassword] = useState(false);

  //geting user's authenticate status (from auth.reducers.js) and storing in the auth variable
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = (e) => {
    e.preventDefault();
    const user = { loginId, password };
    dispatch(newLogin(user)).then((res) => {
      if (res && res.isFirstTime) {
        //history.push("/forgot-password");
        setIsResetPasswordPassword(true);
      }
    });
  };

  const closeResetPassword = () => {
    setIsResetPasswordPassword(false);
  };

  if (auth.authenticate === true) {
    //if authenticate is true (this means  user's LOGIN_SUCCESS) redirecting the user to the home page
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      {isResetPasswordpassword ? (
        <ForgotPassword
          closeResetPassword={closeResetPassword}
        ></ForgotPassword>
      ) : (
        <>
          <ToastContainer />
            <Row style={{ height: "100vh" }}>
              <Col className="burgerColStyle" ><img className="burgerImg" src={bugerLogin} alt="burger"></img></Col>
              <Col className="adminLabelColStyle">
                <Typography variant="h1" className="adminLabelTxtStyle"> ADMIN LOGIN</Typography>
              </Col>
              <Col className="otherColStyle">
                <Row className="topRowStyle">
                  <Col className="topColStyle">
                    <img className="topImgStyle" src={foodi_hangries_top} alt="topone"></img>
                    </Col>
                </Row>
              <Row
                  // style={{ marginTop: "50px", padding: "20px" }}
                  className="text-center loginModuleColStyle"
                >
                  <Col md={{ span: 8, offset: 2 }}>
                    <Form onSubmit={userLogin}>
                      <TextField
                        variant="outlined"
                        size="small"
                        InputProps={{ disableUnderline: true,
                          inputProps: {style: { textAlign: "left" },},
                          style: { fontWeight: 500,
                          fontFamily: "Roboto Condensed, sans-serif" } }}
                        InputLabelProps={{
                          inputProps: {style: {fontSize:'14px'},},
                          style: { fontWeight: 600,fontSize:'14px',
                          fontFamily: "Roboto Condensed, sans-serif" } }}
                        label="Login Id"
                        type="text"
                        value={loginId}
                        className="textFielsStyle"
                        onChange={(e) => {
                          setLoginId(e.target.value);
                        }}
                      />

                      <TextField
                        variant="outlined"
                        size="small"
                        InputLabelProps={{ 
                          inputProps: {style: {fontSize:'14px'},},
                          style: { fontWeight: 600,fontSize:'14px',
                          fontFamily: "Roboto Condensed, sans-serif" } }}
                        label="Password"
                        type="password"
                        value={password}
                        className="textFielsStyle"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />

                      <Form.Group className="formGrpStyle">
                        <Form.Check
                          className="text-center formStyle"
                          type="checkbox"
                          label="Remember Me"
                        />
                      </Form.Group>
                      <Button className="submitBtnStyle"
                        // variant="primary"
                        type="submit"
                        style={{ width: "70%" }}
                      >
                        Sign In
                      </Button>
                    </Form>
                    <Row className="topRowStyle">
                    <img className="arrowImgStyle" src={arrow_white} alt="arrow"></img>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
        </>
      )}
    </div>
  );
}

export default Signin;
