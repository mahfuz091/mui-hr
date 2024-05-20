"use client";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupsIcon from "@mui/icons-material/Groups";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Core = () => {
  const router = useRouter();
  return (
    <Box>
      <Typography
        sx={{ fontSize: "20px", fontWeight: "700", marginBottom: "10px" }}
        varient='h5'
      >
        Core
      </Typography>
      <Box sx={{ padding: "20px", background: "#fff", borderRadius: "10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Link
              style={{ textDecoration: "none", color: "#1976d2" }}
              href='settings/designations'
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <BusinessCenterIcon />{" "}
                <Box sx={{ color: "#000" }} component='span'>
                  Designations
                </Box>
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{ textDecoration: "none", color: "#1976d2" }}
              href='settings/departments'
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <GroupsIcon />{" "}
                <Box sx={{ color: "#000" }} component='span'>
                  Departments
                </Box>
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              style={{ textDecoration: "none", color: "#1976d2" }}
              href='settings/skills'
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <GraphicEqIcon />{" "}
                <Box sx={{ color: "#000" }} component='span'>
                  Skills
                </Box>
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Core;
