import React from "react";
import Layout from "../NewLayout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MenuMaster } from "../../components/MenuMaster";
import { ToppingMaster } from "../../components/ToppingMaster";
import { AddToppingToDish } from "../../components/AddToppingToDish";
import { MenuMasterNew } from "../../components/MenuMasterNew";

export const AdminMenu = () => {
  const [tabValue, setTabValue] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Layout sidebar headerTitle="Customer">
      <TabContext value={tabValue}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", marginTop: "-20px" }}
        >
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="MENU MASTER" value="1" />
            <Tab label="TOPPING MASTER" value="2" />
            <Tab label="ADD TOPPINGS TO DISH" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <MenuMaster></MenuMaster>
        </TabPanel>
        <TabPanel value="2">
          <ToppingMaster></ToppingMaster>
        </TabPanel>
        <TabPanel value="3">
          <AddToppingToDish></AddToppingToDish>
        </TabPanel>
      </TabContext>
    </Layout>
  );
};
