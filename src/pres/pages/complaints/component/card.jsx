import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { blue } from "@mui/material/colors";

export default function InfoCard({ title, fields, status = null, onStatusChange = null }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: "600px", 
        borderRadius: 3,
        bgcolor: "white",
      }}
    >
      <Box display="flex" gap={2}>
        <InfoIcon sx={{ fontFamily: "large", color: blue[500] }} />
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
        >
          {title}
        </Typography>
      </Box>

      {fields.map((f, i) => (
        <Box
          key={i}
          sx={{
            mb: 2,
            p: 1.5,
            bgcolor: "#f8f9fc",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {f.label}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              wordBreak: "break-word", 
              whiteSpace: "pre-wrap", 
            }}
          >
            {f.value}
          </Typography>
        </Box>
      ))}

      {onStatusChange && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>حالة الشكوى</InputLabel>

          <Select
            value={status}
            label="حالة الشكوى"
            onChange={(e) => onStatusChange(e.target.value)}
            sx={{
              borderRadius: 2,
              bgcolor: "#f8f9fc",
            }}
          >
            <MenuItem value="pending">قيد الانتظار</MenuItem>
            <MenuItem value="processing">قيد المعالجة</MenuItem>
            <MenuItem value="done">مكتملة</MenuItem>
            <MenuItem value="rejected">مرفوضة</MenuItem>
          </Select>
        </FormControl>
      )}
    </Paper>
  );
}
