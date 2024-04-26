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
import ErrorIcon from "@mui/icons-material/Error";

//
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { differenceInDays } from "date-fns";
import { HrContext } from "@/context/HrProvider";
import Swal from "sweetalert2";
import { calculateBusinessDays } from "@/lib/utils";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

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

const ErrorText = {
  before3day:
    "Your request is required to have a minimum of 3 days notice period",
  balance: "You Can't apply more than your balance",
};

const TimeOffReq = () => {
  const {
    user,
    leaveControl,
    setLeaveControl,
    myLeaveBalance,
    getMyLeaveBalance,
    getUserLeaves,
  } = useContext(HrContext);
  const [open, setOpen] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [dates, setDates] = useState([]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setDates([]);
    setOpen(false);
    setError(false);
  };

  // const [endDate, setEndDate] = useState("");
  const startDate = dates && dates.length > 0 ? dates[0] : "";
  const endDate = dates && dates.length > 0 ? dates[1] : "";
  // console.log(startDate, endDate);

  const businessDays = calculateBusinessDays(startDate, endDate);
  const difference = differenceInDays(new Date(startDate), new Date());

  // console.log(difference);

  // console.log(`Difference in days: ${businessDays}`);
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
    const days_taken = businessDays;
    const reason = e.target.reason.value;
    const leaveReq = {
      leave_type_id,
      start_date,
      end_date,
      days_taken,
      reason,
    };
    console.log(leaveReq);
    // const diff = differenceInDays(new Date(startDate), new Date()) + 1;
    // const diff = dayjs.diff(startDate, "days");

    const token = localStorage.getItem("accessToken");

    if (difference < 3) {
      // handleClose();
      setError(true);
      setErrorText(
        "Your request is required to have a minimum of 3 days notice period"
      );

      // setLeaveType("");
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Something went wrong!",
      // });
    } else {
      const balance = myLeaveBalance?.leaveTypes?.find(
        (leaveBalance) => leaveBalance?.id === leave_type_id
      );

      if (balance?.balance < days_taken) {
        // handleClose();

        setLeaveType("");
        setError(true);
        setErrorText("You Can't apply more than your balance");
        // Swal.fire({
        //   icon: "error",
        //   position: "top-end",
        //   title: "Oops...",
        //   text: "You Can't apply more than your balance",
        // });
      } else {
        try {
          const response = await axiosInstance.post("/api/leaves", leaveReq, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.data;
          handleClose();
          // setLeaveControl(!leaveControl);
          setLeaveType("");
          getMyLeaveBalance();
          getUserLeaves();
        } catch (error) {
          console.log(error);
          handleClose();
          setLeaveControl(!leaveControl);
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
          {error ? (
            <Box
              sx={{
                padding: "10px 20px",
                margin: "20px 20px",
                border: "1px solid #f1c959",
                background: "#f6f9fb",
                boxShadow: "rgba(9, 8, 61, 0.08) 0px 1px 4px;",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",

                  padding: " 10px 0",
                  fontSize: "13px",
                }}
              >
                {" "}
                <ErrorIcon sx={{ color: "#f1c959" }} /> Oops! Change a few
                things and try again.
              </Typography>
              <Box
                sx={{
                  padding: "0 20px",
                  background: "#FFF",
                  boxShadow: "0px 1px 4px rgba(9, 8, 61, 0.08)",
                  border: "1px solid #D3DFEB",
                  borderRadius: "4px",
                }}
              >
                <List sx={{ listStyleType: "disc", pl: 2 }}>
                  <ListItem
                    sx={{
                      display: "list-item",
                      pl: 0,
                      fontSize: "13px",
                      pt: 0,
                      pb: 0,
                    }}
                  >
                    {errorText}
                  </ListItem>
                </List>
              </Box>
            </Box>
          ) : (
            ""
          )}
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
              {/* <Grid
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
              </Grid> */}
              <Box sx={{ padding: "0px 20px 20px" }}>
                <DateRangePicker dates={dates} setDates={setDates} />
              </Box>
              <Box sx={{ padding: "0px 20px 20px" }}>
                <Typography>Days Taken : {businessDays || "0"} days</Typography>
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
