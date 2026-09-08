import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Badge,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function Header({ pageTitle }) {
  const userName = localStorage.getItem("name") || "مستخدم";

  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        color: "#000",
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6" fontWeight="bold">
          {pageTitle}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          <IconButton>
            <Badge color="error" variant="dot">
              <NotificationsNoneIcon fontSize="medium" />
            </Badge>
          </IconButton>

          <Typography variant="body1" fontWeight="bold">
            {userName}
          </Typography>

          <Avatar sx={{ bgcolor: "#1976d2" }}>{firstLetter}</Avatar>

        </Box>
      </Toolbar>
    </AppBar>
  );
}
