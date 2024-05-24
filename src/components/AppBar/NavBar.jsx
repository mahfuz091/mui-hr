import React, { useContext, useEffect } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "@/assets/images/logo.png";
import UserDropdown from "../UserDropdown/UserDropdown";
import { HrContext } from "@/context/HrProvider";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { ControlCamera } from "@mui/icons-material";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavBar = ({ handleDrawerOpen, open }) => {
  const { loggedUser, getLoggedUser, control } = useContext(HrContext);
  const router = useRouter();
  const handleLogIn = () => {
    router.push("/users/sign-in");
  };

  useEffect(() => {
    getLoggedUser();
  }, [control]);

  // console.log(user);
  return (
    <AppBar position='fixed' open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <img style={{ maxWidth: "220px" }} src={logo.src} alt='' />
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          {loggedUser ? (
            <UserDropdown></UserDropdown>
          ) : (
            <Button onClick={handleLogIn} color='inherit'>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
