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

import PersonalCard from "@/app/components/Personal/PersonalCard";
import Personal from "@/app/components/Personal/Personal";

// Axios

import axiosInstance from "@/lib/axios-instance";
import Job from "@/app/components/Job/Job";

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
  const [value, setValue] = useState("account");
  const [gender, setGender] = useState("");
  // console.log(gender);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { user, setEditing, control, setControl } = useContext(HrContext);
  const designation_id = user?.auth?.designation_id;
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const date_of_birth = e.target.date_of_birth.value;
    const user = { name, email, date_of_birth, gender, designation_id };
    const token = localStorage.getItem("accessToken");

    // console.log("1", user, token);

    try {
      const response = await axiosInstance.post("/api/profile", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      console.log(data);

      setControl(!control);
      setEditing(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log(user);
  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
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
          <Typography variant='h4'>{user?.auth?.name}</Typography>
          <Typography variant='body2'>
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
            <Personal
              user={user}
              handleUpdateProfile={handleUpdateProfile}
              setGender={setGender}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='job'>
            <Job></Job>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='info'>
            {/* <TabInfo /> */}
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default DashboardProfile;
