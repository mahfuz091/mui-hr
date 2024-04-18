"use client";
import { HrContext } from "@/context/HrProvider";
import { Box, Avatar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

const DashboardHome = () => {
  const { user } = useContext(HrContext);
  const [greet, setGreet] = useState("");

  useEffect(() => {
    const myDate = new Date();
    const hrs = myDate.getHours();

    let greeting;

    if (hrs < 12) {
      greeting = "Good Morning";
    } else if (hrs >= 12 && hrs <= 17) {
      greeting = "Good Afternoon";
    } else if (hrs >= 17 && hrs <= 24) {
      greeting = "Good Evening";
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
    </Box>
  );
};

export default DashboardHome;
