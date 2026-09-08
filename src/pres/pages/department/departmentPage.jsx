import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DepartmentsRepositoryImpl } from "data/repositories/departments.repository.impl";
import { GetDepartmentsUseCase } from "logic/usecases/department/get_departments.usecase";
import { UpdateDepartmentUseCase } from "logic/usecases/department/update_department.usecase";
import { AddDepartmentUseCase } from "logic/usecases/department/add_department.usecase";
import { DeleteDepartmentUseCase } from "logic/usecases/department/delete_department.usecase";

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [currentDept, setCurrentDept] = useState(null); 
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const repository = new DepartmentsRepositoryImpl();
  const getUseCase = new GetDepartmentsUseCase(repository);
  const addUseCase = new AddDepartmentUseCase(repository);
  const updateUseCase = new UpdateDepartmentUseCase(repository);
  const deleteUseCase = new DeleteDepartmentUseCase(repository);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const data = await getUseCase.execute();
      setDepartments(data);
    } catch (err) {
      setError(err.message || "حدث خطأ عند جلب الأقسام");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddDepartment = async () => {
    if (!name || !description) return alert("يرجى ملء جميع الحقول");
    setLoading(true);
    try {
      const newDept = await addUseCase.execute(name, description);
      setDepartments((prev) => [...prev, newDept]);
      setName("");
      setDescription("");
    } catch (err) {
      alert(err.message || "حدث خطأ أثناء إضافة القسم");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDepartment = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا القسم؟")) return;
    setLoading(true);
    try {
      await deleteUseCase.execute(id);
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      alert(err.message || "حدث خطأ أثناء الحذف");
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (dept) => {
    setCurrentDept(dept);
    setEditName(dept.name);
    setEditDescription(dept.description);
    setEditOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editName || !editDescription) return alert("يرجى ملء جميع الحقول");
    setLoading(true);
    try {
      const updatedDept = await updateUseCase.execute(
        currentDept.id,
        editName,
        editDescription
      );
      setDepartments((prev) =>
        prev.map((d) => (d.id === currentDept.id ? updatedDept : d))
      );
      setEditOpen(false);
      setCurrentDept(null);
    } catch (err) {
      alert(err.message || "حدث خطأ أثناء التعديل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography fontWeight="bold" mb={2}>الأقسام الحالية</Typography>

        {error && <Typography color="error">{error}</Typography>}

      
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f6fa" }}>
              <TableCell align="right">اسم القسم</TableCell>
              <TableCell align="right">الوصف</TableCell>
              <TableCell align="right">تاريخ الإنشاء</TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
            {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}

          <TableBody>
            {departments.map((dept) => (
              <TableRow key={dept.id} hover>
                <TableCell align="right">{dept.name}</TableCell>
                <TableCell align="right">{dept.description}</TableCell>
                <TableCell align="right">{new Date(dept.createdAt).toLocaleDateString("ar-EG")}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => openEditDialog(dept)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteDepartment(dept.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={3}>
          <AddCircleOutlineIcon color="primary" />
          <Typography fontWeight="bold">إضافة قسم جديد</Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="اسم القسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="وصف القسم"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
          <Button variant="outlined" onClick={() => { setName(""); setDescription(""); }}>إلغاء</Button>
          <Button variant="contained" onClick={handleAddDepartment}>حفظ القسم</Button>
        </Stack>
      </Paper>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>تعديل القسم</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="اسم القسم"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              label="وصف القسم"
              fullWidth
              multiline
              rows={3}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleSaveEdit}>حفظ</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
