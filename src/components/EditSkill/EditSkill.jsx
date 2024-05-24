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
  FormControl,
  InputLabel,
  Select,
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
const smallDeviceStyle = {
  width: "80%", // Change width to 80% for small devices
};

const EditSkill = ({ skill, user, getUser }) => {
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

  const handleSkillDelete = async (id) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axiosInstance.delete(`/api/profile/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      handleDropClose();
      // setControl(!control);
      getUser({ id: user.id });
    } catch (error) {
      console.log(error);
    }
  };
  //   Edit Skill
  const id = skill.id;

  const [level, setLevel] = useState(skill?.pivot?.level);

  const handleSkillEdit = async (e) => {
    e.preventDefault();
    // const school = e.target.school.value;

    // const degree = e.target.degree.value;
    // const grade = e.target.grade.value;
    // const field_of_study = e.target.field_of_study.value;
    // const start_year = e.target.start_year.value;
    // const end_year = e.target.end_year.value;

    // const education = {
    //   school,
    //   degree,
    //   grade,
    //   field_of_study,
    //   start_year,
    //   end_year,
    // };

    // // console.log(id);

    // const token = localStorage.getItem("accessToken");
    // // console.log(token);
    // try {
    //   const response = await axiosInstance.post(
    //     `/api/profile/educations/${id}`,
    //     education,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   const data = response.data.data;
    //   handleDropClose();
    //   handleClose2();
    //   setControl(!control);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 20px",
      }}
    >
      <Box>
        <Typography variant='body2'>{skill?.name}</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Typography
          variant='body2'
          sx={{
            color: "rgb(71 104 135)",
            background: "rgb(241 245 248)",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          {skill?.pivot?.level}
        </Typography>
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
        <MenuItem onClick={() => handleSkillDelete(skill.id)}>Delete</MenuItem>
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
              borderRadius: "10px 10px 0 0",
            }}
          >
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Edit Skill
            </Typography>
            <IconButton onClick={handleClose2}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ padding: "20px" }}>
            <form action='' onSubmit={handleSkillEdit}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Skills</InputLabel>
                  <Select
                    disabled
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={skill.name}
                    defaultValue={skill.name}
                    label='Skill'
                    // onChange={handleChange}
                  >
                    <MenuItem value={skill.name}>{skill.name}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120, marginTop: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Level</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={level}
                    label='Level'
                    defaultValue={skill.pivot.level}
                    onChange={handleLevelChange}
                  >
                    <MenuItem value='Basic'>Basic</MenuItem>
                    <MenuItem value='Proficient'>Proficient</MenuItem>
                    <MenuItem value='Expert'>Expert</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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

export default EditSkill;
