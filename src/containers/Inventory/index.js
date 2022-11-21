import React from "react";
import Layout from "../NewLayout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { SuppliersMaster } from "../../components/SuppliersMaster";

export const Inventory = () => {
  const [tabValue, setTabValue] = React.useState("SUPPLIERS MASTER");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Layout sidebar headerTitle="INVENTORY MGMT">
      <Box sx={{ width: "100%", marginTop: "-20px" }}>
        <TabContext value={tabValue}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChangeTab} variant="scrollable">
              <Tab label="SUPPLIERS MASTER" value="SUPPLIERS MASTER" />
              <Tab
                label="INVENTORY ITEM MASTER"
                value="INVENTORY ITEM MASTER"
              />
              <Tab label="RECIPE MASTER" value="RECIPE MASTER" />
              <Tab label="NEW PURCHASE ORDER" value="NEW PURCHASE ORDER" />
              <Tab
                label="SEARCH PURCHASE ORDER"
                value="SEARCH PURCHASE ORDER"
              />
              <Tab
                label="CENTRAL INVENTORY TRACKING"
                value="CENTRAL INVENTORY TRACKING"
              />
              <Tab
                label="STORE INVENTORY TRACKING"
                value="STORE INVENTORY TRACKING"
              />
            </TabList>
          </Box>

          <TabPanel value="SUPPLIERS MASTER">
            <div>
              <SuppliersMaster></SuppliersMaster>
            </div>
          </TabPanel>
          <TabPanel value="INVENTORY ITEM MASTER">
            <div>b</div>
          </TabPanel>
          <TabPanel value="RECIPE MASTER">
            <div>c</div>
          </TabPanel>
          <TabPanel value="NEW PURCHASE ORDER">
            <div>d</div>
          </TabPanel>
          <TabPanel value="SEARCH PURCHASE ORDER">
            <div>e</div>
          </TabPanel>
          <TabPanel value="CENTRAL INVENTORY TRACKING">
            <div>f</div>
          </TabPanel>
          <TabPanel value="STORE INVENTORY TRACKING">
            <div>g</div>
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
};
