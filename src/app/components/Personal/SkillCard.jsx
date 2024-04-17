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
import EditSkill from "../EditSkill/EditSkill";
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

  const [skill, setSkill] = useState("");
  const [userSkills, setUserSkills] = useState([]);

  const handleSkillAdd = async (e) => {
    e.preventDefault();
    const skill_id = skill;

    const userSkill = { skill_id, level };
    console.log("Clicked", userSkill);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.post(
        "/api/profile/skills",
        userSkill,
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
      // setLevel("");
      // setSkills("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSkill(event.target.value);
  };
  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };
  // Get User Skill
  const getUserSkills = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(
        "/api/profile/skills",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      // console.log(data);

      setUserSkills(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserSkills();
  }, [control]);
  // console.log(userSkills);
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
      <Box>
        {userSkills?.skills?.map((skill) => (
          <EditSkill key={skill.id} skill={skill}></EditSkill>
        ))}
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
              borderRadius: "10px 10px 0 0",
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
            <form action='' onSubmit={handleSkillAdd}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Skills</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    // value={skill}
                    label='Skill'
                    onChange={handleChange}
                  >
                    {skills?.skills?.map((skill, index) => (
                      <MenuItem key={index} value={skill.id} skill={skill}>
                        {skill.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120, marginTop: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Level</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    // value={level}
                    label='Level'
                    onChange={handleLevelChange}
                  >
                    <MenuItem value='Basic'>Basic</MenuItem>
                    <MenuItem value='Proficient'>Proficient</MenuItem>
                    <MenuItem value='Expert'>Expert</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Typography
                sx={{ fontSize: "16px", marginTop: "10px" }}
                variant='body2'
              >
                You have a common knowledge level of understanding in this area
                and a basic understanding of the skills and techniques required
                to practically apply this skill.
              </Typography>
              <Typography
                sx={{ fontSize: "16px", marginTop: "10px" }}
                variant='body2'
              >
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
