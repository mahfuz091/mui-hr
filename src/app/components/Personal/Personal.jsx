import { Typography, Box, Card, CardHeader, Grid, Button } from "@mui/material";

import React from "react";

import PersonalCard from "./PersonalCard";
import ContactCard from "./ContactCard";
import SocialCard from "./SocialCard";
import BankCard from "./BankCard";
import EducationCard from "./EducationCard";
import SkillCard from "./SkillCard";
import SideContactCard from "./SideContactCard";

const Personal = ({
  handleUpdateProfile,
  user,
  setGender,
  setDateOfBirth,
  dateOfBirth,
}) => {
  return (
    <div>
      <h5>Personal</h5>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <PersonalCard
              handleUpdateProfile={handleUpdateProfile}
              setGender={setGender}
              setDateOfBirth={setDateOfBirth}
              dateOfBirth={dateOfBirth}
            ></PersonalCard>
            <ContactCard></ContactCard>
            <SocialCard></SocialCard>
            <BankCard></BankCard>
            <EducationCard />
            <SkillCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <SideContactCard></SideContactCard>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Personal;
