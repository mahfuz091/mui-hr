"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  OutlinedInput,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import logo from "@/assets/images/oyolloo-logo-color-horizontal.png";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { MdCalendarMonth } from "react-icons/md";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
// import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import useAxiosSecure from "@/app/hooks/useAxiosSecure";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const names = [
  "Administrator",
  "Tool Administrator",
  "Tool Manager",
  "Data Analyst",
  "HR Director",
  "HR Administrator",
  "HR Manager",
  "HR Specialist",
  "Payroll Manager",
  "Recruitment Manager",
  "Learning & Development Manager",
  "Team Manager",
  "Project Manager",
  "Jr. Project Manager",
  "Employee",
];

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(dayjs);
  const [organization, setOrganization] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [dManagerId, setDManagerId] = useState("");
  const [lManagerId, setLManagerId] = useState("");
  const [designations, setDesignations] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [axiosSecure] = useAxiosSecure();
  const [roles, setRoles] = useState([]);
  console.log(roles);

  const getDesignations = async () => {
    try {
      const response = await axiosSecure.get("/api/designations");
      const data = response.data;
      setDesignations(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllUsers = async () => {
    try {
      const response = await axiosSecure.get("/api/users");
      const data = response.data;
      setUsers(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const date = `${dateOfBirth?.$y}-${(dateOfBirth?.$M + 1)
    .toString()
    .padStart(2, "0")}-${dateOfBirth?.$D.toString().padStart(2, "0")}`;
  // console.log(date);

  const [imgSrc, setImgSrc] = useState("/1.png");
  console.log(imgSrc);

  // function onChange(event) {
  //   setImgSrc(event.target.files[0]);
  // }

  const onChange = (file) => {
    const reader = new FileReader();

    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = event.target.img.files[0];
    // console.log(image);

    const user = {
      name,
      email,
      password,
      date_of_birth: date,
      gender: gender,
      avatar: image,
      password_confirmation: confirmPassword,
      organization,

      lead_manager_id: lManagerId,
      direct_manager_id: dManagerId,
      roles: roles,
    };
    console.log(user);
    try {
      const response = await axiosSecure.post("/api/registration", user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const accessToken = response.data.data.token;
      const data = response.data.data;
      console.log(data);

      //   localStorage.setItem("accessToken", accessToken);
      //   localStorage.setItem("user", JSON.stringify(data));
      router.push("/dashboard/directory");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDesignationChange = (event) => {
    setDesignationId(event.target.value);
  };
  const handleDirectManagerChange = (event) => {
    setDManagerId(event.target.value);
  };
  const handleLeadManagerChange = (event) => {
    setLManagerId(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleRoleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    getDesignations();
    getAllUsers();
  }, []);

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          padding: "50px 30px",
          marginTop: "50px",
          background: "#fff",

          borderRadius: "16px",
        }}
      >
        <img
          style={{ maxWidth: "220px", marginBottom: "2.25rem" }}
          src={logo.src}
          alt=''
        />
        <Typography
          variant='h4'
          align='center'
          sx={{
            fontSize: "20px",
            display: "flex",
            gap: "5px",
            fontWeight: "600",
          }}
          gutterBottom
        >
          <FontAwesomeIcon
            style={{ width: "20px", color: "#2f7bff", marginBottom: "20px" }}
            icon={faShieldHalved}
          />
          Welcome to Oyolloo
        </Typography>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <TextField
              sx={{ marginY: 0 }}
              fullWidth
              margin='normal'
              label='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <TextField
              sx={{ marginY: 0 }}
              fullWidth
              margin='normal'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <TextField
              sx={{ marginY: 0 }}
              fullWidth
              margin='normal'
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ minWidth: 120, marginTop: "15px" }}>
            <TextField
              sx={{ marginY: 0 }}
              fullWidth
              margin='normal'
              label='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>

          <Box sx={{ minWidth: 120, marginY: "7px" }}>
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker"]}
                sx={{ position: "relative", marginY: 0 }}
              >
                <MobileDatePicker
                  views={["year", "month", "day"]}
                  sx={{ width: "100%", marginY: 0 }}
                  fullWidth
                  label='Date Of Birth'
                  // defaul tValue={dayjs(date_of_birth)}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                />
                <Box
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "20px",
                    marginTop: "0 !important",
                    fontSize: "24px",
                  }}
                >
                  <MdCalendarMonth sx={{ fontSize: "24px" }} />
                </Box>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={level}
                label='Desigation'
                onChange={handleGenderChange}
              >
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Male'>Female</MenuItem>
                <MenuItem value='Male'>Others</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <TextField
              sx={{ marginY: "0" }}
              fullWidth
              margin='normal'
              label='Organization'
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </Box>

          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                Direct Manager
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={level}
                label='Desigation'
                onChange={handleDirectManagerChange}
              >
                {users?.map((designation, index) => (
                  <MenuItem key={designation?.id} value={designation?.id}>
                    {designation?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                Lead Manager
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={level}
                label='Desigation'
                onChange={handleLeadManagerChange}
              >
                {users?.map((designation, index) => (
                  <MenuItem key={designation?.id} value={designation?.id}>
                    {designation?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <FormControl fullWidth>
              <InputLabel id='demo-multiple-name-label'>Roles</InputLabel>
              <Select
                labelId='demo-multiple-name-label'
                id='demo-multiple-name'
                multiple
                value={roles}
                onChange={handleRoleChange}
                input={<OutlinedInput label='Roles' />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={getStyles(name, roles, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              src={imgSrc}
              alt=''
            />

            <Button
              component='label'
              variant='contained'
              htmlFor='account-settings-upload-image'
            >
              Upload Photo
              <input
                hidden
                type='file'
                onChange={onChange}
                accept='image/*'
                id='account-settings-upload-image'
                name='img'
              />
            </Button>
          </Box>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            //   onClick={handleLogin}
            sx={{ marginTop: "20px", padding: "15px", fontSize: "18px" }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
