"use client";
import React, { useContext } from "react";
import {
  Box,
  Link,
  Button,
  Card,
  TextField,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { HrContext } from "@/context/HrProvider";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PhoneIcon from "@mui/icons-material/Phone";

const SideContactCard = ({ user }) => {
  // const { user, contact } = useContext(HrContext);
  // console.log(contact);
  return (
    <Card>
      <Box sx={{ padding: "20px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Box
            sx={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#EDF2F7",
            }}
          >
            <EmailIcon sx={{ fontSize: "18px" }} color='primary' />
          </Box>{" "}
          <Link sx={{ textDecoration: "none" }} href={`mailto:${user?.email}`}>
            {user?.email}
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#EDF2F7",
            }}
          >
            <LinkedInIcon sx={{ fontSize: 18 }} color='primary' />
          </Box>{" "}
          <Link
            sx={{ textDecoration: "none" }}
            target='blank'
            href={user?.socials?.linkedin}
          >
            {user?.name}
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#EDF2F7",
            }}
          >
            <PhoneIcon sx={{ fontSize: 18 }} color='primary' />
          </Box>{" "}
          <Link
            sx={{ textDecoration: "none" }}
            href={`tel:${user?.contacts?.work_phone_number}`}
          >
            {user?.contacts?.work_phone_number}
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#EDF2F7",
            }}
          >
            <PhoneAndroidIcon sx={{ fontSize: 18 }} color='primary' />
          </Box>{" "}
          <Link
            sx={{ textDecoration: "none" }}
            href={`tel:${user?.contacts?.mobile_number}`}
          >
            {user?.contacts?.mobile_number}
          </Link>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ padding: "20px" }}>
        <Typography>Hired On</Typography>
        <Typography>04.08.2023</Typography>
      </Box>
    </Card>
  );
};

export default SideContactCard;
