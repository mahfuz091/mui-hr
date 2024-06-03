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
  const [designations, setDesignations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [paginate, setpaginate] = useState(true);
  console.log("Fil", filteredUsers);
  console.log("users", users);

  // console.log(designations);
  const getDesignations = async () => {
    try {
      const response = await axiosSecure.get("/api/designations");
      const data = response.data;
      setDesignations(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async (perPage, page, search, paginate) => {
    setIsLoading(true);
    setpaginate(true);
    setUsers([]);
    const params = {
      paginate: true,

      page: page,
      perPage: perPage,
    };

    try {
      const response = await axiosSecure.get("/api/users", { params });

      setUsers(response.data.data?.users?.items);
      setTotalQty(response.data.data.users.total);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllSearchUsers = async (perPage, page, search, paginate) => {
    setIsLoading(true);
    setpaginate(false);
    setUsers([]);
    const params = {
      paginate: true,
      search: search,
      page: page,
      perPage: perPage,
    };

    try {
      const response = await axiosSecure.get("/api/users", { params });
      console.log("ful", response);

      setFilteredUsers(response.data.data?.users?.items);
      setTotalQty(response.data.data.users.total);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSearch = (searchTerm) => {
  //   setSearchTerm(searchTerm);
  //   if (searchTerm === "") {
  //     setFilteredUsers(users);
  //   } else {
  //     const filteredResults = users?.items?.filter(
  //       (user) =>
  //         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         user.email.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredUsers({ ...users, items: filteredResults });
  //   }
  // };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setpaginate(false);
    if (searchTerm === "") {
      setpaginate(true);
      getAllUsers(perPage, pageNumber, searchTerm, paginate);
    } else {
      setpaginate(false);
      getAllSearchUsers(perPage, pageNumber, searchTerm, paginate);
      console.log("SEARCH CLICK");
    }
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const startIdx = (pageNumber - 1) * perPage + 1;
  const endIdx = Math.min(pageNumber * perPage, totalQty);
  // console.log(endIdx);

  useEffect(() => {
    getAllUsers(perPage, pageNumber, searchTerm, paginate);
    getDesignations();
  }, [pageNumber]);

  const displayUsers = searchTerm === "" ? users : filteredUsers;
  // const displayUsers = users;

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
        <Link href={"/users/sign_up"}>
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
          onChange={(e) => handleSearch(e.target.value)}
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
          {displayUsers?.map((user) => (
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
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        href={`employees/${user?.id}`}
                      >
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
                        {
                          designations?.data?.designations?.find(
                            (d) => d.id === user?.designation_id
                          )?.title
                        }
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
