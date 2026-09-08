import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Divider,
  Paper,
  Button,
} from "@mui/material";

const formatValue = (value) => {
  if (value === null) return "-";
  if (typeof value === "object")
    return JSON.stringify(value, null, 2);
  return String(value);
};

export default function LogDetailsDialog({ open, onClose, log }) {
  if (!log) return null;

  const renderValues = (values, highlight = false) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 1.5,
      }}
    >
      {Object.entries(values).map(([key, value]) => (
        <Paper
          key={key}
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: highlight ? "#FFF5F5" : "#FAFAFA",
          }}
        >
            <Box display={"flex"} gap={0.5}>
          <Typography variant="caption">{key}:</Typography>
          <Typography
            component="pre"
            sx={{
              fontSize: 12,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              
            }}
          >
            {formatValue(value)}
          </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle fontWeight={700}>تفاصيل العملية</DialogTitle>

      <DialogContent dividers>
        <Typography>النوع: {log.module}</Typography>
        <Typography>العملية: {log.action}</Typography>
        <Typography>
          التاريخ: {new Date(log.created_at).toLocaleString("ar-EG")}
        </Typography>

        {log.new_values && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight={700}>التفاصيل</Typography>
            {renderValues(log.new_values)}
          </>
        )}

        {log.old_values && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight={700} color="error">
              القيم السابقة
            </Typography>
            {renderValues(log.old_values, true)}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>إغلاق</Button>
      </DialogActions>
    </Dialog>
  );
}
