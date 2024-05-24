import { Typography, Box, Card, CardHeader, Grid, Button } from "@mui/material";

import React from "react";

import PersonalCard from "./PersonalCard";
import ContactCard from "./ContactCard";
import SocialCard from "./SocialCard";
import BankCard from "./BankCard";
import EducationCard from "./EducationCard";
import SkillCard from "./SkillCard";
import SideContactCard from "./SideContactCard";

const Personal = ({ user }) => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <PersonalCard user={user}></PersonalCard>
          <ContactCard contact={user?.contacts}></ContactCard>
          <SocialCard user={user}></SocialCard>
          <BankCard user={user}></BankCard>
          <EducationCard user={user} />
          <SkillCard user={user} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SideContactCard></SideContactCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Personal;
