"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import SchoolIcon from "@mui/icons-material/School";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import ArticleIcon from "@mui/icons-material/Article";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SettingsIcon from "@mui/icons-material/Settings";

import HomeIcon from "@mui/icons-material/Home";

import {
  MdAttachMoney,
  MdHome,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdSettings,
  MdEditDocument,
  MdTask,
  MdCalendarToday,
  MdRestoreFromTrash,
  MdAssessment,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { Person, UsbRounded } from "@mui/icons-material";
import { handleURLQueries } from "@/lib/utils";
import { ImageListItem } from "@mui/material";

// import logo from "@/assets/images/oyolloo-logo-color-horizontal.png";

const menuItems = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    title: "Me",
    path: "/dashboard/me",
    icon: <Person />,
  },

  {
    title: "Tasks",
    path: "/dashboard/tasks",
    icon: <MdTask />,
  },
];
const menuItemsTwo = [
  {
    title: "Directory",
    path: "/dashboard/directory",
    icon: <AccountBoxIcon />,
  },
  {
    title: "Calender",
    path: "/dashboard/calender",
    icon: <CalendarMonthIcon />,
  },

  {
    title: "Forms",
    path: "/dashboard/forms",
    icon: <DynamicFormIcon />,
  },
  {
    title: "Documents",
    path: "/dashboard/documents",
    icon: <ArticleIcon />,
  },
  {
    title: "Assets",
    path: "/dashboard/assets",
    icon: <WidgetsIcon />,
  },
  {
    title: "Knowledge base",
    path: "/dashboard/knowledge",
    icon: <SchoolIcon />,
  },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerWrapper = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const isNavLinkActive = (path) => {
    if (pathname === path) {
      return true;
    } else {
      return false;
    }
  };
  const isSettingActive = (path) => {
    if (pathname.includes(path)) {
      return true;
    } else {
      return false;
    }
  };
  const handleClick = (path) => {
    router.push(path);
  };
  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((text, index) => (
          <ListItem
            className={isNavLinkActive(text.path) ? "active" : ""}
            key={index}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => handleClick(text.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                {text.icon}
              </ListItemIcon>
              <ListItemText
                primary={text.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItemsTwo.map((text, index) => (
          <ListItem
            className={isNavLinkActive(text.path) ? "active" : ""}
            key={index}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => handleClick(text.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {text.icon}
              </ListItemIcon>
              <ListItemText
                primary={text.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          className={isSettingActive("/dashboard/settings") ? "active" : ""}
          disablePadding
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => handleClick("/dashboard/settings")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Settings' sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerWrapper;
