import React from "react";
import Layout from "../NewLayout";
import styled from "@emotion/styled";
import { Box, Tabs, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { DeliveryTrackingTable } from "../../components/DeliveryTrackingTable";
import "./style.css";

const CusTab = styled(Tab)`
  & .count-d {
    background-color: #2e75b6;
    color: #fff;
    margin-left: 5px;
    padding: 10px;
    border-radius: 5px;
  }
`;

const CusTabs = styled(Tabs)`
  & .Mui-selected .count-d {
    background-color: #ffc000 !important;
    color: #fff !important;
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const DeliveryTracking = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Layout sidebar headerTitle="Delivery Boy">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <CusTabs
          orientation="vertical"
          variant="scrollable"
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", textAlign: "left" }}
        >
          <CusTab
            label={
              <Typography>
                <span>Rajesh</span>
                <span className="count-d">4</span>
              </Typography>
            }
            {...a11yProps(0)}
          />
          <CusTab
            label={
              <Typography>
                <span>Rahul</span>
                <span className="count-d">4</span>
              </Typography>
            }
            {...a11yProps(1)}
          />
          <CusTab
            label={
              <Typography>
                <span>Virat</span>
                <span className="count-d">4</span>
              </Typography>
            }
            {...a11yProps(2)}
          />
        </CusTabs>
        <TabPanel value={tabValue} index={0} style={{ width: "100%" }}>
          <DeliveryTrackingTable boyName={"Rajesh"}></DeliveryTrackingTable>
        </TabPanel>
        <TabPanel value={tabValue} index={1} style={{ width: "100%" }}>
          <DeliveryTrackingTable boyName={"Rahul"}></DeliveryTrackingTable>
        </TabPanel>
        <TabPanel value={tabValue} index={2} style={{ width: "100%" }}>
          <DeliveryTrackingTable boyName={"Virat"}></DeliveryTrackingTable>
        </TabPanel>
      </Box>
    </Layout>
  );
};
