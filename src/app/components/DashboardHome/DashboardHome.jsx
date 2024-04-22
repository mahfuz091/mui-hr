"use client";
import { HrContext } from "@/context/HrProvider";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Modal,
  IconButton,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  List,
  ListItem,
  Grid,
  TextField,
} from "@mui/material";
import NordicWalkingIcon from "@mui/icons-material/NordicWalking";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "@/lib/axios-instance";

//
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { differenceInDays } from "date-fns";
import TodoCard from "../TodoCard/TodoCard";
import TimeOffReq from "../TimeOffReq/TimeOffReq";

// Style
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#fff",
  border: "1px solid #91A4B7",
  boxShadow: "0px 6px 16px rgba(9, 8, 61, 0.12)",
  borderRadius: "10px",
};

const DashboardHome = () => {
  const { user, setControl, control } = useContext(HrContext);
  const [greet, setGreet] = useState("");

  // console.log(leaveTypes);

  // console.log(`Difference in days: ${difference}`);

  useEffect(() => {
    const myDate = new Date();
    const hrs = myDate.getHours();
    // console.log(hrs);

    let greeting;

    if (hrs >= 4 && hrs < 12) {
      greeting = "Good Morning";
    } else if (hrs >= 12 && hrs <= 16) {
      greeting = "Good Afternoon";
    } else if (hrs >= 16 && hrs <= 24) {
      greeting = "Good Evening";
    } else {
      greeting = "Good Night";
    }

    setGreet(greeting);
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Avatar
          alt='John Doe'
          sx={{ width: 60, height: 60 }}
          src={user?.auth?.avatar}
        ></Avatar>
        <Typography variant='h1' sx={{ fontSize: "24px", fontWeight: "700" }}>
          {greet}
        </Typography>
        <Typography variant='h1' sx={{ fontSize: "24px", fontWeight: "700" }}>
          {user?.auth?.name || "Name"}
        </Typography>
      </Box>
      <TimeOffReq />
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <TodoCard></TodoCard>
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
