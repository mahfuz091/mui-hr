import EmploymentCard from "./EmploymentCard";
import JobCard from "./JobCard";
import { Box } from "@mui/material";
import Positions from "./Positions";

const Job = () => {
  return (
    <Box sx={{ padding: "20px 0", width: "100%" }}>
      <JobCard />
      <EmploymentCard />
      <Positions />
    </Box>
  );
};

export default Job;
