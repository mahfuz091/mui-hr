"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import { styled, alpha } from "@mui/material/styles";
import { HrContext } from "@/context/HrProvider";
import Link from "next/link";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const Directory = () => {
  const user = useContext(HrContext);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "22px", fontWeight: "600" }} variant='h3'>
          Directory
        </Typography>
        <Link href={"/users/sign-up"}>
          {" "}
          <Button variant='contained' sx={{ textTransform: "inherit" }}>
            Add employee
          </Button>
        </Link>
      </Box>
      <Search sx={{ marginTop: "20px" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search by name or email ...'
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      <Box sx={{ marginTop: "60px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Avatar
                    alt='John Doe'
                    sx={{ width: 40, height: 40 }}
                    src={user?.auth?.avatar}
                  ></Avatar>
                  <Box>
                    <Typography
                      variant='h4'
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      {user?.auth?.name || "Name"}
                    </Typography>
                    <Typography
                      variant='h4'
                      sx={{ fontSize: "14px", fontWeight: "400" }}
                    >
                      {user?.auth?.designation || "Developer"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Avatar
                    alt='John Doe'
                    sx={{ width: 40, height: 40 }}
                    src={user?.auth?.avatar}
                  ></Avatar>
                  <Box>
                    <Typography
                      variant='h4'
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      {user?.auth?.name || "Name"}
                    </Typography>
                    <Typography
                      variant='h4'
                      sx={{ fontSize: "14px", fontWeight: "400" }}
                    >
                      {user?.auth?.designation || "Developer"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Avatar
                    alt='John Doe'
                    sx={{ width: 40, height: 40 }}
                    src={user?.auth?.avatar}
                  ></Avatar>
                  <Box>
                    <Typography
                      variant='h4'
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      {user?.auth?.name || "Name"}
                    </Typography>
                    <Typography
                      variant='h4'
                      sx={{ fontSize: "14px", fontWeight: "400" }}
                    >
                      {user?.auth?.designation || "Developer"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Directory;
