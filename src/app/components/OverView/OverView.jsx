import { CalendarMonth, CalendarToday, Task } from "@mui/icons-material";
import { Box, Card, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";

const OverView = () => {
  return (
    <Fragment>
      <Box sx={{ marginTop: "30px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  background: "#fbfcfe",
                  padding: "20px",
                  borderBottom: "1px solid #dce5ef",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <CalendarMonth />
                <Typography
                  sx={{ fontSize: "16px", fontWeight: "600" }}
                  variant='h4'
                >
                  Overview
                </Typography>
              </Box>
              <Box sx={{ padding: "20px", color: "#6c869f" }}>
                <Typography variant='body2'>
                  Nothing upcoming for the next 7 days.
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  background: "#fbfcfe",
                  padding: "20px",
                  borderBottom: "1px solid #dce5ef",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <CalendarToday />
                <Typography
                  sx={{ fontSize: "16px", fontWeight: "600" }}
                  variant='h4'
                >
                  Upcoming time off
                </Typography>
              </Box>
              <Box sx={{ padding: "20px", color: "#6c869f" }}>
                <Typography variant='body2'>
                  There's no time off coming up.
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  background: "#fbfcfe",
                  padding: "20px",
                  borderBottom: "1px solid #dce5ef",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Task />
                <Typography
                  sx={{ fontSize: "16px", fontWeight: "600" }}
                  variant='h4'
                >
                  Tasks
                </Typography>
              </Box>
              <Box sx={{ padding: "20px", color: "#6c869f" }}>
                <Typography variant='body2'>
                  There's nothing outstanding, all of your tasks have been
                  completed.
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default OverView;
