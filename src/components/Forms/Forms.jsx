import {
  Box,
  Button,
  Menu,
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import no_record from "../../assets/images/no-record.svg";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

import toast from "react-hot-toast";
import TableRows from "./TableRows";
import dayjs from "dayjs";
import { HrContext } from "@/context/HrProvider";

const Forms = () => {
  const [axiosSecure] = useAxiosSecure();

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const { loggedUser } = useContext(HrContext);
  console.log(leaveRequests);
  const getAllLeaves = async (id) => {
    const params = {
      year: year,
      perPage: perPage,
      page: page,
      paginate: true,
      manager_id: loggedUser.id,
    };
    try {
      const response = await axiosSecure.get("/api/leaves", { params });
      setLeaveRequests(response.data.data.leaveRequests);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveApprove = async (id) => {
    const status = {
      status: "approved",
      approval_level: "recommended",
    };
    try {
      const response = await axiosSecure.post(
        `api/leaves/approvals/${id}`,
        status
      );
      console.log(response);
      toast.success(response.data.message[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const filterLeave = Array.isArray(leaveRequests)
    ? leaveRequests.filter(
        (leaveRequest) =>
          leaveRequest?.user?.direct_manager_id === loggedUser.id
      )
    : [];

  console.log("filter", filterLeave);

  useEffect(() => {
    getAllLeaves(28);
  }, []);
  return (
    <Box sx={{ marginTop: "15px" }}>
      <Typography>My Forms</Typography>
      <Button>Requiring My Approvals</Button>
      <Box sx={{ background: "#fff", borderRadius: "10px", padding: "15px" }}>
        {leaveRequests.length !== 0 ? (
          <Box>
            <Fragment>
              <Paper
                sx={{
                  maxWidth: "100%",
                  margin: "20px auto",

                  boxShadow: "10px 12px 60px #00000014",
                }}
              >
                <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ background: "#FBFCFE" }}>
                        <TableCell>Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Requested Days</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leaveRequests?.items?.map((leaveRequest) => (
                        <TableRows
                          key={leaveRequest.id}
                          leaveRequest={leaveRequest}
                        ></TableRows>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Fragment>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <img src={no_record.src} alt='' />
            <Typography>No Records Found</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Forms;
