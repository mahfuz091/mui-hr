// "use client";

import DashLayout from "../components/DashboardLayout/DashLayout";

// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import NavBar from "../components/AppBar/NavBar";
// import DrawerWrapper from "../components/Drawer/DrawerWrapper";
// import { useEffect, useState } from "react";
// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

const DashboardLayout = ({ children }) => {
  // const theme = useTheme();
  // const [open, setOpen] = useState(true);

  // useEffect(() => {
  //   const isMediumDevice = window.matchMedia("(max-width: 768px)").matches;
  //   console.log(isMediumDevice);
  //   setOpen(!isMediumDevice);
  // }, []);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  return (
    // <Box sx={{ display: "flex" }}>
    //   <CssBaseline />

    //   <NavBar handleDrawerOpen={handleDrawerOpen} open={open} />

    //   <DrawerWrapper handleDrawerClose={handleDrawerClose} open={open} />
    //   <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
    //     <DrawerHeader />
    //     {children}
    //   </Box>
    // </Box>
    <DashLayout>{children}</DashLayout>
  );
};

export default DashboardLayout;
