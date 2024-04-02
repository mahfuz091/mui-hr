import { Typography, Box, Card, CardHeader, Grid, Button } from "@mui/material";

import React from "react";
import { MdEdit } from "react-icons/md";
import PersonalCard from "./PersonalCard";
import ContactCard from "./ContactCard";
import SocialCard from "./SocialCard";
import BankCard from "./BankCard";

const Personal = ({ handleUpdateProfile, user, setGender }) => {
  return (
    <div>
      <h5>Personal</h5>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <PersonalCard
              handleUpdateProfile={handleUpdateProfile}
              setGender={setGender}
            ></PersonalCard>
            <ContactCard></ContactCard>
            <SocialCard></SocialCard>
            <BankCard></BankCard>
          </Grid>
          <Grid item xs={4}>
            <p>hi</p>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Personal;
