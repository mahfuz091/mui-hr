"use client";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

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

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const [designation, setDesignation] = useState("");
  const [control, setControl] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleDesignationAdd = async (event) => {
    event.preventDefault();
    const desig = {
      title: designation,
    };
    try {
      const response = await axiosSecure.post("/api/designations", desig);
      console.log(response);
      handleClose();
      setControl(!control);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDesignations();
  }, [control]);
  return (
    <Box>
      <Button
        variant='contained'
        sx={{ textTransform: "inherit" }}
        onClick={handleOpen}
      >
        Add Designations
      </Button>
      <Box
        sx={{
          marginTop: "20px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {designations.data.designations.map((designation) => (
          <Typography
            sx={{ fontSize: "18px", fontWeight: "600", paddingY: "5px" }}
            key={designation.id}
          >
            {designation.title}
          </Typography>
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
              Add Designation
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ padding: "20px" }}>
            <form action='' onSubmit={handleDesignationAdd}>
              <Box>
                <TextField
                  fullWidth
                  margin='normal'
                  label='Designation'
                  type='text'
                  onChange={(e) => setDesignation(e.target.value)}
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

export default Designations;
