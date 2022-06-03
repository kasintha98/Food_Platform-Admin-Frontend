import * as React from "react";
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

function NewLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="sidebar2">
      <List>
        <ListItem>
          <NavLink exact to={"/"}>
            <i className="fa fa-home"></i>
            &nbsp; Admin Dashboard
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={"/orders"}>
            <i className="fa fa-info-circle"></i>
            &nbsp; Orders
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={"/restaurants"}>
            <i className="fa fa-coffee"></i>
            &nbsp; Restaurants
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={"/products"}>
            <i className="fa fa-cutlery"></i>
            &nbsp; Menu
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={"/delivery-charges"}>
            <i className="fa fa-motorcycle"></i>
            &nbsp; Delivery Charges
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink exact to={"/employee"}>
            <i className="fa fa-user"></i>
            &nbsp; Employee
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink exact to={"/order-auto"}>
            <i className="fa fa-sort"></i>
            &nbsp; Order Automation
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink exact to={"/user-entitle"}>
            <i className="fa fa-address-card"></i>
            &nbsp; User Entitlement
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={"/reports"}>
            <i className="fa fa-pie-chart"></i>
            &nbsp; Reports
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={"/inventory"}>
            <i className="fa fa-suitcase"></i>
            &nbsp; Inventory Mgmt
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={"/customer"}>
            <i className="fa fa-child"></i>
            &nbsp; Customer
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={"/kds"}>
            <i className="fa fa-clone"></i>
            &nbsp; KDS
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={"/delivery-boy"}>
            <i className=" 	fa fa-flash"></i>
            &nbsp; Delivery Boy
          </NavLink>
        </ListItem>
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
            }}
          >
            <CustToolbar />
            {props.children ? props.children : null}
          </Box>
        </>
      ) : (
        <Box sx={{ width: "99%" }}>
          <CustToolbar />
          {props.children ? props.children : null}
        </Box>
      )}
    </Box>
  );
}

export default NewLayout;
