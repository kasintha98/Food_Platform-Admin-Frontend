import React from "react";
import "./style.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Layout from "../NewLayout";
import Box from "@mui/material/Box";
import { SeoBanners } from "../SeoBannersOthers";
import { SeoHeader } from "../SeoHeader";
import { SeoFooter } from "../SeoFooter";
import { SeoSocialMedia } from "../SeoSocialMedia";

import styled from "@emotion/styled";


// const CusTabList = styled(TabList)`
// & .MuiTab-root {
//     background-color: #34deff !important;
//     margin-right: 5px;
//     height: 30px;
// }
//   & .Mui-selected {
//     background-color: #01abff !important;
//     color: #fff !important;
//     font-weight: 700;
//     height: 50px;
//   }

//   & .MuiTabs-flexContainer {
//     overflow-x: auto;
//   }
// `;

const CusTabList = styled(TabList)`
    & .MuiTab-root {
        color: #000 !important;
        font-weight: 500;
    }
  & .Mui-selected {
    background-color: #ffc000 !important;
    color: #fff !important;
  }

  & .MuiTabs-flexContainer {
    overflow-x: auto;
  }
`;


export const SEO = () => {

    const [tabValue, setTabValue] = React.useState("1");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div>
            <Layout sidebar headerTitle="Customer">
                <div className="topHeaderBar"><span>Online Website Customisations</span></div>
                <TabContext value={tabValue}>
                    <Box
                        sx={{ borderBottom: 1, borderColor: "divider", marginTop: "-20px" }}
                    >
                        <CusTabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="HEADER" value="1" />
                            <Tab label="BANNERS & OTHERS" value="2" />
                            <Tab label="SOCIAL MEDIA" value="3" />
                            <Tab label="FOOTERS" value="4" />
                        </CusTabList>
                    </Box>
                    <TabPanel value="1">
                        <SeoHeader></SeoHeader>
                    </TabPanel>
                    <TabPanel value="2">
                        <SeoBanners></SeoBanners>
                    </TabPanel>
                    <TabPanel value="3">
                        <SeoSocialMedia></SeoSocialMedia>
                    </TabPanel>
                    <TabPanel value="4">
                        <SeoFooter></SeoFooter>
                    </TabPanel>
                </TabContext>
            </Layout>
        </div>
    );
};
