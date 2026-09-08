import { Box, Typography, IconButton } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function ExportPDFButton() {
  return (
    <Box
      onClick={() => {
        
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 140,
        background: "linear-gradient(135deg, #ff8a65 0%, #ff7043 100%)",
        color: "#fff",
        p: 2,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        },
      }}
    >
      <PictureAsPdfIcon sx={{ fontSize: 50, mb: 1 }} />
      <Typography
        variant="h2"
        fontWeight="bold"
        textAlign="center"
      >
        تصدير تقرير PDF
      </Typography>
    </Box>
  );
}
