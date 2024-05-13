import React, { Fragment, useContext } from "react";
import { HrContext } from "@/context/HrProvider";
import { Box, Paper, Typography, Grid } from "@mui/material";
import TimeOffReq from "../TimeOffReq/TimeOffReq";
import LeaveSummeryTable from "./LeaveSummeryTable";

const LeaveSummery = () => {
  const { userLeaves, myLeaveBalance } = useContext(HrContext);

  return (
    <Fragment>
      <Paper sx={{ padding: "20px", marginTop: "20px", borderRadius: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant='h6' sx={{ padding: "20px 0 " }} color='inherit'>
            My Leave Summary
          </Typography>
          <TimeOffReq />
        </Box>
        <hr />
        <Box sx={{ padding: "30px 0", display: "none" }}>
          <Grid container sx={{ marginTop: "20px" }}>
            {myLeaveBalance?.leaveTypes?.map((leave) => (
              <Grid
                key={leave.id}
                sx={{ margin: "0 auto" }}
                item
                xs={12}
                md={4}
              >
                <Box
                  sx={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "10px 12px 60px #00000014",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography>
                    <Box
                      component='span'
                      sx={{
                        fontSize: "35px",
                        color: "#196f16",
                        fontWeight: "700",
                      }}
                    >
                      {leave.balance}
                    </Box>
                    <Box
                      component='span'
                      sx={{
                        fontSize: "35px",

                        fontWeight: "700",
                      }}
                    >
                      /
                    </Box>
                    <Box
                      component='span'
                      sx={{
                        fontSize: "26px",
                        color: "#6b84ac",
                        fontWeight: "700",
                      }}
                    >
                      {leave.total_days}
                    </Box>
                  </Typography>
                  <Box
                    sx={{
                      background: "#147272",
                      color: "white",
                      borderRadius: "20px",
                      width: "80%",
                      padding: "5px",
                      margin: "20px",
                    }}
                  >
                    {leave.name}
                  </Box>
                  <Typography
                    variant='body2'
                    sx={{ color: "red", fontSize: "18px" }}
                  >
                    Available:{leave.balance}
                  </Typography>
                </Box>
              </Grid>
            ))}
            {/* <Grid item xs={12} md={12}>
              <Box
                sx={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: "#fff",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} md={12}></Grid> */}
          </Grid>
        </Box>
        <LeaveSummeryTable />
      </Paper>
    </Fragment>
  );
};

export default LeaveSummery;
