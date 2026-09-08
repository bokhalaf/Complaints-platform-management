import { Box, Typography } from "@mui/material";

export default function StatsCard({ title, value, icon, color = "#fff" }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: color,
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>

        <Box sx={{ fontSize: "24px" }}>
          {icon}
        </Box>
      </Box>

      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  );
}
