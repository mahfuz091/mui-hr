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

const SocialCard = () => {
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
        <Typography variant='h6'>Social</Typography>
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
              placeholder='Facebook Url'
              label='Facebook Url'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Linkedin Url'
              label='Linkedin Url'
            ></TextField>

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
            <Typography variant='body2'>Facebook Url</Typography>
            <Typography variant='body2'>Linkedin Url</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant='body2'>Employee Id</Typography>
            <Typography variant='body2'>Name</Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default SocialCard;
