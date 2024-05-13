"use client";
import { styled } from "@mui/material/styles";
import { Avatar, Badge, Box, Typography } from "@mui/material";
import React, { Fragment, useContext, useState } from "react";
import { HrContext } from "@/context/HrProvider";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import MuiTab from "@mui/material/Tab";

// ** Icons Imports
import AccountOutline from "mdi-material-ui/AccountOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";

import PersonalCard from "@/components/Personal/PersonalCard";
import Personal from "@/components/Personal/Personal";

import Job from "@/components/Job/Job";

// Day js
import dayjs from "dayjs";
import TimeOff from "../TimeOff/TimeOff";

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
    minWidth: 60,
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

const DashboardProfile = () => {
  const { user } = useContext(HrContext);
  const [value, setValue] = useState("account");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "flex-end" },
          gap: "20px",
        }}
      >
        <Badge
          overlap='circular'
          sx={{ cursor: "pointer" }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Avatar
            alt='John Doe'
            sx={{ width: 152, height: 152 }}
            src='/noavatar.png'
          />
        </Badge>
        <Box sx={{ marginBottom: "20px" }}>
          <Typography
            variant='h4'
            sx={{ fontSize: { xs: "24px", md: "32px" }, fontWeight: 700 }}
          >
            {user?.auth?.name}
          </Typography>
          <Typography variant='body2' sx={{ color: "rgb(108 134 159)" }}>
            {user?.auth?.designation?.title}
          </Typography>
        </Box>
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
                  <AccountOutline />
                  <TabName>Personal</TabName>
                </Box>
              }
            />
            <Tab
              value='job'
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LockOpenOutline />
                  <TabName>Job</TabName>
                </Box>
              }
            />
            <Tab
              value='timeoff'
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <InformationOutline />
                  <TabName>Time Off</TabName>
                </Box>
              }
            />
            <Tab
              value='documents'
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <InformationOutline />
                  <TabName>Documents</TabName>
                </Box>
              }
            />
            <Tab
              value='tasks'
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <InformationOutline />
                  <TabName>Tasks</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value='account'>
            <Personal />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='job'>
            <Job></Job>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='timeoff'>
            <TimeOff />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='documents'>
            {/* <TimeOff /> */}
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default DashboardProfile;
