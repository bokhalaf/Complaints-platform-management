import { Box, Typography } from "@mui/material";

export default function QuickActions({ actions }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      {actions.map((a, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "#fff",
            boxShadow: 1,
            flex: 1,
            textAlign: "center",
            cursor: "pointer"
          }}
        >
          {a.icon}
          <Typography mt={1}>{a.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
