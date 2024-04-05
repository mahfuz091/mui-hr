"use client";
import { Box, Button, Card, TextField, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

const ContactCard = () => {
  const [isEditing, setEditing] = useState(false);
  return (
    <Card
      sx={{
        boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          background: "#fbfcfe",
          padding: "20px",
          borderBottom: "1px solid #dce5ef",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant='h6'>Contact</Typography>
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
            <TextField
              fullWidth
              margin='normal'
              placeholder='Mobile No'
              label='Mobile No'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Work Phone No'
              label='Work Phone No'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Skype Username'
              label='Skype Username'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Discord Username'
              label='Discord Username'
            ></TextField>
            <Box sx={{ textAlign: "right", marginTop: "10px" }}>
              <Button variant='contained' onClick={() => setEditing(false)}>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      ) : (
        <Grid container sx={{ padding: "20px" }}>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography variant='body2'>Mobile No</Typography>
              <Typography variant='body2'>Work Phone No</Typography>
              <Typography variant='body2'>Skype Username</Typography>
              <Typography variant='body2'>Discord Username</Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography variant='body2'>Mobile No</Typography>
              <Typography variant='body2'>Work Phone No</Typography>
              <Typography variant='body2'>Skype Username</Typography>
              <Typography variant='body2'>Discord Username</Typography>
            </Box>
          </Grid>
        </Grid>
        // <Box sx={{ padding: "20px", display: "flex", gap: "200px" }}>
        //   <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        //     <Typography variant='body2'>Mobile No</Typography>
        //     <Typography variant='body2'>Work Phone No</Typography>
        //     <Typography variant='body2'>Skype Username</Typography>
        //     <Typography variant='body2'>Discord Username</Typography>
        //   </Box>
        //   <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        //     <Typography variant='body2'>Mobile No</Typography>
        //     <Typography variant='body2'>Work Phone No</Typography>
        //     <Typography variant='body2'>Skype Username</Typography>
        //     <Typography variant='body2'>Discord Username</Typography>
        //   </Box>
        // </Box>
      )}
    </Card>
  );
};

export default ContactCard;
