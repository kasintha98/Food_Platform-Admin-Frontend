import React, { useState } from "react";
import Layout from "../NewLayout";
import { Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login, loginTest } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./style.css";
import logo from "../../img/logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";

function Signin(props) {
  //initial state of email
  const [email, setEmail] = useState("");
  //initial state of password
  const [password, setPassword] = useState("");

  //geting user's authenticate status (from auth.reducers.js) and storing in the auth variable
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = (e) => {
    e.preventDefault();

    const user = { email, password };

    console.log(user);

    dispatch(loginTest(user));

    //remove - for test
    //history.push("/");
  };

  if (auth.authenticate === true) {
    //if authenticate is true (this means  user's LOGIN_SUCCESS) redirecting the user to the home page
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <ToastContainer />
      <Layout>
        <Row style={{ height: "100vh" }}>
          <Col className="main col-4"></Col>
          <Col className="col-8">
            <Row
              style={{ marginTop: "50px", padding: "20px" }}
              className="text-center"
            >
              <Col md={{ span: 6, offset: 3 }}>
                <img width="100px" src={logo} alt="logo" />

                <h2 className="text-center">Sign In</h2>
                <br></br>
                <h3 className="text-center">Hangries Admin Dashboard</h3>
                <br></br>
                <Form onSubmit={userLogin}>
                  <TextField
                    variant="standard"
                    label="Email"
                    type="email"
                    value={email}
                    className="w-100"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <TextField
                    variant="standard"
                    label="Password"
                    type="password"
                    value={password}
                    className="w-100"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <Form.Group>
                    <Form.Check
                      className="text-center"
                      type="checkbox"
                      label="Remember Me"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "100%", marginBottom: "50px" }}
                  >
                    Sign In
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </div>
  );
}

export default Signin;
