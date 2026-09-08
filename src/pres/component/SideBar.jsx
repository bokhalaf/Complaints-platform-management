import React, { useState, useContext } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "pres/context/authContext";

import ShieldImage from "../../assets/images/shield-check.png";

import DashboardIcon from "@mui/icons-material/GridViewRounded";
import CasesIcon from "@mui/icons-material/WorkOutlineRounded";
import PeopleIcon from "@mui/icons-material/PeopleAltRounded";
import DnsIcon from "@mui/icons-material/Dns";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ArticleIcon from "@mui/icons-material/Article";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import SnackBarCustom from "./snackBar";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutSnackOpen, setLogoutSnackOpen] = useState(false);

  const navigate = useNavigate();
  const { role, logout } = useContext(AuthContext);

  const menuItems = [
    { text: "لوحة التحكم", icon: <DashboardIcon />, path: "/dashboard", roles: ["admin"] },
    { text: "الشكاوي", icon: <CasesIcon />, path: "complaints", roles: ["admin", "employee"] },
    { text: "المستخدمين", icon: <PeopleIcon />, path: "users", roles: ["admin"] },
    { text: "مراقبة النظام", icon: <DnsIcon />, path: "log", roles: ["admin"] },
    { text: "الأدوار", icon: <WorkspacePremiumIcon />, path: "roles", roles: ["admin"] },
    { text: "الأقسام", icon: <ArticleIcon />, path: "departments", roles: ["admin"] },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setLogoutSnackOpen(true);

    setTimeout(() => {
      logout();
      navigate("/login");
    }, 3000);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? 80 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? 80 : 240,
            boxSizing: "border-box",
            borderRight: "1px solid #eee",
            direction: "rtl",
            padding: "10px 0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            mb: 1,
          }}
        >
          <img
            src={ShieldImage}
            alt="shield"
            style={{ width: 35, height: 35 }}
          />

          {!collapsed && (
            <Typography variant="h6" fontWeight="bold">
              لوحة التحكم
            </Typography>
          )}
        </Box>

        <Divider />

        <List>
          {menuItems
            .filter((item) => item.roles.includes(role))
            .map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  "&:hover": {
                    backgroundColor: "#f5f7fa",
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: "#444",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontSize: 15 }}
                  />
                )}
              </ListItemButton>
            ))}
        </List>

        <Box sx={{ mt: "auto", px: 2, mb: 1 }}>
          <Divider sx={{ mb: 1 }} />

          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: "error.main",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.08)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
              <LogoutIcon />
            </ListItemIcon>

            {!collapsed && (
              <ListItemText
                primary="تسجيل الخروج"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              />
            )}
          </ListItemButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              mt: 1,
            }}
            onClick={() => setCollapsed(!collapsed)}
          >
            <IconButton>
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>

            {!collapsed && <Typography>إغلاق</Typography>}
          </Box>
        </Box>
      </Drawer>

      <SnackBarCustom
        open={logoutSnackOpen}
        onClose={() => setLogoutSnackOpen(false)}
        title="سيتم تسجيل الخروج بعد 3 ثواني"
        severity="warning"
        duration={3000}
      />
    </>
  );
}
