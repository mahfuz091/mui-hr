"use client";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

// style
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

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [skill, setDkill] = useState("");
  const [control, setControl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [axiosSecure] = useAxiosSecure();

  const getskills = async () => {
    setIsLoading(true);
    try {
      const response = await axiosSecure.get("/api/skills");
      setSkills(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleskillAdd = async (event) => {
    event.preventDefault();
    const desig = {
      name: skill,
    };
    try {
      const response = await axiosSecure.post("/api/skills", desig);
      console.log(response);
      toast.success("skill has been successfully created.");
      handleClose();
      setControl(!control);
    } catch (error) {
      console.log(error);
    }
  };

  const handleskillDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`/api/skills/${id}`);
      console.log(response);

      if (response) {
        toast.success("skill has been successfully deleted.");
      }
      setControl(!control);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getskills();
  }, [control]);
  return (
    <Box>
      <Button
        variant='contained'
        sx={{ textTransform: "inherit" }}
        onClick={handleOpen}
      >
        Add skills
      </Button>
      <Box
        sx={{
          marginTop: "20px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : null}
        {skills?.data?.skills?.map((skill) => (
          <Box
            key={skill.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              marginY: "10px",
              maxWidth: "420px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "600",

                padding: "10px",
                background: "#F6F6F7",
                borderRadius: "4px",
              }}
            >
              {skill.name}
            </Typography>
            <Box sx={{ cursor: "pointer" }}>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                onClick={() => handleskillDelete(skill.id)}
              >
                <path
                  d='M11.8796 16.6875H6.11964C5.54335 16.6792 4.99145 16.4536 4.5743 16.0559C4.15714 15.6582 3.90548 15.1177 3.86964 14.5425L3.18714 4.1625C3.18364 4.08724 3.19509 4.01204 3.22084 3.94123C3.24659 3.87043 3.28612 3.80543 3.33714 3.75C3.3897 3.69255 3.45334 3.64633 3.52423 3.61411C3.59512 3.58188 3.67179 3.56433 3.74964 3.5625H14.2496C14.3268 3.56233 14.4031 3.57802 14.4739 3.60861C14.5447 3.63919 14.6085 3.68401 14.6613 3.74028C14.714 3.79655 14.7546 3.86307 14.7806 3.93571C14.8065 4.00834 14.8173 4.08554 14.8121 4.1625L14.1596 14.5425C14.1234 15.1229 13.8675 15.6676 13.444 16.0661C13.0205 16.4645 12.4611 16.6867 11.8796 16.6875ZM4.37964 4.6875L4.95714 14.475C4.97622 14.7701 5.10707 15.0469 5.32305 15.2489C5.53902 15.451 5.82389 15.5631 6.11964 15.5625H11.8796C12.1749 15.5613 12.4587 15.4486 12.6743 15.2469C12.8899 15.0452 13.0213 14.7695 13.0421 14.475L13.6496 4.725L4.37964 4.6875Z'
                  fill='#A8A8A8'
                />
                <path
                  d='M15.75 4.6875H2.25C2.10082 4.6875 1.95774 4.62824 1.85225 4.52275C1.74676 4.41726 1.6875 4.27418 1.6875 4.125C1.6875 3.97582 1.74676 3.83274 1.85225 3.72725C1.95774 3.62176 2.10082 3.5625 2.25 3.5625H15.75C15.8992 3.5625 16.0423 3.62176 16.1477 3.72725C16.2532 3.83274 16.3125 3.97582 16.3125 4.125C16.3125 4.27418 16.2532 4.41726 16.1477 4.52275C16.0423 4.62824 15.8992 4.6875 15.75 4.6875Z'
                  fill='#A8A8A8'
                />
                <path
                  d='M11.25 4.6875H6.75C6.60142 4.68556 6.45947 4.62567 6.3544 4.5206C6.24933 4.41553 6.18944 4.27358 6.1875 4.125V2.775C6.19701 2.39011 6.35414 2.02362 6.62638 1.75138C6.89862 1.47914 7.26511 1.32201 7.65 1.3125H10.35C10.7413 1.32229 11.1133 1.48463 11.3865 1.76488C11.6597 2.04513 11.8126 2.42109 11.8125 2.8125V4.125C11.8106 4.27358 11.7507 4.41553 11.6456 4.5206C11.5405 4.62567 11.3986 4.68556 11.25 4.6875ZM7.3125 3.5625H10.6875V2.8125C10.6875 2.72299 10.6519 2.63715 10.5886 2.57385C10.5254 2.51056 10.4395 2.475 10.35 2.475H7.65C7.56049 2.475 7.47464 2.51056 7.41135 2.57385C7.34806 2.63715 7.3125 2.72299 7.3125 2.8125V3.5625Z'
                  fill='#A8A8A8'
                />
                <path
                  d='M11.25 13.6875C11.1014 13.6856 10.9595 13.6257 10.8544 13.5206C10.7493 13.4155 10.6894 13.2736 10.6875 13.125V7.125C10.6875 6.97582 10.7468 6.83274 10.8523 6.72725C10.9577 6.62176 11.1008 6.5625 11.25 6.5625C11.3992 6.5625 11.5423 6.62176 11.6477 6.72725C11.7532 6.83274 11.8125 6.97582 11.8125 7.125V13.125C11.8106 13.2736 11.7507 13.4155 11.6456 13.5206C11.5405 13.6257 11.3986 13.6856 11.25 13.6875Z'
                  fill='#A8A8A8'
                />
                <path
                  d='M6.75 13.6875C6.60142 13.6856 6.45947 13.6257 6.3544 13.5206C6.24933 13.4155 6.18944 13.2736 6.1875 13.125V7.125C6.1875 6.97582 6.24676 6.83274 6.35225 6.72725C6.45774 6.62176 6.60082 6.5625 6.75 6.5625C6.89918 6.5625 7.04226 6.62176 7.14775 6.72725C7.25324 6.83274 7.3125 6.97582 7.3125 7.125V13.125C7.31056 13.2736 7.25067 13.4155 7.1456 13.5206C7.04053 13.6257 6.89858 13.6856 6.75 13.6875Z'
                  fill='#A8A8A8'
                />
                <path
                  d='M9 13.6875C8.85142 13.6856 8.70947 13.6257 8.6044 13.5206C8.49933 13.4155 8.43944 13.2736 8.4375 13.125V7.125C8.4375 6.97582 8.49676 6.83274 8.60225 6.72725C8.70774 6.62176 8.85082 6.5625 9 6.5625C9.14918 6.5625 9.29226 6.62176 9.39775 6.72725C9.50324 6.83274 9.5625 6.97582 9.5625 7.125V13.125C9.56056 13.2736 9.50067 13.4155 9.3956 13.5206C9.29053 13.6257 9.14858 13.6856 9 13.6875Z'
                  fill='#A8A8A8'
                />
              </svg>
            </Box>
          </Box>
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
              Add skill
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ padding: "20px" }}>
            <form action='' onSubmit={handleskillAdd}>
              <Box>
                <TextField
                  fullWidth
                  margin='normal'
                  label='skill'
                  type='text'
                  onChange={(e) => setskill(e.target.value)}
                />
              </Box>
              <Box sx={{ textAlign: "right", marginTop: "10px" }}>
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

export default Skills;
