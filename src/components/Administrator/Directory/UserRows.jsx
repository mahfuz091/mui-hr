import { TableCell, TableRow, Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
// import Tooltip from "@/components/Tooltip/Tooltip";
import { Edit } from "@mui/icons-material";

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
      <TableCell>
        <Tooltip title='Edit'>
          <Edit />
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default UserRows;
