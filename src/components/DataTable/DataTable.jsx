import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TableContainer,
} from "@mui/material";
import React from "react";

// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Typography from "@material-ui/core/Typography";

const DataTable = ({ title, data }) => {
  const headers = Object.keys(data[0]);
  return (
    <Paper>
      <Typography variant='h6' sx={{ padding: "20px" }} color='inherit'>
        {title}
      </Typography>

      <hr />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{ padding: "15px 15px 15px 25px" }}
                  align='left'
                >
                  {header.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((emp, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    sx={{ padding: "15px 15px 15px 25px" }}
                    align='left'
                  >
                    {emp[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
