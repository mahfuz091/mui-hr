import { TableCell, TableRow } from "@mui/material";
import Link from "next/link";
import React from "react";

const UserRows = ({ user, index, designations }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          href={`employees/${user?.id}`}
        >
          {user.name}
        </Link>
      </TableCell>
      <TableCell>
        {
          designations?.data?.designations?.find(
            (d) => d.id === user?.designation_id
          )?.title
        }
      </TableCell>
      <TableCell>s</TableCell>
    </TableRow>
  );
};

export default UserRows;
