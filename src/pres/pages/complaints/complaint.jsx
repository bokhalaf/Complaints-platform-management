// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import InfoCard from "./component/card";
import ComplaintTimeline from "./component/timeLine";
import { ComplaintsRepositoryImpl } from "data/repositories/complaints.repository.impl";
import { GetComplaintUseCase } from "logic/usecases/getCompalint.usecase";
import { useParams } from "react-router-dom";
import { GetComplaintTimeLineUseCase } from "logic/usecases/getTimeLine.usecase";
import { UpdateComplaintStatusUseCase } from "logic/usecases/updateComplaint.usecase";
import SnackBarCustom  from "pres/component/snackBar";

// Icons
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import { addNoteUseCase } from "logic/usecases/addNote.usecase";

export default function ComplaintPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [note, setNote] = useState("");
  const [type, setType] = useState("note"); 
  const [isSubmitting, setIsSubmitting] = useState(false);
const [isStatusLoading, setIsStatusLoading] = useState(false);

const [snack, setSnack] = useState({
  open: false,
  title: "",
  severity: "success",
});
const showSnack = (title, severity = "success") => {
  setSnack({ open: true, title, severity });
};

  const repository = new ComplaintsRepositoryImpl();

  useEffect(() => {
    const getComplaint = new GetComplaintUseCase(repository);
    const getTimeline = new GetComplaintTimeLineUseCase(repository);

    getComplaint.execute(id).then(setComplaint);
    getTimeline.execute(id).then((res) => {
      setTimeline(res.status_logs || []);
    });
  }, [id]);

  if (!complaint) {
    return <Typography>جاري التحميل...</Typography>;
  }
  

const handleStatusChange = async (newStatus) => {
  if (!window.confirm("هل أنت متاكد من تعديل الحالة ؟ ")) return;

  const updateStatus = new UpdateComplaintStatusUseCase(repository);
  const getTimeline = new GetComplaintTimeLineUseCase(repository);

  setIsStatusLoading(true);
  try {
    await updateStatus.execute(id, newStatus);

    setComplaint((prev) => ({ ...prev, status: newStatus }));

    const timelineRes = await getTimeline.execute(id);
    setTimeline(timelineRes.status_logs || []);

    showSnack("تم تحديث حالة الشكوى بنجاح", "success");
  } catch (err) {
    console.error(err);
    showSnack("حدث خطأ أثناء تحديث الحالة", "error");
  } finally {
    setIsStatusLoading(false);
  }
};


const handleAddNote = async () => {
  if (!note.trim()) {
    showSnack("الرجاء كتابة ملاحظة", "warning");
    return;
  }

  setIsSubmitting(true);

  const result = new addNoteUseCase(repository);
  const getTimeline = new GetComplaintTimeLineUseCase(repository);

  try {
    await result.execute({
      id,
      message: note,
      type,
    });

    const timelineRes = await getTimeline.execute(id);
    setTimeline(timelineRes.status_logs || []);

    showSnack(
      type === "more_info"
        ? "تم إرسال طلب المرفقات بنجاح"
        : "تم إضافة الملاحظة بنجاح",
      "success"
    );

    setNote("");
  } catch (err) {
    console.error(err);
    showSnack("حدث خطأ أثناء إضافة الملاحظة", "error");
  } finally {
    setIsSubmitting(false);
  }
};



  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return <ImageIcon />;
    }
    if (ext === "pdf") {
      return <PictureAsPdfIcon />;
    }
    if (["doc", "docx"].includes(ext)) {
      return <DescriptionIcon />;
    }
    return <InsertDriveFileIcon />;
  };

  return (
    
    <Box sx={{ p: 3 }}>
      
      <Typography variant="h5" fontWeight="bold" mb={3}>
        معلومات الشكوى
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <InfoCard
              title="تفاصيل الشكوى"
              fields={[
                { label: "المعرف", value: complaint.id },
                { label: "معرف التتبع", value: complaint.tracking_number },
                { label: "الموقع", value: complaint.location_text },
                { label: "النوع", value: complaint.type },
                { label: "الوصف", value: complaint.description },
                {
                  label: "تاريخ التقديم",
                  value: new Date(
                    complaint.created_at
                  ).toLocaleDateString("ar-EG"),
                },
              ]}
              status={complaint.status}
              onStatusChange={handleStatusChange}
            />

            <InfoCard
              title="معلومات المواطن"
              fields={[
                { label: "الاسم", value: complaint.user?.name || "غير محدد" },
                { label: "المعرف", value: complaint.user?.id || "---" },
                {
                  label: "البريد الإلكتروني",
                  value: complaint.user?.email || "---",
                },
              ]}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4} container direction="column" spacing={3}>
          <Grid item>
            <ComplaintTimeline logs={timeline} />
          </Grid>

          <Grid item>
            <Box
              sx={{
                p: 2.5,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  📝 إضافة ملاحظة
                </Typography>

                <Stack direction="row" spacing={0.5} gap={1}>
                  <Button 
                    size="small"
                    variant={type === "note" ? "contained" : "outlined"}
                    onClick={() => setType("note")}
                  >
                    ملاحظة
                  </Button>
                  <Button
                    size="small"
                    variant={type === "more_info" ? "contained" : "outlined"}
                    onClick={() => setType("more_info")}
                  >
                    طلب مرفقات
                  </Button>
                </Stack>
              </Box>

              <TextField
                fullWidth
                multiline
                minRows={4}
                placeholder={
                  type === "more_info"
                    ? "اكتب طلب المرفقات هنا..."
                    : "اكتب ملاحظتك هنا..."
                }
                variant="outlined"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={isSubmitting}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddNote}
                disabled={isSubmitting || !note.trim()}
                endIcon={<SendIcon />}
                sx={{ py: 1.2 }}
              >
                {isSubmitting
                  ? "جاري الإرسال..."
                  : type === "more_info"
                  ? "إرسال طلب المرفقات"
                  : "إرسال الملاحظة"}
              </Button>
            </Box>
          </Grid>

          {/* المرفقات */}
          <Grid item>
            <Box
              sx={{
                p: 2.5,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  📎 المرفقات
                </Typography>
                <Chip
                  label={complaint.files?.length || 0}
                  size="small"
                  color="primary"
                />
              </Box>

              {complaint.files?.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  py={3}
                >
                  لا توجد مرفقات
                </Typography>
              ) : (
                <Stack spacing={1.5}>
                  {complaint.files.map((file, idx) => {
                    const filename = file.file_path.split("/").pop();
                    return (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          p: 1.5,
                          border: "1px solid #e0e0e0",
                          borderRadius: 1.5,
                          bgcolor: "#fafafa",
                          "&:hover": {
                            bgcolor: "#f0f0f0",
                            borderColor: "#1976d2",
                          },
                        }}
                      >
                        {getFileIcon(filename)}
                        <Typography
                          variant="body2"
                          sx={{ flex: 1 }}
                          noWrap
                        >
                          {filename}
                        </Typography>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            window.open(
                              `http://127.0.0.1:8080/storage/${file.file_path}`,
                              "_blank"
                            )
                          }
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <SnackBarCustom
  open={snack.open}
  title={snack.title}
  severity={snack.severity}
  onClose={() => setSnack({ ...snack, open: false })}
/>

    </Box>
    
  );
}
