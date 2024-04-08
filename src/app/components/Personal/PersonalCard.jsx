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
import { MdEdit } from "react-icons/md";

const PersonalCard = ({ handleUpdateProfile, setGender }) => {
  const { user, isEditing, setEditing } = useContext(HrContext);
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
            <FormControl fullwidth>
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
            <TextField
              fullWidth
              margin='normal'
              placeholder={user?.auth?.date_of_birth}
              label='Date of birth'
              defaultValue={user?.auth?.date_of_birth}
              name='date_of_birth'
            ></TextField>
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
        <Grid container sx={{ padding: "20px" }}>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography variant='body2'>Employee Id</Typography>
              <Typography variant='body2'>Name</Typography>
              <Typography variant='body2'>Email</Typography>
              <Typography variant='body2'>Date Of Birth</Typography>
              <Typography variant='body2'>Gender</Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography variant='body2'>Employee Id</Typography>
              <Typography variant='body2'>{user?.auth?.name}</Typography>
              <Typography variant='body2'>{user?.auth?.email}</Typography>
              <Typography variant='body2'>
                {user?.auth?.date_of_birth}
              </Typography>
              <Typography variant='body2'>Gender</Typography>
            </Box>
          </Grid>
        </Grid>
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
