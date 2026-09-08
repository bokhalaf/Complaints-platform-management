// @ts-nocheck
import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function SnackBarCustom({ 
  open, 
  onClose, 
  title, 
  severity = "success", 
  duration = 1500 
}) {
  const validSeverity = ["error", "warning", "info", "success"].includes(severity) 
    ? severity 
    : "success";

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={validSeverity} sx={{ width: "100%" }}>
        {title}
      </Alert>
    </Snackbar>
  );
}