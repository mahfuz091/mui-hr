"use client";
import { HrContext } from "@/context/HrProvider";
import { Key } from "@mui/icons-material";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

const AccountEdit = () => {
  const [open, setOpen] = useState(false);
  const { user, getUser } = useContext(HrContext);
  // console.log(user);
  useEffect(() => {
    getUser();
  }, []);
  const handleSubmit = () => {};
  return (
    <Box
      sx={{
        background: "#FFF",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography sx={{ fontSize: "20px", padding: "10px 0" }} variant='h5'>
        Account
      </Typography>
      <Divider></Divider>
      <Typography sx={{ fontSize: "20px", padding: "10px 0" }} variant='h5'>
        Password
      </Typography>

      {open ? (
        <>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              id='outlined-required'
              margin='normal'
              label='Email'
              type='email'
              defaultValue={user?.auth?.email}
              //   onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              margin='normal'
              label='New Password'
              type='password'
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Confirm Password'
              type='password'
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              //   onClick={handleLogin}
              sx={{ marginTop: "20px" }}
            >
              Sign In
            </Button>
            <Button
              sx={{ marginTop: "20px", marginLeft: "20px" }}
              variant='outlined'
            >
              Cancel
            </Button>
          </form>
        </>
      ) : (
        <>
          <Button
            onClick={() => setOpen(true)}
            variant='contained'
            sx={{ display: "flex", gap: "8px", margin: "10px 0" }}
          >
            <Key></Key>Change Password
          </Button>
        </>
      )}
    </Box>
  );
};

export default AccountEdit;
