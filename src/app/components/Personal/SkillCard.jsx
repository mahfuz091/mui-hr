"use client";
import {
  Card,
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  List,
  ListItem,
} from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import React, { useContext, useEffect, useState } from "react";
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

const SkillCard = () => {
  const { control, setControl } = useContext(HrContext);
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [level, setLevel] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const getSkill = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axiosInstance.get(
          "/api/skills?search=&orderBy&orderDirection=&paginate=false&page=1&perPage=2",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        setSkills(data);

        setControl(!control);
      } catch (error) {
        console.log(error);
      }
    };
    getSkill();
  }, []);

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
  const [skill, setSkill] = useState("");
  //   const [level, setLevel] = useState("");

  const handleChange = (event) => {
    setSkill(event.target.value);
  };
  const handleLevelChange = (event) => {
    setLevel(event.target.value);
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
        <Typography
          variant='h6'
          sx={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <ImportContactsIcon /> Skills
        </Typography>
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
              Add Skill
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ padding: "20px" }}>
            <form action='' onSubmit={handleEducation}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Age</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={skill}
                    label='Skill'
                    onChange={handleChange}
                  >
                    {skills?.skills?.map((skill, index) => (
                      <MenuItem key={index} value={skill.name} skill={skill}>
                        {skill.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Age</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={skill}
                    label='Skill'
                    onChange={handleLevelChange}
                  >
                    <MenuItem>Basic</MenuItem>
                    <MenuItem>Proficient</MenuItem>
                    <MenuItem>Expert</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Typography variant='body2'>
                You have a common knowledge level of understanding in this area
                and a basic understanding of the skills and techniques required
                to practically apply this skill.
              </Typography>
              <Typography variant='body2'>
                You have identified this as a key area of interest and are
                interested in developing it further.
              </Typography>
              <List sx={{ listStyleType: "disc", pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 0 }}>
                  Basic knowledge
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 0 }}>
                  Focus on learning
                </ListItem>
              </List>

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

export default SkillCard;
