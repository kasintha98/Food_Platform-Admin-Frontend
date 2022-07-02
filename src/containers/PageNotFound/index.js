import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./style.css";

export const PageNotFound = () => {
  return (
    <Container>
      <Row>
        <Col className="bk404"></Col>
        <Col>
          <Row
            className="align-items-center pl-4"
            style={{ minHeight: "100vh" }}
          >
            <Col>
              <Typography sx={{ fontSize: "72px" }}>404</Typography>
              <Typography sx={{ fontSize: "36px" }}>
                UH OH! You're lost.
              </Typography>
              <Typography sx={{ fontSize: "22px" }}>
                The page you are looking for does not exist. How you got here is
                a mystery. But you can click the button below to go back to the
                homepage.{" "}
              </Typography>
              <div className="w-100 mt-4 ">
                <NavLink
                  className="btn btn-success"
                  to={"/"}
                  style={{ minWidth: "200px" }}
                >
                  <i className="fa fa-home"></i>
                  &nbsp; Home
                </NavLink>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
