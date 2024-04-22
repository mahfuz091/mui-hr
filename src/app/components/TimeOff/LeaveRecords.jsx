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
} from "@mui/material";
import { Fragment, useContext } from "react";
import dayjs from "dayjs";

const LeaveRecords = () => {
  const { userLeaves, leaves } = useContext(HrContext);

  console.log(leaves);
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
                        (leave) => leave.id === userLeave.id
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
                      }}
                    >
                      {userLeave.status}
                    </Box>
                  </TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell>Leave Type</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Total Days</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};

export default LeaveRecords;
