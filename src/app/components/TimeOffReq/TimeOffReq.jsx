import React, { Fragment, useContext, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Modal,
  IconButton,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  List,
  ListItem,
  Grid,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NordicWalkingIcon from "@mui/icons-material/NordicWalking";
import axiosInstance from "@/lib/axios-instance";

//
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { differenceInDays } from "date-fns";
import { HrContext } from "@/context/HrProvider";
import Swal from "sweetalert2";

// Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#fff",
  border: "1px solid #91A4B7",
  boxShadow: "0px 6px 16px rgba(9, 8, 61, 0.12)",
  borderRadius: "10px",
  "@media (max-width: 640px)": {
    width: "80%" /* adjust width for medium screens */,
  },
};

const TimeOffReq = () => {
  const { user, setControl, control, myLeaveBalance } = useContext(HrContext);
  const [open, setOpen] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(leaveTypes);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const difference = differenceInDays(new Date(endDate), new Date(startDate));

  console.log(`Difference in days: ${difference}`);
  const [leaveType, setLeaveType] = useState("");

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const handleLeaveReq = async (e) => {
    e.preventDefault();
    const leave_type_id = leaveType;
    const start_date = `${startDate?.$y}-${(startDate?.$M + 1)
      .toString()
      .padStart(2, "0")}-${startDate?.$D.toString().padStart(2, "0")}`;
    const end_date = `${endDate?.$y}-${(endDate?.$M + 1)
      .toString()
      .padStart(2, "0")}-${endDate?.$D.toString().padStart(2, "0")}`;
    const days_taken = difference + 1;
    const reason = e.target.reason.value;
    const leaveReq = {
      leave_type_id,
      start_date,
      end_date,
      days_taken,
      reason,
    };
    const diff = differenceInDays(new Date(startDate), new Date()) + 1;
    // const diff = dayjs.diff(startDate, "days");

    const token = localStorage.getItem("accessToken");
    console.log(leave_type_id);

    if (diff < 4) {
      handleClose();
      setStartDate("");
      setLeaveType("");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
      const balance = myLeaveBalance?.leaveTypes?.find(
        (leaveBalance) => leaveBalance?.id === leave_type_id
      );

      if (balance?.balance < days_taken) {
        handleClose();
        setStartDate("");
        setLeaveType("");
        Swal.fire({
          icon: "error",
          position: "top-end",
          title: "Oops...",
          text: "You Can't apply more than your balance",
        });
      } else {
        try {
          const response = await axiosInstance.post("/api/leaves", leaveReq, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.data;
          // console.log(data);
          handleClose();

          setControl(!control);
          setLeaveType("");
        } catch (error) {
          console.log(error);
          handleClose();

          setControl(!control);
          setLeaveType("");
          if (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      }
    }

    // console.log(leaveReq);
  };

  return (
    <Fragment>
      <Button
        sx={{
          textTransform: "capitalize",
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          marginY: "20px",
        }}
        onClick={handleOpen}
        variant='outlined'
      >
        <NordicWalkingIcon sx={{ width: "20px" }} /> Request Time Off
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box
            sx={{
              background: "#fbfcfe",
              padding: "20px",
              borderBottom: "1px solid #dce5ef",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Request Time Off
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box>
            <form action='' onSubmit={handleLeaveReq}>
              <Box sx={{ minWidth: 120, margin: "20px 0", padding: "0 20px" }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Skills</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    // value={skill}
                    defaultValue={0}
                    label='Skill'
                    onChange={handleLeaveTypeChange}
                  >
                    <MenuItem value='0' disabled>
                      --Select--
                    </MenuItem>
                    {myLeaveBalance?.leaveTypes?.map((leaveType, index) => (
                      <MenuItem
                        key={index}
                        value={leaveType.id}
                        leaveType={leaveType}
                      >
                        {leaveType.name} ({leaveType.balance} available days)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Grid
                container
                spacing={4}
                sx={{ marginBottom: "20px", padding: "0 20px" }}
              >
                <Grid item xs={12} md={6}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker", "DatePicker"]}
                      sx={{ position: "relative" }}
                    >
                      <MobileDatePicker
                        views={["year", "month", "day"]}
                        sx={{ width: "100%" }}
                        fullWidth
                        label='Start Date'
                        // defaul tValue={dayjs(date_of_birth)}
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker", "DatePicker"]}
                      sx={{ position: "relative" }}
                    >
                      <MobileDatePicker
                        views={["year", "month", "day"]}
                        sx={{ width: "100%" }}
                        fullWidth
                        label='End Date'
                        // defaul tValue={dayjs(date_of_birth)}
                        onChange={(newValue) => setEndDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box sx={{ padding: "0px 20px 20px" }}>
                <Typography>
                  Days Taken : {difference + 1 || "0"} days
                </Typography>
              </Box>
              <Box sx={{ padding: "0 20px" }}>
                <TextField
                  fullWidth
                  id='outlined-multiline-static'
                  label='Reason'
                  multiline
                  rows={5}
                  variant='outlined'
                  name='reason'
                ></TextField>
              </Box>
              <Box
                sx={{
                  background: "#fbfcfe",
                  marginTop: "20px",
                  padding: "20px",
                  borderTop: "1px solid #dce5ef",
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: "0px 0px 10px 10px",
                }}
              >
                <Button variant='contained' type='Submit'>
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default TimeOffReq;
