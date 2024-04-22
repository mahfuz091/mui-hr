import React, { Fragment } from "react";
import LeaveRecords from "./LeaveRecords";
import { Box } from "@mui/material";
import JobCard from "../Job/JobCard";
import LeaveSummery from "./LeaveSummery";

const TimeOff = () => {
  return (
    <Box sx={{ padding: "20px 0", width: "100%" }}>
      <LeaveRecords />
      <LeaveSummery />
    </Box>
  );
};

export default TimeOff;
