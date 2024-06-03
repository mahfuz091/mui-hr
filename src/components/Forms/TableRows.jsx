import React, { useContext, useEffect, useState } from "react";
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { HrContext } from "@/context/HrProvider";

const TableRows = ({ leaveRequest, leaveApprove }) => {
  const { loggedUser } = useContext(HrContext);
  const [open, setOpen] = useState(false);
  console.log("leaveRequest", leaveRequest);
  const approvar =
    loggedUser?.permissions.includes("approve_leave") ||
    loggedUser?.roles?.map((role) => role.name === "Administrator");
  console.log(approvar);
  const status = !leaveRequest?.approvals?.length
    ? "pending"
    : leaveRequest.approvals.length === 1
    ? "recommend"
    : leaveRequest.approvals.length === 2
    ? leaveRequest.approvals[1]?.approval_level === "final"
      ? "approved"
      : "recommend"
    : "unknown";

  const [axiosSecure] = useAxiosSecure();
  //   console.log(user);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const openDrop = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow>
      <TableCell>{leaveRequest?.leave_type?.name}</TableCell>
      <TableCell>{leaveRequest?.user?.name}</TableCell>
      <TableCell>
        {leaveRequest.start_date} to {leaveRequest.end_date}
      </TableCell>
      <TableCell> {leaveRequest?.requested_days}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        <Box>
          <Button
            id='basic-button'
            aria-controls={openDrop ? "basic-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={openDrop ? "true" : undefined}
            onClick={handleClick}
            sx={{
              padding: ".22rem .75rem",
              "&:hover": {
                // Styles for hover state
                background: "#D3DFEB",
              },
            }}
          >
            <MoreHorizIcon />
          </Button>
        </Box>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={openDrop}
          onClose={handleDropClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {status === "pending" ? (
            <MenuItem onClick={() => leaveApprove(leaveRequest?.id)}>
              Approved
            </MenuItem>
          ) : status === "recommended" ? (
            <MenuItem onClick={() => leaveApprove(leaveRequest?.id)}>
              Final Approved
            </MenuItem>
          ) : null}

          <MenuItem>Rejected</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
