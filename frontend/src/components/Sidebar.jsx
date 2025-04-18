import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import {
  SpaceDashboard as DashboardIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Groups2 as PeopleIcon,
  PersonAddAlt1 as PersonAddIcon,
  QueryStats as TimelineIcon,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../features/authSlice";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

import logoFull from "../assets/DL-logo.png";
import logoIcon from "../assets/DL-Icon.png";

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  zIndex: theme.zIndex.drawer,
  display: "flex",
  flexDirection: "column",
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  width: "100%",
  textDecoration: "none",
  color: theme.palette.text.primary,
  "&.active": {
    backgroundColor: theme.palette.action.selected,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/app/dashboard" },
  { text: "CRM Admins", icon: <PeopleIcon />, path: "/app/crm-admins" },
  {
    text: "Agent Control",
    icon: <PersonAddIcon />,
    path: "/app/agent-control",
  },
  { text: "Activity Logs", icon: <TimelineIcon />, path: "/app/activity-logs" },
  { text: "Settings", icon: <SettingsIcon />, path: "/app/settings" },
];

function Sidebar({ isSidebarOpen }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCredentials());
    sessionStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <SidebarContainer sx={{ width: isSidebarOpen ? 260 : 80 }}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Logo */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: isSidebarOpen ? "flex-start" : "center",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
            height: "65px",
            pl: isSidebarOpen ? 3 : 0,
          }}
        >
          {isSidebarOpen ? (
            <Box
              component="img"
              src={logoFull}
              alt="Admin Portal Logo"
              sx={{ height: 30, width: "auto", objectFit: "contain", ml: 1 }}
            />
          ) : (
            <Box
              component="img"
              src={logoIcon}
              alt="AP"
              sx={{ height: 30, width: 30, objectFit: "contain" }}
            />
          )}
        </Box>

        {/* Menu Items */}
        <List sx={{ px: 1.5, mt: 1.5 }}>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem disablePadding key={text} sx={{ mb: 0.5 }}>
              <StyledNavLink to={path}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ListItemButton sx={{ py: 1.5 }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: theme.palette.text.primary,
                        justifyContent: isSidebarOpen ? "flex-start" : "center",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    {isSidebarOpen && (
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          variant: "body2",
                          fontWeight: theme.typography.fontWeightMedium,
                          color: "inherit",
                        }}
                      />
                    )}
                  </ListItemButton>
                </motion.div>
              </StyledNavLink>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Button */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <motion.div
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            fullWidth
            onClick={handleLogout}
            startIcon={
              <LogoutIcon
                sx={{
                  color: theme.palette.text.primary,
                  ml: isSidebarOpen ? 0 : "6px",
                }}
              />
            }
            sx={{
              py: 1.5,
              color: theme.palette.text.primary,
              justifyContent: isSidebarOpen ? "flex-start" : "center",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {isSidebarOpen && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: theme.typography.fontWeightMedium,
                  ml: 1.5,
                  color: "inherit",
                }}
              >
                Log Out
              </Typography>
            )}
          </Button>
        </motion.div>
      </Box>
    </SidebarContainer>
  );
}

export default Sidebar;
