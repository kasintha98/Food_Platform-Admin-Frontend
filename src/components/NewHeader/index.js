import React, { useState, useEffect } from "react";
import { Nav, DropdownButton } from "react-bootstrap";
import { Row, Col, Modal } from "react-bootstrap";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../img/logo.png";
import { signout, performEOD, getBusinessDate } from "../../actions";
import "./style.css";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";
import { Typography, Button } from "@mui/material";

const CusDropdownButton = styled(DropdownButton)`
  & button {
    background-color: #fff;
    color: black;
    height: 29px;
    border-radius: 5px;
    font-size: 12px;
  }

  & button:hover {
    background-color: #ffc000;
    color: black;
  }

  & .dropdown-toggle:active {
    background-color: #ffc000;
    color: black;
  }

  & .dropdown-toggle:focus {
    background-color: #ffc000;
    color: black;
  }

  background-color: #fff;
  border-radius: 5px;
  height: 29px;
`;

const CusButton = styled(Button)`
  background-color: #fff;
  color: black;
  height: 29px;
  border-radius: 5px;
  font-size: 12px;
  width: 90px;

  &:hover {
    background-color: #ffc000;
    color: black;
  }

  &:active {
    background-color: #ffc000;
    color: black;
  }

  &:focus {
    background-color: #ffc000;
    color: black;
  }
`;

export const NewHeader = (props) => {
  const auth = useSelector((state) => state.auth);
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const version = useSelector((state) => state.auth.version);
  const modulesForUser = useSelector((state) => state.user.modulesForUser);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: `(max-width: 1400px)` });

  const [showEOD, setShowEOD] = useState(false);
  const [businessDate, setBusinessDate] = useState(null);

  const drawerWidth = props.drawerWidth;

  useEffect(() => {
    if (businessDateAll) {
      setBusinessDate(new Date(businessDateAll.businessDate));
    }
  }, [businessDateAll]);

  //logout action calling
  const logout = () => {
    dispatch(signout());
  };

  //show logged in navbar
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        {!isMobile ? (
          <>
            {modulesForUser.some(
              (module) => module.moduleName === "ORDER BY SOURCE"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/order-source"}>
                  ORDER BY SOURCE
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DINE-IN"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/dine-in"}>
                  DINE-IN
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DASHBOARD"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/dashboard"}>
                  DASHBOARD
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "ORDERS"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/orders"}>
                  ORDERS
                </NavLink>
              </li>
            )}

            {modulesForUser.some((module) => module.moduleName === "KDS") && (
              <li className="nav-item top-module">
                <NavLink exact to={"/kds"}>
                  KDS
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY MGMT"
            ) && (
              <li className="nav-item top-module">
                <NavLink to={"/delivery-management"}>DELIVERY MGMT</NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY BOY"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/delivery-boy"}>
                  DELIVERY BOY
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY TRACKING"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/delivery-tracking"}>
                  DELIVERY TRACKING
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "REPORTS"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/reports"}>
                  REPORTS
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "ADMIN FUNCTIONS"
            ) && (
              <li className="nav-item top-module">
                <CusDropdownButton title="ADMIN FUNCTIONS">
                  <NavLink exact to={"/employee"}>
                    Employee
                  </NavLink>
                  <NavLink to={"/products"}>Menu</NavLink>
                  <NavLink exact to={"/order-auto"}>
                    Order Automation
                  </NavLink>
                  <NavLink to={"/delivery-charges"}>Delivery Charges</NavLink>
                  <NavLink exact to={"/user-entitle"}>
                    User Entitlement
                  </NavLink>
                  <NavLink to={"/customer"}>Customer</NavLink>
                  <NavLink to={"/restaurants"}>Restaurants</NavLink>
                  <NavLink exact to={"/inventory"}>
                    Inventory Mgmt
                  </NavLink>
                  <NavLink exact to={"/coupons"}>
                    Coupon Code
                  </NavLink>
                  <NavLink exact to={"/eod"}>
                    End Of Day
                  </NavLink>
                </CusDropdownButton>
              </li>
            )}

            {modulesForUser.some((module) => module.moduleName === "EOD") && (
              <li className="nav-item top-module">
                <CusButton onClick={handleOpenEOD}>EOD</CusButton>
              </li>
            )}
          </>
        ) : null}

        <li className="nav-item">
          <span
            className="nav-link pointer"
            onClick={logout}
            style={{
              fontSize: "13px",
              paddingLeft: "3px",
              paddingRight: "5px",
            }}
          >
            <i className="fa fa-sign-out"></i>&nbsp; Sign Out
          </span>
        </li>
      </Nav>
    );
  };

  //show non logged in navbar
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link pointer newLink">
            <i className="fa fa-sign-in"></i>&nbsp; Sign In
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="/signup" className="nav-link pointer newLink">
            <i className="fa fa-user-plus"></i>&nbsp; Sign Up
          </NavLink>
        </li> */}
      </Nav>
    );
  };

  const handleCloseEOD = () => {
    setShowEOD(false);
  };

  const handleOpenEOD = () => {
    setShowEOD(true);
  };

  const renderEODModal = () => {
    return (
      <Modal show={showEOD} onHide={handleCloseEOD} style={{ zIndex: 1100 }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography>End Of Day</Typography>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: "75vh", overflowY: "auto" }}>
          <Typography>Are you sure you want to close today's EOD?</Typography>
        </Modal.Body>

        <Modal.Footer>
          <Row className="w-100">
            <Col className="col-6">
              <Button
                color="error"
                onClick={handleCloseEOD}
                className="w-100"
                variant="contained"
              >
                Close
              </Button>
            </Col>
            <Col className="col-6">
              <Button
                color="success"
                onClick={() => {
                  dispatch(
                    performEOD(auth.user.restaurantId, auth.user.storeId, auth.user.loginId)
                  ).then((res) => {
                    if (res) {
                      dispatch(
                        getBusinessDate(
                          auth.user.restaurantId,
                          auth.user.storeId
                        )
                      );
                      handleCloseEOD();
                    }
                  });
                }}
                className="w-100"
                variant="contained"
              >
                Yes
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xxl: `calc(100% - ${drawerWidth}px)` },
        ml: { xxl: `${drawerWidth}px` },
      }}
    >
      <Toolbar
        sx={{ paddingLeft: "10px !important", paddingRight: "0px !important" }}
      >
        {drawerWidth > 0 ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { xxl: "none" }, marginRight: "0px" }}
          >
            <MenuIcon />
          </IconButton>
        ) : null}
        <Link className="navbar-brand newLink" to="/">
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {/* &nbsp; &nbsp;{" "}
          {props.headerTitle ? props.headerTitle : "Admin Dashboard"} */}
        </Link>
        <span style={{ fontSize: "12px" }}>
          {version ? `${version.appEnvironment}: ${version.appVersion}` : null}
          <br></br>
          <span>{auth.user.loginId}</span>
          <br></br>
          <span>{auth.user.roleCategory}</span>
        </span>
        &nbsp;&nbsp;
        {businessDate ? (
          <span style={{ fontSize: "12px" }}>
            <span>Billing Date</span>
            <br></br>
            <span>{`${
              Number(businessDate.getDate()).toString().length < 2
                ? `0${businessDate.getDate()}`
                : businessDate.getDate()
            }-${businessDate.toLocaleString("default", {
              month: "short",
            })}-${businessDate.getFullYear()}`}</span>
          </span>
        ) : null}
        <Nav className="mr-auto"></Nav>
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </Toolbar>
      {renderEODModal()}
    </AppBar>
  );
};
