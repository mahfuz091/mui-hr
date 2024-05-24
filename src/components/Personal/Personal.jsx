import { Typography, Box, Card, CardHeader, Grid, Button } from "@mui/material";

import React from "react";

import PersonalCard from "./PersonalCard";
import ContactCard from "./ContactCard";
import SocialCard from "./SocialCard";
import BankCard from "./BankCard";
import EducationCard from "./EducationCard";
import SkillCard from "./SkillCard";
import SideContactCard from "./SideContactCard";

const Personal = ({ user, getUser }) => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <PersonalCard user={user} getUser={getUser}></PersonalCard>
          <ContactCard
            contact={user?.contacts}
            userId={user.id}
            getUser={getUser}
          ></ContactCard>
          <SocialCard user={user} getUser={getUser}></SocialCard>
          <BankCard user={user} getUser={getUser}></BankCard>
          <EducationCard
            user={user}
            getUser={getUser}
            educations={user?.educations}
          />
          <SkillCard user={user} getUser={getUser} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SideContactCard></SideContactCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Personal;
