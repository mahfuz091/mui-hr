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
  Link,
  Grid,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import axiosInstance from "@/lib/axios-instance";
import { HrContext } from "@/context/HrProvider";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

const SocialCard = ({ user, getUser }) => {
  const [isEditing, setEditing] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  // console.log(isEditing);
  const { loggedUser } = useContext(HrContext);
  // console.log(user);
  const handleSocial = async (e) => {
    e.preventDefault();
    const facebook = e.target.facebook.value;
    const linkedin = e.target.linkedin.value;
    const social = { facebook, linkedin };
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosSecure.post("/api/profile/social", social);
      const data = response.data.data;
      console.log(data);
      // setControl(!control);
      getUser({ id: user.id });
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
        <Typography variant='h6'>Social</Typography>
        {loggedUser?.id === user?.id
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
          <form action='' onSubmit={handleSocial}>
            <TextField
              fullWidth
              margin='normal'
              placeholder={user?.socials?.facebook || "facebook url"}
              label='Facebook Url'
              defaultValue={user?.socials?.facebook || ""}
              name='facebook'
            ></TextField>
            <TextField
              fullWidth
              margin='normal'
              placeholder={user?.socials?.linkedin || "linkedin url"}
              label='Linkedin Url'
              defaultValue={user?.socials?.linkedin || ""}
              name='linkedin'
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
        <Grid container sx={{ padding: "20px" }}>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography variant='body2'>Facebook Url</Typography>
              <Typography variant='body2'>Linkedin Url</Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Link sx={{ maxWidth: "100%" }} href={user?.socials?.facebook}>
                {user?.socials?.facebook}
              </Link>
              <Link sx={{ maxWidth: "100%" }} href={user?.socials?.linkedin}>
                {user?.socials?.linkedin}
              </Link>
            </Box>
          </Grid>
        </Grid>
        // <Box sx={{ padding: "20px", display: "flex", gap: "200px" }}>
        //   <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        //     <Typography variant='body2'>Facebook Url</Typography>
        //     <Typography variant='body2'>Linkedin Url</Typography>
        //   </Box>
        //   <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        //     <Link href={user?.auth?.socials?.facebook}>
        //       {user?.auth?.socials?.facebook}
        //     </Link>
        //     <Link href={user?.auth?.socials?.linkedin}>
        //       {user?.auth?.socials?.linkedin}
        //     </Link>
        //   </Box>
        // </Box>
      )}
    </Card>
  );
};

export default SocialCard;
