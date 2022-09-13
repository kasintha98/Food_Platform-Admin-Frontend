import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  width: 12.5%;
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

export const OrderSource = () => {
  const allOrders = useSelector((state) => state.order.allOrders);
  const orderSources = useSelector((state) => state.user.orderSources);
  const [tabValue, setTabValue] = useState("ALL");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const calcOrderCount = (source) => {
    const count = allOrders.filter(function (el) {
      return el.orderSource === source;
    }).length;

    return count;
  };

  return (
    <NewLayout sidebar headerTitle="Orders Source">
      {orderSources && orderSources.length > 0 ? (
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <CusTabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
              TabIndicatorProps={{
                style: { background: "transparent" },
              }}
            >
              <CusTab
                label={
                  <span>
                    ALL <br></br> ({allOrders.length})
                  </span>
                }
                value="ALL"
              />

              {orderSources.map((item) => (
                <CusTab
                  label={
                    <span>
                      {item.configCriteriaDesc} <br></br> (
                      {calcOrderCount(item.configCriteriaValue)})
                    </span>
                  }
                  value={item.configCriteriaValue}
                />
              ))}
            </CusTabList>
          </Box>
          <CusTabPanel value="ALL">
            <OrderTable type={null}></OrderTable>
          </CusTabPanel>

          {orderSources.map((item) => (
            <CusTabPanel value={item.configCriteriaValue}>
              <OrderTable
                type={item.configCriteriaValue}
                isForOrderSource={true}
              ></OrderTable>
            </CusTabPanel>
          ))}
        </TabContext>
      ) : (
        <h4>No Order Sources Found</h4>
      )}
    </NewLayout>
  );
};
