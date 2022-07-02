import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import Layout from "../NewLayout";
import { Redirect } from "react-router-dom";

export const Welcome = () => {
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);

  if (auth.authenticate !== true) {
    return <Redirect to={"/signin"} />;
  }

  return (
    <Layout sidebar headerTitle="Welcome">
      <Row>
        <Col className="bk404"></Col>
        <Col>
          <Row
            className="align-items-center pl-4"
            style={{ minHeight: "80vh" }}
          >
            <Col
              style={{
                backgroundColor: "#ffc000",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <Typography sx={{ fontSize: "65px" }}>
                Welcome {user.firstName}!
              </Typography>
              <Typography sx={{ fontSize: "22px", color: "red" }}>
                Hungries Admin Dashboard
              </Typography>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};
