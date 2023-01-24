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

import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined'; // DineIn
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'; //Dash
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'; //Delivery
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'; //Reports
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AvTimerOutlinedIcon from '@mui/icons-material/AvTimerOutlined'; // Tracking
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined'; //Admin
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined'; //EOD
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'; //Orders
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';//Orders
import SoupKitchenOutlinedIcon from '@mui/icons-material/SoupKitchenOutlined'; //KDS
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'; //Order Mana
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined'; // Order Source
import SettingsPowerOutlinedIcon from '@mui/icons-material/SettingsPowerOutlined'; //Sign out
import { red } from "@mui/material/colors";


import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router-dom";



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
  const isMobile = useMediaQuery({ query: `(max-width: 1000)` });

  const [showEOD, setShowEOD] = useState(false);
  const [businessDate, setBusinessDate] = useState(null);

  const drawerWidth = props.drawerWidth;


  //---------------------START DROPDOWN

  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const employeeClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/employee`; 
    history.push(path);

    setOpen(false);
  };

  const menuClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/products`; 
    history.push(path);

    setOpen(false);
  };

  const orderAutomationClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/order-auto`; 
    history.push(path);

    setOpen(false);
  };

  const deliveryChargesClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/delivery-charges`; 
    history.push(path);

    setOpen(false);
  };

  const userEntitlementsClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/user-entitle`; 
    history.push(path);

    setOpen(false);
  };

  const customerClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/Customer`; 
    history.push(path);

    setOpen(false);
  };

  const restaurantsClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/restaurants`; 
    history.push(path);

    setOpen(false);
  };

  const inventoryManagementClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/inventory`; 
    history.push(path);

    setOpen(false);
  };

  const couponCodeClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/coupons`; 
    history.push(path);

    setOpen(false);
  };

  const itemMasterClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/item-master`; 
    history.push(path);

    setOpen(false);
  };

  const recipeClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/recipe-master`; 
    history.push(path);

    setOpen(false);
  };


  const eodClicked = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    let path = `/eod`; 
    history.push(path);

    setOpen(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
 
  //---------------------- END DROPDOWN

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
              (module) => module.moduleName === "DINE-IN"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DINE-IN"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/dine-in">
                  <FastfoodOutlinedIcon />
                  DINE-IN
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "DASHBOARD"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DASHBOARD"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  // backgroundColor:'#555555',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/dashboard">
                  <SpeedOutlinedIcon />
                  DASHBOARD
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "ORDER BY SOURCE"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "ORDER BY SOURCE"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/order-source">
                  <MultipleStopOutlinedIcon />
                  ORDER SOURCE
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "ORDERS"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "ORDERS"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/orders">
                  <ContentPasteOutlinedIcon />
                  ORDERS
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "KDS"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some((module) => module.moduleName === "KDS"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/kds">
                  <SoupKitchenOutlinedIcon />
                  KDS
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY MGMT"
            ) && (
                <div className="nav-item top-module_partition"> </div>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY MGMT"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/delivery-management">
                  <AccountTreeOutlinedIcon />
                  ORDER MGMT
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY BOY"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY BOY"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/delivery-boy">
                  <LocalShippingOutlinedIcon />
                  DELIVERY BOY
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY TRACKING"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "DELIVERY TRACKING"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/delivery-tracking">
                  <AvTimerOutlinedIcon />
                  TRACKING
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "REPORTS"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "REPORTS"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/reports">
                  <SummarizeOutlinedIcon />
                  REPORTS
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "ADMIN FUNCTIONS"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "ADMIN FUNCTIONS"
            ) && (
                <Stack className="mainTopButton" direction="row" spacing={2}>
                <div style={{display: 'flex',alignItems: 'center'}}>
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }}
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}>
                  <ConstructionOutlinedIcon />
                  ADMIN
                </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem className="menuItemFormatter" onClick={employeeClicked}>Employee</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={menuClicked}>Menu</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={orderAutomationClicked}>Order Automation</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={deliveryChargesClicked}>Delivery Charges</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={userEntitlementsClicked}> User Entitlement</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={customerClicked}>Customer</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={restaurantsClicked}>Restaurants</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={inventoryManagementClicked}> Inventory Mgmt</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={couponCodeClicked}>Coupon Code</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={itemMasterClicked}>Inventory Item Master</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={recipeClicked}>Recipe Master</MenuItem>
                              <MenuItem className="menuItemFormatter" onClick={eodClicked}> End Of Day</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </Stack>


              )}

            {modulesForUser.some(
              (module) => module.moduleName === "INVENTORY MGMT"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some(
              (module) => module.moduleName === "INVENTORY MGMT"
            ) && (
                <IconButton className="mainTopButton" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  fontSize: '0.6125em',
                  color: '#fff',
                  minWidth: 66,
                  maxWidth:70
                }} component={Link} to="/inventory">
                  <Inventory2OutlinedIcon />
                  INVENTORY MGMT
                </IconButton>
              )}

            {modulesForUser.some(
              (module) => module.moduleName === "EOD"
            ) && (
                <div className="nav-item top-module_partition"> </div>
            )}

            {modulesForUser.some((module) => module.moduleName === "EOD") && (
              <IconButton className="mainTopButton" style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                flexWrap: 'wrap',
                fontSize: '0.6125em',
                color: '#fff',
                minWidth: 66,
                maxWidth:70
              }} onClick={handleOpenEOD}>
                <NightlightRoundOutlinedIcon />
                EOD
              </IconButton>
            )}
          </>
        ) : null}

        <div className="nav-item top-module_partition"> </div>

        <IconButton className="mainTopButton" style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          flexWrap: 'wrap',
          fontSize: '0.6125em',
          color: '#fff',
          minWidth: 66,
          maxWidth:70
        }} onClick={logout}>
          <SettingsPowerOutlinedIcon/>
          Logout
        </IconButton>
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
                    performEOD(auth.user.restaurantId, auth.user.storeId)
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
        backgroundColor: '#35455E',
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
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          {/* &nbsp; &nbsp;{" "}
          {props.headerTitle ? props.headerTitle : "Admin Dashboard"} */}
        </Link>
        <span className="textFormatLoggedInUsr">
          {version ? `${version.appEnvironment}: ${version.appVersion}` : null}
          <br></br>
          <span>{auth.user.loginId.toString().toUpperCase()}</span>
          <br></br>
          <span>{auth.user.roleCategory}</span>
        </span>
        &nbsp;&nbsp;
        {businessDate ? (
          <div style={{ backgroundColor: '#ffdb4f', marginLeft: 25, color: '#35455E', borderRadius: 15 }}>
            <span>
              <span className="businessDate">Business Date</span>
              <br></br>
              <span className="businessDate">{`${Number(businessDate.getDate()).toString().length < 2
                  ? `0${businessDate.getDate()}`
                  : businessDate.getDate()
                }-${businessDate.toLocaleString("default", {
                  month: "short",
                })}-${businessDate.getFullYear()}`}</span>
            </span>
          </div>
        ) : null}
        <Nav className="mr-auto"></Nav>
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </Toolbar>
      {renderEODModal()}
    </AppBar>
  );
};
