import { Card, Typography, Box } from "@mui/material";
import React from "react";

const JobCard = () => {
  return (
    <Card
      sx={{
        boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
      }}
    >
      <Box
        sx={{
          background: "#fbfcfe",
          padding: "20px",
          borderBottom: "1px solid #dce5ef",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant='h6'>Job</Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Typography variant='body2'>Hired On</Typography>
        <Typography
          sx={{ background: "#f4f5f7", padding: "10px", marginTop: "5px" }}
          variant='body2'
        >
          04.03.2023
        </Typography>
      </Box>
    </Card>
  );
};

export default JobCard;
