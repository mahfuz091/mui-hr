"use client";
import {
  Card,
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import axiosInstance from "@/lib/axios-instance";

import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { HrContext } from "@/context/HrProvider";
import SchoolIcon from "@mui/icons-material/School";

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

const EditEducation = ({ education }) => {
  const { control, setControl } = useContext(HrContext);
  // Edit Modal

  const [open2, setOpen2] = useState(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  // dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const openDrop = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropClose = () => {
    setAnchorEl(null);
  };
  //   Delete Education

  const handleEduDelete = async (id) => {
    console.log(id);
    const token = localStorage.getItem("accessToken");
    // console.log(token);
    try {
      const response = await axiosInstance.delete(
        `/api/profile/educations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      handleDropClose();
      setControl(!control);
    } catch (error) {
      console.log(error);
    }
  };
  //   Edit Education
  const id = education.id;
  const handleEduEdit = async (e) => {
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

    // console.log(id);

    const token = localStorage.getItem("accessToken");
    // console.log(token);
    try {
      const response = await axiosInstance.post(
        `/api/profile/educations/${id}`,
        education,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      handleDropClose();
      handleClose2();
      setControl(!control);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: ".25rem",
          }}
          variant='h5'
        >
          {education.school}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            marginBottom: ".25rem",
          }}
          variant='body2'
        >
          {education.degree} - {education.grade}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#6C869F",
          }}
          variant='body2'
        >
          {education.start_year} - {education.end_year}
        </Typography>
      </Box>
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
        <MenuItem
          onClick={() => {
            handleOpen2();
            handleDropClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleEduDelete(education.id)}>
          Delete
        </MenuItem>
      </Menu>
      <Modal
        open={open2}
        onClose={handleClose2}
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
              Edit Education
            </Typography>
            <IconButton onClick={handleClose2}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ padding: "20px" }}>
            <form action='' onSubmit={handleEduEdit}>
              <TextField
                fullWidth
                margin='normal'
                placeholder={education.school}
                label='School '
                name='school'
                defaultValue={education.school}
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder={education.degree}
                label='Degree'
                name='degree'
                defaultValue={education.degree}
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder={education.grade}
                label='Grade'
                name='grade'
                defaultValue={education.grade}
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder={education.field_of_study}
                label='Field of study'
                name='field_of_study'
                defaultValue={education.field_of_study}
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder={education.start_year}
                label='Start Year'
                name='start_year'
                defaultValue={education.start_year}
              ></TextField>
              <TextField
                fullWidth
                margin='normal'
                placeholder={education.end_year}
                label='End Year'
                name='end_year'
                defaultValue={education.end_year}
              ></TextField>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Button onClick={handleClose2} variant='outlined'>
                  Cancel
                </Button>
                <Button variant='contained' type='submit'>
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditEducation;
