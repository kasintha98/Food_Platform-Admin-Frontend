import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { performEOD, getBusinessDate } from "../../actions";
import { Row, Col, Modal } from "react-bootstrap";
import { Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import "./style.css";
import { NewHeader } from "../../components/NewHeader";

const drawerWidth = 240;

const CustToolbar = styled(Toolbar)`
  @media screen and (max-width: 450px) {
    margin-top: 0px;
  }
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

function NewLayout(props) {
  const { window } = props;
  const auth = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const modulesForUser = useSelector((state) => state.user.modulesForUser);
  const [showEOD, setShowEOD] = React.useState(false);

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const drawer = (
    <div className="sidebar2">
      <List>
        {modulesForUser.some((module) => module.moduleName === "DASHBOARD") && (
          <ListItem>
            <NavLink exact to={"/dashboard"}>
              <i className="fa fa-home"></i>
              &nbsp; Admin Dashboard
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some((module) => module.moduleName === "ORDERS") && (
          <ListItem>
            <NavLink to={"/orders"}>
              <i className="fa fa-info-circle"></i>
              &nbsp; Orders
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink to={"/restaurants"}>
              <i className="fa fa-coffee"></i>
              &nbsp; Restaurants
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink to={"/products"}>
              <i className="fa fa-cutlery"></i>
              &nbsp; Menu
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink to={"/delivery-charges"}>
              <i className="fa fa-motorcycle"></i>
              &nbsp; Delivery Charges
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink exact to={"/employee"}>
              <i className="fa fa-user"></i>
              &nbsp; Employee
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink exact to={"/order-auto"}>
              <i className="fa fa-sort"></i>
              &nbsp; Order Automation
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink exact to={"/user-entitle"}>
              <i className="fa fa-address-card"></i>
              &nbsp; User Entitlement
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some((module) => module.moduleName === "REPORTS") && (
          <ListItem>
            <NavLink to={"/reports"}>
              <i className="fa fa-pie-chart"></i>
              &nbsp; Reports
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink to={"/inventory"}>
              <i className="fa fa-suitcase"></i>
              &nbsp; Inventory Mgmt
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink to={"/customer"}>
              <i className="fa fa-child"></i>
              &nbsp; Customer
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "KITCHEN DISPLAY SYSTEM"
        ) && (
          <ListItem>
            <NavLink to={"/kds"}>
              <i className="fa fa-clone"></i>
              &nbsp; KDS
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "DELIVERY MGMT"
        ) && (
          <ListItem>
            <NavLink to={"/delivery-management"}>
              <i className="fa fa-cube"></i>
              &nbsp; Delivery Mgmt
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "DELIVERY TRACKING"
        ) && (
          <ListItem>
            <NavLink to={"/delivery-tracking"}>
              <i className=" 	fa fa-map-marker"></i>
              &nbsp; Delivery Tracking
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "DELIVERY BOY"
        ) && (
          <ListItem>
            <NavLink to={"/delivery-boy"}>
              <i className=" 	fa fa-flash"></i>
              &nbsp; Delivery Boy
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink to={"/coupons"}>
              <i className="fa fa-address-card"></i>
              &nbsp; Coupon Code
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some((module) => module.moduleName === "DINE-IN") && (
          <ListItem>
            <NavLink to={"/dine-in"}>
              <i className="fa fa-coffee"></i>
              &nbsp; Dine-In
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "PASSWORD RESET"
        ) && (
          <ListItem>
            <NavLink to={"/password-reset-admin"}>
              <i className="fa fa-gear"></i>
              &nbsp; Password Reset
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ORDER BY SOURCE"
        ) && (
          <ListItem>
            <NavLink to={"/order-source"}>
              <i className="fa fa-dot-circle-o"></i>
              &nbsp; Order Source
            </NavLink>
          </ListItem>
        )}

        {modulesForUser.some((module) => module.moduleName === "EOD") && (
          <ListItem>
            <a onClick={handleOpenEOD} style={{ color: "#fff" }}>
              <i className="fa fa-calendar"></i>
              &nbsp; EOD
            </a>
          </ListItem>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <ListItem>
            <NavLink to={"/eod"}>
              <i className="fa fa-calendar"></i>
              &nbsp; End Of Day
            </NavLink>
          </ListItem>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NewHeader
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={props.sidebar ? 240 : 0}
        headerTitle={props.headerTitle}
      ></NewHeader>
      {props.sidebar ? (
        <>
          <Box
            component="nav"
            sx={{ width: { xxl: drawerWidth }, flexShrink: { xxl: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", xxl: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", xxl: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { xxl: `calc(100% - ${drawerWidth}px)` },
              backgroundColor: `${props.bgColor ? props.bgColor : "#fff"}`,
            }}
          >
            <CustToolbar />
            {props.children ? props.children : null}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            width: "99%",
            backgroundColor: `${props.bgColor ? props.bgColor : "#fff"}`,
          }}
        >
          <CustToolbar />
          {props.children ? props.children : null}
        </Box>
      )}
      {renderEODModal()}
    </Box>
  );
}

export default NewLayout;
