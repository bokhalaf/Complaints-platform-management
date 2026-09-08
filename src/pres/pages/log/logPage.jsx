import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";

import { DashboardRepositoryImpl } from "data/repositories/dashboaard.repsitory.impl";
import { GetLogUseCase } from "logic/usecases/getLog.usecase";
import LogDetailsDialog from "./comonent/dialogInfo";

export default function SystemMonitor() {
  const [tab, setTab] = useState(0);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
const [openDialog, setOpenDialog] = useState(false);
const [selectedLog, setSelectedLog] = useState(null);

const handleOpenDialog = (log) => {
  setSelectedLog(log);
  setOpenDialog(true);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
  setSelectedLog(null);
};

  const repository = new DashboardRepositoryImpl();
  const getLog = new GetLogUseCase(repository);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getLog.execute();

        if (Array.isArray(response)) {
          setLogs(response);
        }
        else if (response?.data) {
          setLogs(response.data);
        } else {
          setLogs([]);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const types = {
    success: { color: "#4CAF50", bg: "#E8F5E9", icon: <CheckCircleIcon /> },
    danger: { color: "#E53935", bg: "#FDECEA", icon: <ErrorIcon /> },
    info: { color: "#0288D1", bg: "#E1F5FE", icon: <InfoIcon /> },
    normal: { color: "#9E9E9E", bg: "#F5F5F5", icon: <InfoIcon /> },
  };

  const getTypeByAction = (action = "") => {
    if (action.includes("success")) return "success";
    if (action.includes("attempt")) return "info";
    if (action.includes("error")) return "danger";
    return "normal";
  };

  const filteredLogs = logs.filter((log) => {
    if (tab === 0) return true; 
    if (tab === 1) return log.module === "users";
    if (tab === 2) return log.module === "complaints";
    if (tab === 3) return log.module === "departments";
    return true;
  });

  return (
    <Box sx={{ p: 3, direction: "rtl", margin: "auto" }}>
      <Box display="flex" gap={1} alignItems="center">
        <ScreenSearchDesktopIcon fontSize="large" />
        <Typography variant="h5" fontWeight={700} mb={3}>
          مراقبة النظام
        </Typography>
      </Box>

      <Paper
        elevation={1}
        sx={{
          borderRadius: 3,
          display: "inline-flex",
          p: 1,
          mb: 3,
          background: "#fafafa",
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{ minHeight: 40 }}
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          {["الكل", "المستخدمين", "الشكاوي", "الاقسام"].map((label, i) => (
            <Tab
              key={i}
              label={label}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 2,
                minHeight: 40,
                background: tab === i ? "white" : "transparent",
                boxShadow: tab === i ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
                transition: "0.1s",
                fontWeight: 600,
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : filteredLogs.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          لا توجد سجلات
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {filteredLogs.map((log) => {
            const t = types[getTypeByAction(log.action)];

            return (
              <Paper
                key={log.id}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fff",
                  border: "1px solid #eee",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: t.bg,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: t.color,
                    }}
                  >
                    {t.icon}
                  </Box>

                  <Box>
                    <Typography fontWeight={600} sx={{ fontSize: "14px" }}>
                      {log.description} 
                    </Typography>

                    <Typography sx={{ fontSize: "12px", color: "#555" }}>
                     النوع : {log.module} 
                    </Typography>
   <Typography sx={{ fontSize: "12px", color: "#555" }}>
                      العملية : {log.action}
                    </Typography>
                    <Typography
                      sx={{ color: "#888", fontSize: "12px", mt: 0.5 }}
                    >
                      {new Date(log.created_at).toLocaleString("ar-EG")}
                    </Typography>
                  </Box>
                </Box>
<IconButton onClick={() => handleOpenDialog(log)}>
  <MoreVertIcon />
</IconButton>

              </Paper>
            );
          })}
        </Box>
      )}
      <LogDetailsDialog
  open={openDialog}
  onClose={handleCloseDialog}
  log={selectedLog}
/>

    </Box>
  );
}
