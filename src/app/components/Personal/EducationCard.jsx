"use client";
import {
  Card,
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { MdAdd } from "react-icons/md";
import axiosInstance from "@/lib/axios-instance";

import CloseIcon from "@mui/icons-material/Close";
import { HrContext } from "@/context/HrProvider";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "#fff",
  border: "1px solid #91A4B7",
  boxShadow: "0px 6px 16px rgba(9, 8, 61, 0.12)",
  borderRadius: "10px",
};

const EducationCard = () => {
  const { control, setControl } = useContext(HrContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEducation = async (e) => {
    e.preventDefault();
    const school = e.target.school.value;

    const degree = e.target.degree.value;
    const grade = e.target.grade.value;
    const field_of_study = e.target.field_of_study.value;
    const start_year = e.target.start_year.value;
    const end_year = e.target.end_year.value;

    const education = {
      school,
      degree,
      grade,
      field_of_study,
      start_year,
      end_year,
    };
    console.log(education);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.post(
        "/api/profile/educations",
        education,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data);
      setControl(!control);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          background: "#fbfcfe",
          padding: "20px",
          borderBottom: "1px solid #dce5ef",
          display: "flex",
          justifyContent: "space-between",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        {" "}
        <Typography variant='h6'>Education</Typography>
        <Button
          variant='outlined'
          sx={{ color: "#000", display: "flex", gap: "5px" }}
          onClick={handleOpen}
        >
          <MdAdd /> Add
        </Button>
      </Box>
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
            }}
          >
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Add Education
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ padding: "20px" }}>
            <form action='' onSubmit={handleEducation}>
              <TextField
                fullWidth
                margin='normal'
                placeholder='School'
                label='School '
                name='school'
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder='Degree'
                label='Degree'
                name='degree'
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder='Grade'
                label='Grade'
                name='grade'
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder='Field of study'
                label='Field of study'
                name='field_of_study'
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder='Start Year'
                label='Start Year'
                name='start_year'
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder='End Year'
                label='End Year'
                name='end_year'
              ></TextField>

              <Box sx={{ textAlign: "right", marginTop: "10px" }}>
                <Button variant='contained' type='submit'>
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default EducationCard;
