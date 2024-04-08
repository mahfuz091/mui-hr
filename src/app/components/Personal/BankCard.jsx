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

import React, { useContext, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import axiosInstance from "@/lib/axios-instance";
import { HrContext } from "@/context/HrProvider";

const BankCard = () => {
  const { user, setControl, control, getUser } = useContext(HrContext);
  const [isEditing, setEditing] = useState(false);

  const handleBank = async (e) => {
    e.preventDefault();

    const account_name = e.target.accountName.value;
    const bank_name = e.target.bankName.value;
    const branch_name = e.target.branchName.value;
    const account_number = e.target.accountNumber.value;
    const routing_number = e.target.routingNumber.value;
    const bank = {
      account_name,
      bank_name,
      account_number,
      branch_name,
      routing_number,
    };
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.post(
        "/api/profile/bank-details",
        bank,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      console.log("bank", data);
      setControl(!control);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
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
          <form action='' onSubmit={handleBank}>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Account Name'
              label='Account Name'
              name='accountName'
              defaultValue={user?.auth?.bank_details?.account_name}
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Bank Name'
              label='Bank Name'
              name='bankName'
              defaultValue={user?.auth?.bank_details?.bank_name}
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Branch Name'
              label='Branch Name'
              name='branchName'
              defaultValue={user?.auth?.bank_details?.branch_name}
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder='Account No'
              label='Account No'
              name='accountNumber'
              defaultValue={user?.auth?.bank_details?.account_number}
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder={
                user?.auth?.bank_details?.routing_number || "Routing No"
              }
              label='Routing No'
              name='routingNumber'
              defaultValue={user?.auth?.bank_details?.routing_number || ""}
            ></TextField>

            <Box sx={{ textAlign: "right", marginTop: "10px" }}>
              <Button variant='contained' type='submit'>
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
            <Typography variant='body2'>Routing No</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant='body2'>
              {user?.auth?.bank_details?.account_name}
            </Typography>
            <Typography variant='body2'>
              {user?.auth?.bank_details?.bank_name}
            </Typography>
            <Typography variant='body2'>
              {user?.auth?.bank_details?.branch_name}
            </Typography>
            <Typography variant='body2'>
              {user?.auth?.bank_details?.account_number}
            </Typography>
            <Typography variant='body2'>
              {user?.auth?.bank_details?.routing_number}
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default BankCard;
