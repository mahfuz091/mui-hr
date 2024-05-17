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
import axiosInstance from "@/lib/axios-instance";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(dayjs);
  const [organization, setOrganization] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [designations, setDesignations] = useState([]);
  const router = useRouter();
  const [axiosSecure] = useAxiosSecure();
  console.log(designations);

  const getDesignations = async () => {
    try {
      const response = await axiosSecure.get("/api/designations");
      const data = response.data;
      setDesignations(data);
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
    console.log(image);

    const user = {
      name,
      email,
      password,
      date_of_birth: date,
      avatar: image,
      password_confirmation: confirmPassword,
      organization,
      designation_id: designationId,
    };
    console.log(user);
    try {
      const response = await axiosInstance.post("/api/registration", user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const accessToken = response.data.data.token;
      const data = response.data.data;
      console.log(data);

      //   localStorage.setItem("accessToken", accessToken);
      //   localStorage.setItem("user", JSON.stringify(data));
      router.push("/users/sign-in");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDesignationChange = (event) => {
    setDesignationId(event.target.value);
  };

  useEffect(() => {
    getDesignations();
  }, []);

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          padding: "50px 30px",
          marginTop: "50px",

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
          <TextField
            fullWidth
            margin='normal'
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* <TextField
        fullWidth
        margin='normal'
        label='Date Of Birth'
        type='date'
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      /> */}
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker", "DatePicker"]}
              sx={{ position: "relative" }}
            >
              <MobileDatePicker
                views={["year", "month", "day"]}
                sx={{ width: "100%" }}
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
          <TextField
            fullWidth
            margin='normal'
            label='Organization'
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
          {/* <TextField
            fullWidth
            margin='normal'
            label='Designation Id'
            value={designationId}
            onChange={(e) => setDesignationId(e.target.value)}
          /> */}

          <Box sx={{ minWidth: 120, marginY: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Desigation</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={level}
                label='Desigation'
                onChange={handleDesignationChange}
              >
                {designations?.data?.designations?.map((designation, index) => (
                  <MenuItem key={designation?.id} value={designation?.id}>
                    {designation?.title}
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
