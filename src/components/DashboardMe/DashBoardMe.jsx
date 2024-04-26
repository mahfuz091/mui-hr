"use client";
import { styled } from "@mui/material/styles";
import { HrContext } from "@/context/HrProvider";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import MuiTab from "@mui/material/Tab";
import { Avatar, Box, Typography } from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";

// ** Icons Imports
import AccountOutline from "mdi-material-ui/AccountOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";
import { Forum, ViewModule } from "@mui/icons-material";
import { Calendar } from "mdi-material-ui";
import OverView from "../OverView/OverView";

// ** Styled Components

const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const DashBoardMe = () => {
  const { user, getUser } = useContext(HrContext);
  const [value, setValue] = useState("account");

  // console.log(gender);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Avatar
          alt='John Doe'
          sx={{ width: 40, height: 40 }}
          src={user?.auth?.avatar}
        ></Avatar>
        <Typography variant='h1' sx={{ fontSize: "24px", fontWeight: "700" }}>
          {user?.auth?.name || "Name"}
        </Typography>
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Tab
              value='account'
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ViewModule />
                  <TabName>OverView</TabName>
                </Box>
              }
            />
            <Tab
              value='job'
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Calendar />
                  <TabName>Calendar</TabName>
                </Box>
              }
            />
            <Tab
              value='timeoff'
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Forum />
                  <TabName>Forms</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value='account'>
            <OverView />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='job'>
            {/* <Job></Job> */}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='info'>
            {/* <TabInfo /> */}
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default DashBoardMe;