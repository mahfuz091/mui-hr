import React, { Fragment, useContext } from "react";
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

const LeaveSummeryTable = () => {
  const { userLeaves, myLeaveBalance } = useContext(HrContext);
  console.log("userLeaves", myLeaveBalance);
  return (
    <Fragment>
      <Paper
        sx={{
          maxWidth: "60%",
          margin: "20px auto",

          boxShadow: "10px 12px 60px #00000014",
        }}
      >
        <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ background: "#FBFCFE" }}>
                <TableCell>Type</TableCell>
                <TableCell>Yearly Balance</TableCell>
                <TableCell>Opening Balance</TableCell>
                <TableCell>Availed</TableCell>
                <TableCell>Closing Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myLeaveBalance?.leaveTypes?.map((userLeave) => (
                <TableRow key={userLeave.id}>
                  <TableCell>{userLeave?.name}</TableCell>
                  <TableCell>{userLeave.total_allotment}</TableCell>
                  <TableCell> {userLeave.total_allotment}</TableCell>
                  <TableCell>{userLeave.balance}</TableCell>
                  <TableCell>{userLeave.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Fragment>
  );
};

export default LeaveSummeryTable;
