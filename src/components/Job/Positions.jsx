import React from "react";
import DataTable from "../DataTable/DataTable";
const data = [
  {
    "Effective from": "01.01.2024",
    Position: "React Developer",
    "Job laevel": "Junior",
    Location: "",
    Division: "Bangladesh",
    Department: "Development",
    Manager: "Tausif Ahmed",
  },
  {
    "Effective from": "01.01.2024",
    Position: "React Developer Intern",
    "Job laevel": "",
    Location: "",
    Division: "Bangladesh",
    Department: "Development",
    Manager: "Tausif Ahmed",
  },
];

const Positions = () => {
  return (
    <div style={{ width: "100%", marginTop: "30px" }}>
      <DataTable title='Positions' data={data} />
    </div>
  );
};

export default Positions;
