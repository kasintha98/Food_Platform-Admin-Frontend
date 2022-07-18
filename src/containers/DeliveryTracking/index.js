import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersByRole, getAllRiderLocations } from "../../actions";
import Layout from "../NewLayout";
import styled from "@emotion/styled";
import { Box, Tabs, Typography, Alert } from "@mui/material";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { DeliveryTrackingTable } from "../../components/DeliveryTrackingTable";
import "./style.css";

const CusTab = styled(Tab)`
  /* & .count-d {
    background-color: #2e75b6 !important;
    color: #fff;
    margin-left: 5px;
    padding: 10px;
    border-radius: 5px;
  } */
`;

const CusTabs = styled(Tabs)`
  & .Mui-selected .count-d {
    background-color: #2e75b6 !important;
    color: #fff;
    margin-left: 5px;
    padding: 10px;
    border-radius: 5px;
  }

  & button:focus .count-d {
    color: #fff !important;
    background-color: #ffc000 !important;
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
  const allOrders = useSelector((state) => state.order.allOrders);
  const usersByRole = useSelector((state) => state.user.usersByRole);
  const userRoleLoading = useSelector((state) => state.user.userRoleLoading);
  const [tabValue, setTabValue] = React.useState(5);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersByRole("DELIVERY_BOY")).then((res) => {
      if (res) {
        document
          .querySelector(".MuiTabs-scroller")
          .classList.add("Mui-selected");
      }
    });
    dispatch(getAllRiderLocations());
  }, []);

  const handleChangeTab = (event, newValue) => {
    document.querySelector(".MuiTabs-scroller").classList.add("Mui-selected");
    setTabValue(newValue);
  };

  const calcAllOrderCount = (userName) => {
    let arr = allOrders;
    const count = arr.filter(function (el) {
      return (
        (el.orderStatus === "FOOD READY" ||
          el.orderStatus === "OUT FOR DELIVERY" ||
          el.orderStatus === "CANCELLED" ||
          el.orderStatus === "DELIVERED") &&
        el.deliveryUserId === userName
      );
    }).length;

    return <span>{count}</span>;
  };

  return (
    <Layout sidebar headerTitle="Delivery Boy">
      {!userRoleLoading && usersByRole.length > 0 ? (
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
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", textAlign: "left" }}
          >
            {usersByRole.map((user) => (
              <CusTab
                onClick={(e) => {
                  handleChangeTab(e, user.userSeqNo);
                }}
                label={
                  <Typography>
                    <span>{user.firstName}</span>
                    <span className="count-d">
                      {calcAllOrderCount(user.firstName)}
                    </span>
                  </Typography>
                }
                {...a11yProps(user.userSeqNo)}
              />
            ))}
          </CusTabs>
          {usersByRole.map((user) => (
            <TabPanel
              value={tabValue}
              index={user.userSeqNo}
              style={{ width: "100%" }}
            >
              <DeliveryTrackingTable
                boyName={user.firstName}
              ></DeliveryTrackingTable>
            </TabPanel>
          ))}
        </Box>
      ) : (
        <>
          {!userRoleLoading && usersByRole.length < 1 ? (
            <Alert severity="warning">
              No delivery boy user data recieved!
            </Alert>
          ) : (
            <>
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
              <br></br>
              <div className="text-center">
                <Typography>Getting data...</Typography>
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};
