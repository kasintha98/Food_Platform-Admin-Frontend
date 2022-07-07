import React from "react";
import { Nav, DropdownButton, Dropdown } from "react-bootstrap";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../img/logo.png";
import { signout } from "../../actions";
import "./style.css";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";

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

export const NewHeader = (props) => {
  const auth = useSelector((state) => state.auth);
  const version = useSelector((state) => state.auth.version);
  const modulesForUser = useSelector((state) => state.user.modulesForUser);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: `(max-width: 1260px)` });

  const drawerWidth = props.drawerWidth;

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
              (module) => module.moduleName === "DASHBOARD"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/dashboard"}>
                  Dashboard
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "ORDERS"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/orders"}>
                  Orders
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "KITCHEN DISPLAY SYSTEM"
            ) && (
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
                <NavLink to={"/delivery-management"}>Delivery Mgmt</NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY BOY"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/delivery-boy"}>
                  Delivery Boy
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY TRACKING"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/delivery-tracking"}>
                  Delivery Tracking
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "REPORTS"
            ) && (
              <li className="nav-item top-module">
                <NavLink exact to={"/reports"}>
                  Reports
                </NavLink>
              </li>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "ADMIN FUNCTIONS"
            ) && (
              <li className="nav-item top-module">
                <CusDropdownButton title="Admin Functions">
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
                </CusDropdownButton>
              </li>
            )}
          </>
        ) : null}

        <li className="nav-item">
          <span className="nav-link pointer" onClick={logout}>
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

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xxl: `calc(100% - ${drawerWidth}px)` },
        ml: { xxl: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        {drawerWidth > 0 ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { xxl: "none" } }}
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
        <span style={{ fontSize: "0.8rem" }}>
          {version ? `${version.appEnvironment}: ${version.appVersion}` : null}
        </span>
        <Nav className="mr-auto"></Nav>
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </Toolbar>
    </AppBar>
  );
};
