import React from "react";
import { Nav } from "react-bootstrap";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../img/logo.png";
import { signout } from "../../actions";
import "./style.css";

export const NewHeader = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const drawerWidth = props.drawerWidth;

  //logout action calling
  const logout = () => {
    dispatch(signout());
  };

  //show logged in navbar
  const renderLoggedInLinks = () => {
    return (
      <Nav>
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
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link pointer newLink">
            <i className="fa fa-user-plus"></i>&nbsp; Sign Up
          </NavLink>
        </li>
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
          &nbsp; &nbsp;{" "}
          {props.headerTitle ? props.headerTitle : "Admin Dashboard"}
        </Link>
        <Nav className="mr-auto"></Nav>
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </Toolbar>
    </AppBar>
  );
};
