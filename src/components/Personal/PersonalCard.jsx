"use client";
import { HrContext } from "@/context/HrProvider";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { MdEdit, MdCalendarMonth } from "react-icons/md";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Axios

import axiosInstance from "@/lib/axios-instance";

const PersonalCard = () => {
  const { user, isEditing, setEditing, getUser } = useContext(HrContext);
  const date_of_birth = user?.auth?.date_of_birth;
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(dayjs);

  const date = `${dateOfBirth?.$y}-${(dateOfBirth?.$M + 1)
    .toString()
    .padStart(2, "0")}-${dateOfBirth?.$D.toString().padStart(2, "0")}`;

  const designation_id = user?.auth?.designation_id;
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const date_of_birth = date;
    const user = { name, email, date_of_birth, gender, designation_id };
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axiosInstance.post("/api/profile", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      // console.log(data);
      getUser();
      // setControl(!control);
      setEditing(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log(user);

  // console.log("user", user);
  return (
    <Card
      sx={{
        boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
      }}
    >
      <Box
        sx={{
          background: "#fbfcfe",
          padding: "20px",
          borderBottom: "1px solid #dce5ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant='h6'>Personal</Typography>
        {isEditing ? null : (
          <Button
            variant='outlined'
            sx={{ color: "#000", display: "flex", gap: "5px" }}
            onClick={() => setEditing(true)}
          >
            <MdEdit></MdEdit> Edit
          </Button>
        )}
      </Box>
      {isEditing ? (
        <Box sx={{ padding: "20px" }}>
          <form action='' onSubmit={handleUpdateProfile}>
            <FormControl fullWidth>
              <Typography>Employee Id</Typography>
            </FormControl>
            <TextField
              fullWidth
              margin='normal'
              placeholder={user?.auth?.name}
              label='Name'
              name='name'
              defaultValue={user?.auth?.name}
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder={user?.auth?.email}
              name='email'
              label='Email'
              defaultValue={user?.auth?.email}
            ></TextField>
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker"]}
                sx={{ position: "relative" }}
              >
                <MobileDatePicker
                  views={["year", "month", "day"]}
                  sx={{ width: "100%" }}
                  fullWidth
                  label='Date Of Birth'
                  defaultValue={dayjs(date_of_birth)}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                />
                <Box
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "20px",
                    marginTop: "0 !important",
                    fontSize: "24px",
                  }}
                >
                  <MdCalendarMonth sx={{ fontSize: "24px" }} />
                </Box>
              </DemoContainer>
            </LocalizationProvider>
            {/* <TextField
              fullWidth
              margin='normal'
              placeholder={user?.auth?.date_of_birth}
              label='Date of birth'
              defaultValue={user?.auth?.date_of_birth}
              name='date_of_birth'
            ></TextField> */}
            <FormControl fullWidth margin='normal'>
              <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={age}
                label='Gender'
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button onClick={() => setEditing(false)} variant='outlined'>
                Cancel
              </Button>
              <Button variant='contained' type='submit'>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      ) : (
        <Box>
          <Grid
            container
            sx={{ padding: { xs: "5px 20px", md: "20px 20px 0 20px" } }}
            spacing={1}
          >
            <Grid item xs={12} sm={4}>
              <Typography variant='body2'>Employee Id</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='body2'>Employee Id</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "5px 20px" }} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2'>Name</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='body2'>{user?.auth?.name}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "5px 20px" }} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2'>Email</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='body2'>{user?.auth?.email}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "5px 20px" }} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2'>Date Of Birth</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='body2'>
                {user?.auth?.date_of_birth}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "5px 20px" }} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2'>Gender</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='body2'>Gender</Typography>
            </Grid>
          </Grid>
        </Box>
        // <Grid container sx={{ padding: "20px" }}>
        //   <Grid item xs={4}>
        //     <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        //       <Typography variant='body2'>Employee Id</Typography>
        //       <Typography variant='body2'>Name</Typography>
        //       <Typography variant='body2'>Email</Typography>
        //       <Typography variant='body2'>Date Of Birth</Typography>
        //       <Typography variant='body2'>Gender</Typography>
        //     </Box>
        //   </Grid>
        //   <Grid item xs={8}>
        //     <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        //       <Typography variant='body2'>Employee Id</Typography>
        //       <Typography variant='body2'>{user?.auth?.name}</Typography>
        //       <Typography variant='body2'>{user?.auth?.email}</Typography>
        //       <Typography variant='body2'>
        //         {user?.auth?.date_of_birth}
        //       </Typography>
        //       <Typography variant='body2'>Gender</Typography>
        //     </Box>
        //   </Grid>
        // </Grid>
        // <Box
        //   sx={{
        //     padding: "20px",
        //     display: "flex",
        //     justifyContent: "space-between",
        //   }}
        // >
        //   <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        //     <Typography variant='body2'>Employee Id</Typography>
        //     <Typography variant='body2'>Name</Typography>
        //     <Typography variant='body2'>Email</Typography>
        //     <Typography variant='body2'>Date Of Birth</Typography>
        //     <Typography variant='body2'>Gender</Typography>
        //   </Box>
        //   <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        //     <Typography variant='body2'>Employee Id</Typography>
        //     <Typography variant='body2'>{user?.auth?.name}</Typography>
        //     <Typography variant='body2'>{user?.auth?.email}</Typography>
        //     <Typography variant='body2'>{user?.auth?.date_of_birth}</Typography>
        //     <Typography variant='body2'>Gender</Typography>
        //   </Box>
        // </Box>
      )}
    </Card>
  );
};

export default PersonalCard;
