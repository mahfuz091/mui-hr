"use client";
import { HrContext } from "@/context/HrProvider";
import { Box, Button, Card, TextField, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MdEdit } from "react-icons/md";
import axiosInstance from "@/lib/axios-instance";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

const ContactCard = ({ contact, getUser, userId }) => {
  const { loggedUser } = useContext(HrContext);
  const [isEditing, setEditing] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  // const [contact, setContact] = useState(null);
  // console.log(contact);

  // useEffect(() => {
  //   getContact();
  // }, [user]);

  const handleContact = async (e) => {
    e.preventDefault();

    const mobile_number = e.target.mobile_number.value;
    const work_phone_number = e.target.work_phone_number.value;
    const skype = e.target.skype.value;
    const discord = e.target.discord.value;

    const contact = {
      mobile_number,
      work_phone_number,
      skype,
      discord,
    };

    try {
      const response = await axiosSecure.post("/api/profile/contacts", contact);
      const data = response.data.data;

      // setControl(!control);
      getUser({ id: userId });
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
        <Typography variant='h6'>Contact</Typography>
        {loggedUser?.id === userId
          ? // If the user is not in editing mode, display the Edit button
            !isEditing && (
              <Button
                variant='outlined'
                sx={{ color: "#000", display: "flex", gap: "5px" }}
                onClick={() => setEditing(true)}
              >
                <MdEdit /> {/* Icon for the edit button */}
                Edit
              </Button>
            )
          : null}
      </Box>
      {isEditing ? (
        <Box sx={{ padding: "20px" }}>
          <form action='' onSubmit={handleContact}>
            <TextField
              fullWidth
              margin='normal'
              placeholder={contact?.mobile_number || "Mobile No"}
              label='Mobile No'
              defaultValue={contact?.mobile_number}
              name='mobile_number'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder={contact?.work_phone_number || "Work Phone No"}
              label='Work Phone No'
              defaultValue={contact?.work_phone_number}
              name='work_phone_number'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder={contact?.skype || "Skype Username"}
              label='Skype Username'
              defaultValue={contact?.skype}
              name='skype'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder={contact?.discord || "Discord Username"}
              label='Discord Username'
              defaultValue={contact?.discord}
              name='discord'
            ></TextField>
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
              <Typography variant='body2'>Mobile No</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='body2'>{contact?.mobile_number}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "5px 20px" }} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2'>Work Phone No</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='body2'>
                {contact?.work_phone_number}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "5px 20px" }} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2'>Skype Username</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='body2'>{contact?.skype}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: "5px 20px" }} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Typography variant='body2'>Discord Username</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='body2'>{contact?.discord}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Card>
  );
};

export default ContactCard;
