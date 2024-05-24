import DashboardProfile from "@/components/DashboardProfile/DashboardProfile";
import { Box } from "@mui/material";
import React from "react";

const EmployeePage = ({ params }) => {
  const id = params.id;

  return <DashboardProfile id={id} />;
};

export default EmployeePage;
