import { HrContext } from "@/context/HrProvider";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TableContainer,
  Button,
} from "@mui/material";
import { Fragment, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import axiosInstance from "@/lib/axios-instance";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

const LeaveRecords = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    userLeaves,
    leaves,
    leaveControl,
    setLeaveControl,
    getMyLeaveBalance,
    getUserLeaves,
  } = useContext(HrContext);

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  console.log("U", leaveRequests);
  const getAllLeaves = async (id) => {
    const params = {
      year: year,
      perPage: perPage,
      page: page,
      paginate: true,
    };
    try {
      const response = await axiosSecure.get("/api/leaves", { params });
      setLeaveRequests(response.data.data.leaveRequests);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllLeaves();
  }, []);
  const handleLeaveDelete = async (id) => {
    // console.log(id);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.delete(`/api/leaves/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      // console.log(data);
      getUserLeaves();
      // setLeaveControl(!leaveControl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <Paper sx={{ padding: "20px" }}>
        <Typography variant='h6' sx={{ padding: "20px 0 " }} color='inherit'>
          My Leave Applied Records
        </Typography>
        <TableContainer component={Paper} sx={{}}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ background: "#FBFCFE" }}>
                <TableCell>Leave Type</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Total Days</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRequests?.items?.map((userLeave) => (
                <TableRow key={userLeave.id}>
                  <TableCell>
                    {/* {
                      leaves?.leaveRequests?.find(
                        (leave) => leave.id === userLeave?.leave_type_id
                      )?.name
                    } */}
                    {userLeave.leave_type.name}
                  </TableCell>
                  <TableCell>
                    {/* {userLeave.start_date} to {userLeave.end_date} */}
                    {dayjs(userLeave.start_date).format("DD MMM, YYYY")} to
                    {dayjs(userLeave.end_date).format("DD MMM, YYYY")}
                  </TableCell>
                  <TableCell>{userLeave.requested_days}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        padding: "5px",
                        borderRadius: "5px",
                        display: "inline-block",
                        color: "#ffff",
                        background:
                          userLeave.status === "pending"
                            ? "#f6a95c"
                            : "#20c5ca",
                        textTransform: "capitalize",
                      }}
                    >
                      {userLeave?.approvals?.length === 0
                        ? "pending"
                        : userLeave?.approvals?.[0]?.approval_level
                        ? userLeave?.approvals?.length === 2
                          ? userLeave?.approvals?.[1]?.approval_level ===
                            "final"
                            ? "approved"
                            : ""
                          : "unknown"
                        : "unknown"}
                    </Box>
                  </TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>
                    {(userLeave?.approvals?.length === 0
                      ? "pending"
                      : userLeave?.approvals?.[0]?.approval_level
                      ? userLeave?.approvals?.length === 2
                        ? userLeave?.approvals?.[1]?.approval_level === "final"
                          ? "approved"
                          : ""
                        : "unknown"
                      : "unknown") === "approved" ? (
                      ""
                    ) : (
                      <Button
                        sx={{
                          background: "#f6a95c",
                          color: "white",
                          textTransform: "lowercase",
                          "&:hover": {
                            background: "#20c5ca",
                          },
                        }}
                        onClick={() => handleLeaveDelete(userLeave.id)}
                      >
                        Withdraw
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};

export default LeaveRecords;
