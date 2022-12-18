import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getInventoryUOM,
  getInventoryCategories,
  getAllProduct,
} from "../../actions";
import Layout from "../NewLayout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { SuppliersMaster } from "../../components/SuppliersMaster";
import { InventoryItemMaster } from "../../components/InventoryItemMaster";
import { RecipeMaster } from "../../components/RecipeMaster";
import { NewPurchaseOrder } from "../../components/NewPurchaseOrder";
import { SearchPurchaseOrder } from "../../components/SearchPurchaseOrder";
import { StoreInventoryTracking } from "../../components/StoreInventoryTracking";

export const Inventory = () => {
  const dispatch = useDispatch();

  const [tabValue, setTabValue] = React.useState("SUPPLIERS MASTER");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(getInventoryUOM());
    dispatch(getInventoryCategories());
    dispatch(getAllProduct());
  }, []);


  var htmlIframe = '<iframe width="80%" height="1068" src="https://datastudio.google.com/embed/reporting/2b4b72be-3bac-48a7-9dec-3e2d7e2a7926/page/PgjAD" frameborder="0" style="border:0" allowfullscreen></iframe>';


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
            <div>
              <InventoryItemMaster></InventoryItemMaster>
            </div>
          </TabPanel>
          <TabPanel value="RECIPE MASTER">
            <RecipeMaster></RecipeMaster>
          </TabPanel>
          <TabPanel value="NEW PURCHASE ORDER">
            <div>
              <NewPurchaseOrder></NewPurchaseOrder>
            </div>
          </TabPanel>
          <TabPanel value="SEARCH PURCHASE ORDER">
            <div>
              <SearchPurchaseOrder></SearchPurchaseOrder>
            </div>
          </TabPanel>
          <TabPanel value="CENTRAL INVENTORY TRACKING">
            <div style={{maxWidth:'100%',maxHeight:'1068px',marginLeft:'15%'}}>
              <div className="content" dangerouslySetInnerHTML={{__html: htmlIframe}}></div>
            </div>
          </TabPanel>
          <TabPanel value="STORE INVENTORY TRACKING">
            <div><StoreInventoryTracking></StoreInventoryTracking></div>
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
};
