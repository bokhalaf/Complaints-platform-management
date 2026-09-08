import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DynamicTable from "pres/component/table";
import NumbersIcon from "@mui/icons-material/Numbers";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";

import ComplaintRow from "pres/pages/complaints/component/rowComplaints";
import { ComplaintsRepositoryImpl } from "data/repositories/complaints.repository.impl";
import { GetComplaintsUseCase } from "logic/usecases/getCompalints.usecase";
import { handleApiError } from "core/errors/handleApiError";
import { useNavigate } from "react-router-dom";

export default function ComplaintsPage() {
      const [loading, setLoading] = useState(false);
  
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const repository = new ComplaintsRepositoryImpl();
    const useCase = new GetComplaintsUseCase(repository);
setLoading(true);
    useCase.execute()
      .then((data) => {
        const normalized = data.map(c => ({
          id: c.id,
          citizen: c.user ? c.user.name : "غير محدد",
          type: c.type,
          date: new Date(c.created_at).toLocaleDateString("ar-EG"),
          status: c.status,
        }));

        setComplaints(normalized);
      })
      .catch((err) => handleApiError(err, setError)).finally(()=>setLoading(false)
);
  }, []);

  const handleDeleteComplaint = (id) => {
    if (!window.confirm("هل تريد حذف الشكوى؟")) return;

    setComplaints((prev) => prev.filter((c) => c.id !== id));
  };
 const handleEditComplaint = (id) => {
navigate(`/dashboard/complaints/${id}`);
};


  return (
    <Box sx={{ direction: "rtl" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        إدارة الشكاوى
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          placeholder="ابحث عن شكوى..."
          size="small"
          sx={{ width: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
{loading && (
  <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
    <CircularProgress />
  </Box>
)}
{!loading && (
   <DynamicTable
  columns={[
    {
      label: "معرف الشكوى",
      icon: <NumbersIcon fontSize="medium" />,
    },
    {
      label: "المواطن",
      icon: <PersonIcon fontSize="medium" />,
    },
    {
      label: "النوع",
      icon: <CategoryIcon fontSize="medium" />,
    },
    {
      label: "التاريخ",
      icon: <CalendarTodayIcon fontSize="medium" />,
    },
    {
      label: "الحالة",
      icon: <InfoIcon fontSize="medium" />,
    },
    {
      label: "الإجراءات",
      icon: <SettingsIcon fontSize="medium" />,
    },
  ]}
      rows={complaints.map(c => (
    <ComplaintRow
      key={c.id}
      data={c}
      onDelete={handleDeleteComplaint}
onEdit={() => handleEditComplaint(c.id)}
    />
  ))}
        pagination={{
          count: 2,
          page: 1,
          onChange: (e, value) => console.log("Page:", value)
        }}
      />
      )}      
    </Box>
  );
}


