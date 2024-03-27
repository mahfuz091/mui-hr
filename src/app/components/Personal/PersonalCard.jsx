"use client";
import {
  Box,
  Button,
  Card,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

const PersonalCard = () => {
  const [isEditing, setEditing] = useState(false);
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
          <form action=''>
            <FormControl fullwidth>
              <Typography>Employee Id</Typography>
            </FormControl>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Name'
              label='Name'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Email'
              label='Email'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Date of birth'
              label='Date of birth'
            ></TextField>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={age}
                label='Gender'
                // onChange={handleChange}
              >
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ textAlign: "right", marginTop: "10px" }}>
              <Button variant='contained' onClick={() => setEditing(false)}>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      ) : (
        <Box sx={{ padding: "20px", display: "flex", gap: "200px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant='body2'>Employee Id</Typography>
            <Typography variant='body2'>Name</Typography>
            <Typography variant='body2'>Email</Typography>
            <Typography variant='body2'>Date Of Birth</Typography>
            <Typography variant='body2'>Gender</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant='body2'>Employee Id</Typography>
            <Typography variant='body2'>Name</Typography>
            <Typography variant='body2'>Email</Typography>
            <Typography variant='body2'>Date Of Birth</Typography>
            <Typography variant='body2'>Gender</Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default PersonalCard;
