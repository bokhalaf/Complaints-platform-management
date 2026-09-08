// pages/dashboard/DashboardPage.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import PieChart from "./component/PieChart";
import StatsCard from "./component/statsCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WindowIcon from '@mui/icons-material/Window';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { useEffect, useState } from "react";
import { GetDashboardUseCase } from "logic/usecases/getDashboard.usecase";
import { DashboardRepositoryImpl } from "data/repositories/dashboaard.repsitory.impl";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ExportPDFUseCase } from "logic/usecases/exportPDF.usecase";
import SnackBarCustom from "pres/component/snackBar";
import EmployeePerformanceChart from "./component/employeeCharts";
export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);
  const repository = new DashboardRepositoryImpl();
  const getDashboard = new GetDashboardUseCase(repository);
  const exportPDFUseCase = new ExportPDFUseCase(repository);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

const handleExportPDF = async () => {
  try {
    const response = await exportPDFUseCase.execute();
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.pdf"); 
    document.body.appendChild(link);
    link.click();
    setSnackbarOpen(true);
    link.remove();
    window.URL.revokeObjectURL(url); 
  } catch (err) {
    console.error("خطأ في تصدير PDF:", err);
    alert("فشل تصدير الملف. حاول مرة أخرى.");
  }
};


    useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboard.execute();
        setDashboard(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);
  const chartData = dashboard
    ? [
        { name: "مرفوضة", value: dashboard.rejected, color: "#d32f2f" },
        { name: "قيد المعالجة", value: dashboard.processing, color: "#0288d1" },
        { name: "محلولة", value: dashboard.done, color: "#2e7d32" },
      ]
    : []; 
const chartEmployeeData = dashboard?.performanceStats
  ? dashboard.performanceStats.map(item => ({
      name: item.name,
      value: item.resolved_complaints,
    }))
  : [];
//  const chartEmployeeData = [
//     { name: "ahmed", value: Math.floor(Math.random() * 20) },
//     { name: "khaled", value: Math.floor(Math.random() * 20) },
//     { name: "waseem", value: Math.floor(Math.random() * 20) },
//     { name: "sara", value: Math.floor(Math.random() * 20) },
//     { name: "mohamed", value: Math.floor(Math.random() * 20) }
//   ];


console.log(chartEmployeeData);
 return (
    <Box sx={{ p: 2, direction: "rtl" }}>
      <SnackBarCustom
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        title="جاري التنزيل..."
        severity="info"
        duration={4000}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!dashboard && !error && <p>جاري تحميل البيانات...</p>}

      {dashboard && (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            <StatsCard
              title="إجمالي الشكاوي"
              value={dashboard.total}
              icon={<WindowIcon sx={{ color: "#1976d2" }} />}
              color="#e3f2fd"
            />
            <StatsCard
              title="شكاوي معالجة"
              value={dashboard.done}
              icon={<CheckCircleIcon sx={{ color: "#2e7d32" }} />}
              color="#e8f5e9"
            />
            <StatsCard
              title="شكاوي مرفوضة"
              value={dashboard.rejected}
              icon={<CancelIcon sx={{ color: "#d32f2f" }} />}
              color="#ffebee"
            />
            <StatsCard
              title="شكاوي معلقة"
              value={dashboard.pending}
              icon={<WatchLaterIcon sx={{ color: "#ff9800" }} />}
              color="#fff3e0"
            />
            <StatsCard
              title="قيد المعالجة"
              value={dashboard.processing}
              icon={<MoreHorizIcon sx={{ color: "#0288d1" }} />}
              color="#e1f5fe"
            />

            <Box
              onClick={handleExportPDF}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "hsla(0, 36%, 47%, 1.00)",
                boxShadow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                cursor: "pointer",
                color: "#fff",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
                  bgcolor: "#c62828",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4">تصدير تقرير pdf</Typography>
                <PictureAsPdfIcon fontSize="large" />
              </Box>
            </Box>
          </Box>

    <Box
  sx={{
    display: "grid",
    gridTemplateColumns: "1fr 2fr", 
    gap: 2,
    mt: 3,
    alignItems: "stretch",
  }}
>
 
    <PieChart data={chartData} />

  <EmployeePerformanceChart data={chartEmployeeData} />
</Box>
        </>
      )}
    </Box>
  );
}
