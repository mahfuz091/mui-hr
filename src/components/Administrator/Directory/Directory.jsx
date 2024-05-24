"use client";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

import { styled, alpha } from "@mui/material/styles";
import { HrContext } from "@/context/HrProvider";
import Link from "next/link";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
// import Pagination from "@/components/Pagination/Pagination";

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
  const [axiosSecure] = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(21);
  const [totalQty, setTotalQty] = useState(0);
  console.log(users);

  const getAllUsers = async (perPage, page) => {
    setIsLoading(true);
    const params = {
      paginate: true,
      page: page,
      perPage: perPage,
    };
    try {
      const response = await axiosSecure.get("/api/users", { params });

      setUsers(response.data.data.users);
      setTotalQty(response.data.data.users.total);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const startIdx = (pageNumber - 1) * perPage + 1;
  const endIdx = Math.min(pageNumber * perPage, totalQty);
  console.log(endIdx);

  useEffect(() => {
    getAllUsers(perPage, pageNumber);
  }, [pageNumber]);

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

      <Box sx={{ marginTop: "15px" }}>
        <Typography>
          Displaying {startIdx} - {endIdx} of {users?.total} in total
        </Typography>
      </Box>

      <Box sx={{ marginTop: "15px" }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : null}

        <Grid container spacing={2}>
          {users?.items?.map((user) => (
            <Grid key={user.id} item xs={4}>
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
                      <Link href={`employees/${user?.id}`}>
                        <Typography
                          variant='h4'
                          sx={{ fontSize: "16px", fontWeight: "600" }}
                        >
                          {user?.name || "Name"}
                        </Typography>
                      </Link>
                      <Typography
                        variant='h4'
                        sx={{ fontSize: "14px", fontWeight: "400" }}
                      >
                        {user?.designation?.title || "Developer"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <Pagination
        currentPage={pageNumber}
        totalQty={totalQty}
        perPage={perPage}
        onPageChange={setPageNumber}
      /> */}
      <Stack spacing={2} alignItems='self-start' marginTop={2}>
        <Pagination
          count={Math.ceil(totalQty / perPage)}
          page={pageNumber}
          onChange={handlePageChange}
          color='primary'
          shape='rounded'
        />
      </Stack>
    </Box>
  );
};

export default Directory;
