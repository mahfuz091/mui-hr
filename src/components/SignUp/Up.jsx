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
import axios from "axios";

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

const Up = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();
  const [axiosSecure] = useAxiosSecure();
  const [imgSrcs, setImgSrcs] = useState([]);
  const [imgSrc, setImgSrc] = useState("/1.png");
  console.log(imgSrcs);
  console.log(imgSrc);

  const onChangeMultiple = (event) => {
    console.log("Cli");
    const { files } = event.target;
    if (files && files.length !== 0) {
      const fileReaders = [];
      const newImgSrcs = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        fileReaders.push(reader);

        reader.onload = () => {
          newImgSrcs.push(reader.result);

          // Check if all readers are done
          if (newImgSrcs.length === files.length) {
            setImgSrcs((prevImgSrcs) => [...prevImgSrcs, ...newImgSrcs]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };
  const onChange2 = (file) => {
    console.log("CC");
    const reader = new FileReader();

    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     const portfolio_image = imgSrc;
  //     const templates = imgSrcs;
  //     const category_id = category;

  //     const port_data = {
  //       title,
  //       description,
  //       category_id,
  //       portfolio_image,
  //       templates,
  //     };

  //     console.log(port_data);

  //     try {
  //       const response = await axios.post(
  //         "https://shahinul.com/api/public/api/portfolios",
  //         port_data
  //       );

  //       const data = response.data;
  //       console.log(data);

  //       //   localStorage.setItem("accessToken", accessToken);
  //       //   localStorage.setItem("user", JSON.stringify(data));
  //       router.push("/dashboard/directory");
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", category);
    formData.append("portfolio_image", imgSrc); // Assuming portfolioImageFile is the file object for portfolio_image

    // Append multiple files for templates
    for (let i = 0; i < imgSrcs.length; i++) {
      formData.append("templates[]", imgSrcs[i]); // Assuming templates is an array of file objects
    }
    console.log(formData);

    try {
      const response = await axios.post(
        "https://shahinul.com/api/public/api/portfolios",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          Welcome to Portfolio
        </Typography>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              src={imgSrc}
              alt=''
            />
            <Button
              component='label'
              variant='contained'
              htmlFor='account-settings-upload-image2'
            >
              Upload Portfolio
              <input
                hidden
                type='file'
                onChange={onChange2}
                accept='image/*'
                id='account-settings-upload-image2'
                name='img'
              />
            </Button>
          </Box>
          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <TextField
              sx={{ marginY: 0 }}
              fullWidth
              margin='normal'
              label='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <TextField
              sx={{ marginY: 0 }}
              fullWidth
              margin='normal'
              label='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box sx={{ minWidth: 120, marginY: "15px" }}>
            <TextField
              sx={{ marginY: 0 }}
              fullWidth
              margin='normal'
              label='Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Box>

          {/* <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
              Upload Portfolio
              <input
                hidden
                type='file'
                onChange={onChange2}
                accept='image/*'
                id='account-settings-upload-image'
                name='img'
              />
            </Button>
          </Box> */}
          <Box sx={{ marginY: "40px" }}></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {imgSrcs.map((src, index) => (
                <img
                  key={index}
                  style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                  src={src}
                  alt={`Uploaded ${index + 1}`}
                />
              ))}
            </Box>
            <Button
              component='label'
              variant='contained'
              htmlFor='account-settings-upload-image'
            >
              Upload Media
              <input
                hidden
                type='file'
                onChange={onChangeMultiple}
                accept='image/*'
                id='account-settings-upload-image'
                name='img'
                multiple
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

export default Up;
