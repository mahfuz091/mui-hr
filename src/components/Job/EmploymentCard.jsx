import React from "react";
import DataTable from "../DataTable/DataTable";

const data = [
  {
    "Effective from": "01.01.2024",
    Type: "Full-time",
    "Probation policy": "Standard probation (6 months)",
    "Work pattern": "Full time",
  },
  {
    "Effective from": "04.08.2023",
    Type: "Intern",
    "Probation policy": "No probation",
    "Work pattern": "",
  },
];
const EmploymentCard = () => {
  return (
    <div style={{ width: "100%", marginTop: "30px" }}>
      <DataTable title='Employment Status' data={data} />
    </div>
  );
};

export default EmploymentCard;
