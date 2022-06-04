import React from "react";
import NewLayout from "../NewLayout";
import { Row } from "react-bootstrap";
import { Typography, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import styled from "@emotion/styled";
import { OrderTable } from "../../components/OrderTable";

const CusTab = styled(Tab)`
  /* font-size: 0.75rem;
  font-weight: 600;
  font-family: Arial; */
  color: #fff;
  background-color: #4472c4;
  width: 14.28%;
`;

const CusTabPanel = styled(TabPanel)`
  padding: 10px 0;
`;

const CusTabList = styled(TabList)`
  & .Mui-selected {
    background-color: #ffc000 !important;
    color: #fff !important;
  }

  & .MuiTabs-flexContainer {
    overflow-x: auto;
  }
`;

export const NewOrders = () => {
  const [tabValue, setTabValue] = React.useState("SUBMITTED");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <NewLayout sidebar>
      <Row>
        <div
          className="w-100 text-center p-3 mb-3"
          style={{
            color: "#2E75B6",
            backgroundColor: "#F2F2F2",
          }}
        >
          <Typography sx={{ fontWeight: "bold !important" }}>ORDERS</Typography>
        </div>
      </Row>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <CusTabList
            onChange={handleChangeTab}
            aria-label="lab API tabs example"
            TabIndicatorProps={{
              style: { background: "transparent" },
            }}
          >
            <CusTab label="SUBMITTED" value="SUBMITTED" />
            <CusTab label="ACCEPTED" value="ACCEPTED" />
            <CusTab label="PROCESSING" value="PROCESSING" />
            <CusTab label="FOOD READY" value="FOOD READY" />
            <CusTab label="OUT FOR DELIVERY" value="OUT FOR DELIVERY" />
            <CusTab label="DELIVERED" value="DELIVERED" />
            <CusTab label="CANCELLED" value="CANCELLED" />
          </CusTabList>
        </Box>
        <CusTabPanel value="SUBMITTED">
          <OrderTable type="SUBMITTED"></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="ACCEPTED">
          <OrderTable type="ACCEPTED"></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="PROCESSING">
          <OrderTable type="PROCESSING"></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="FOOD READY">
          <OrderTable type="FOOD READY"></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="OUT FOR DELIVERY">
          <OrderTable type="OUT FOR DELIVERY"></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="DELIVERED">
          <OrderTable type="DELIVERED"></OrderTable>
        </CusTabPanel>
        <CusTabPanel value="CANCELLED">
          <OrderTable type="CANCELLED"></OrderTable>
        </CusTabPanel>
      </TabContext>
    </NewLayout>
  );
};
