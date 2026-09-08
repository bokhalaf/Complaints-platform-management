import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Box, Typography, Paper, Chip, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import InfoIcon from "@mui/icons-material/Info";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotesIcon from "@mui/icons-material/Notes";

const ComplaintTimeline = ({ logs = [] }) => {
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("done") ) {
      return "success";
    }
    if (statusLower.includes("processing") || statusLower.includes("pending")) {
      return "info";
    }
    if (statusLower.includes("rejected") ) {
      return "error";
    }
    return "info";
  };
  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("done") ) {
      return <CheckCircleIcon sx={{ fontSize: 20 }} />;
    }
    if (statusLower.includes("processing") || statusLower.includes("pending")) {
      return <PendingIcon sx={{ fontSize: 20 }} />;
    }
    if (statusLower.includes("rejected") ) {
      return <CancelIcon sx={{ fontSize: 20 }} />;
    }
    return <InfoIcon sx={{ fontSize: 20 }} />;
  };

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2.5,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <AccessTimeIcon sx={{ color: "white", fontSize: 28 }} />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "white",
            letterSpacing: 0.5,
          }}
        >
          سجل تتبع الحالات
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {logs.length === 0 ? (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <InfoIcon sx={{ fontSize: 48, color: "text.disabled" }} />
            <Typography variant="body1" color="text.secondary">
              لا يوجد سجل حالات بعد
            </Typography>
          </Box>
        ) : (
          <Timeline
            position="right"
            sx={{
              p: 0,
              m: 0,
              [`& .MuiTimelineItem-root:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {logs.map((log, index) => {
              const statusColor = getStatusColor(log.new_status);
              const isLast = index === logs.length - 1;

              return (
                <TimelineItem key={log.id}>
                  <TimelineSeparator>
                    <TimelineDot
                      color={statusColor}
                      sx={{
                        boxShadow: (theme) =>
                          `0 0 0 4px ${theme.palette[statusColor].light}20`,
                        width: 44,
                        height: 44,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                          boxShadow: (theme) =>
                            `0 0 0 6px ${theme.palette[statusColor].light}30`,
                        },
                      }}
                    >
                      {getStatusIcon(log.new_status)}
                    </TimelineDot>
                    {!isLast && (
                      <TimelineConnector
                        sx={{
                          bgcolor: "divider",
                          width: 3,
                          minHeight: 40,
                        }}
                      />
                    )}
                  </TimelineSeparator>

                  <TimelineContent sx={{ py: 1.5, px: 2 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.5,
                        borderRadius: 2.5,
                        bgcolor: "#fafbfc",
                        border: "1px solid",
                        borderColor: "divider",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          bgcolor: `${statusColor}.main`,
                          opacity: 0.8,
                        },
                        "&:hover": {
                          bgcolor: "#ffffff",
                          transform: "translateX(-4px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                          borderColor: `${statusColor}.light`,
                        },
                      }}
                    >
                        <Box sx={{ mb: 1.5 }}>
                        <Chip
                          label={log.new_status}
                          color={statusColor}
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "0.813rem",
                            height: 28,
                            borderRadius: 1.5,
                            boxShadow: (theme) =>
                              `0 2px 8px ${theme.palette[statusColor].main}30`,
                          }}
                        />
                      </Box>

                      {log.note && (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                              mt: 2,
                              mb: 1.5,
                            }}
                          >
                            <NotesIcon
                              sx={{
                                fontSize: 18,
                                color: "text.secondary",
                                mt: 0.3,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.primary",
                                lineHeight: 1.6,
                                flex: 1,
                                fontStyle: "italic",
                              }}
                            >
                              {log.note}
                            </Typography>
                          </Box>
                          <Divider sx={{ my: 1.5 }} />
                        </>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <AccessTimeIcon
                          sx={{
                            fontSize: 16,
                            color: "text.disabled",
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                        >
                          {new Date(log.created_at).toLocaleString("ar-EG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </Box>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        )}
      </Box>
    </Box>
  );
};

export default ComplaintTimeline;