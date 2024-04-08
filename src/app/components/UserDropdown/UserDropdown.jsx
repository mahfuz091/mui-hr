"use client";

// ** React Imports
import { useState, Fragment, useContext, useEffect } from "react";

// AxiosInstance
import axiosInstance from "@/lib/axios-instance";

// ** Next Import
import { useRouter } from "next/navigation";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Icons Imports
import CogOutline from "mdi-material-ui/CogOutline";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import EmailOutline from "mdi-material-ui/EmailOutline";
import LogoutVariant from "mdi-material-ui/LogoutVariant";
import AccountOutline from "mdi-material-ui/AccountOutline";
import MessageOutline from "mdi-material-ui/MessageOutline";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";
import { ArrowCircleDown } from "@mui/icons-material";
import { HrContext } from "@/context/HrProvider";
import { ArrowDown, ChevronDown } from "mdi-material-ui";

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null);

  // ** Hooks
  const router = useRouter();

  // const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const handleDropdownOpen = (event) => {
    // setControl(!control);
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };
  const handleLogOut = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setAnchorEl(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      router.push("/users/sign-in");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAccount = () => {
    setAnchorEl(null);
    router.push("/dashboard/account/edit");
  };
  const handleProfile = () => {
    setAnchorEl(null);
    router.push("/dashboard/profile");
  };
  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      fontSize: "1.375rem",
      color: "text.secondary",
    },
  };

  //   Contex Api

  const { user, control, setControl, getUser } = useContext(HrContext);
  // console.log(user);

  return (
    <Fragment>
      <Box
        onClick={handleDropdownOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
        }}
      >
        <Badge
          overlap='circular'
          sx={{ ml: 2, cursor: "pointer" }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Avatar
            alt='John Doe'
            sx={{ width: 40, height: 40 }}
            src={user?.auth?.avatar}
          />
        </Badge>
        <Typography variant='body2' sx={{ fontSize: "0.8rem" }}>
          {user?.auth?.name || "Name"}
        </Typography>
        <ChevronDown />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar
                alt='John Doe'
                src='/noavatar.png'
                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge>
            <Box
              sx={{
                display: "flex",
                marginLeft: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                {user?.auth?.name || "Name"}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                {user?.auth?.designation?.title}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleProfile()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Go to my Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleAccount()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Account Settings
          </Box>
        </MenuItem>
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 2 }} />
            Chat
          </Box>
        </MenuItem> */}
        <Divider />

        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleLogOut()}>
          <LogoutVariant
            sx={{
              marginRight: 2,
              fontSize: "1.375rem",
              color: "text.secondary",
            }}
          />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
