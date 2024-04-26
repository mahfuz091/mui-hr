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
import { Fragment, useContext } from "react";
import dayjs from "dayjs";
import axiosInstance from "@/lib/axios-instance";

const LeaveRecords = () => {
  const {
    userLeaves,
    leaves,
    leaveControl,
    setLeaveControl,
    getMyLeaveBalance,
    getUserLeaves,
  } = useContext(HrContext);
  // console.log(userLeaves);
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
              {userLeaves?.leaveTypes?.map((userLeave) => (
                <TableRow key={userLeave.id}>
                  <TableCell>
                    {
                      leaves?.leaveTypes?.find(
                        (leave) => leave.id === userLeave?.leave_type_id
                      )?.name
                    }
                  </TableCell>
                  <TableCell>
                    {/* {userLeave.start_date} to {userLeave.end_date} */}
                    {dayjs(userLeave.start_date).format("DD MMM, YYYY")} to{" "}
                    {dayjs(userLeave.end_date).format("DD MMM, YYYY")}
                  </TableCell>
                  <TableCell>{userLeave.days_taken}</TableCell>
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
                      {userLeave.status}
                    </Box>
                  </TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>
                    {userLeave.status === "approved" ? (
                      ""
                    ) : (
                      <Button
                        sx={{
                          background: "#f6a95c",
                          color: "white",
                          textTransform: "lowercase",
                          "&:hover": {
                            background: "#20c5ca", // Change background color on hover
                            // Add any other hover styles here
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
