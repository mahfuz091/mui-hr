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

const BankCard = () => {
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
        <Typography variant='h6'>Bank Details</Typography>
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
              placeholder='Account Name'
              label='Account Name'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Bank Name'
              label='Bank Name'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Branch Name'
              label='Branch Name'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Account No'
              label='Account No'
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
            <Typography variant='body2'>Account Name</Typography>
            <Typography variant='body2'>Bank Name</Typography>
            <Typography variant='body2'>Branch Name</Typography>
            <Typography variant='body2'>Account No</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant='body2'>Account Name</Typography>
            <Typography variant='body2'>Bank Name</Typography>
            <Typography variant='body2'>Branch Name</Typography>
            <Typography variant='body2'>Account No</Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default BankCard;
