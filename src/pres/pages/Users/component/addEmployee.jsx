import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Typography
} from "@mui/material";

import { EmployeesRepositoryImpl } from "data/repositories/employee.repository.impl";
import { editEmployeeUseCase } from "logic/usecases/editEmployee.usecase";
import { RolesRepositoryImpl } from "data/repositories/roles.repository.impl";
import { DepartmentsRepositoryImpl } from "data/repositories/departments.repository.impl";
import { addEmployeeUseCase } from "logic/usecases/addEmployee.usecase";

export default function EmployeeDialog({ 
  open, 
  onClose, 
  onSave, 
  title,
  mode = "add",      
  employee = null   
}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
const repoRoles = new RolesRepositoryImpl();
const repoDepartment = new DepartmentsRepositoryImpl();

  const repo = new EmployeesRepositoryImpl();


 useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [depRes, roleRes] = await Promise.all([
          repoDepartment.getDepartment(),
          repoRoles.getRoles(),
        ]);
        console.log(depRes,roleRes);

        setDepartments(depRes);
        setRoles(roleRes);

        if (mode === "edit" && employee) {
          setName(employee.name);
          setEmail("");
                    setPassword("");

          setDepartment(employee.department);
          setRole(employee.role);
        } else {
          setName("");
          setEmail("");
          setPassword("");
          setDepartment("");
          setRole("");
        }

      } catch (err) {
        setError("فشل تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open, mode, employee]);


 const handleAdd = async () => {
  try {
    const useCase = new addEmployeeUseCase(repo);

    const newEmp = await useCase.execute(
      name,
      email,
      password,
      department,
      role
    );

    onSave(newEmp);   
    onClose();
  } catch (err) {
    setError(err.message || "فشل إضافة الموظف");
  }
};
const handleEdit = async () => {
  try {
    const useCase = new editEmployeeUseCase(repo);

    await useCase.execute(
      employee.id,
      name,
      email,
      password,
      department,
      role
    );

    onSave({
      ...employee,
      name,
      email,
      department,
      role,
    });

    onClose();
  } catch (err) {
    setError(err.message || "فشل تعديل الموظف");
  }
};




  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection:"column", gap: 2, mt: 1 }}>
          
          <TextField
            label="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
          />

          <TextField
            label="البريد الإلكتروني"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            fullWidth
          />

          <TextField
            label={mode === "edit" ? "كلمة مرور جديدة (اختياري)" : "كلمة المرور"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            fullWidth
          />
            <TextField
              label="القسم"
              select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              size="small"
              fullWidth
            >
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="الرتبة"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              size="small"
              fullWidth
            >
              {roles.map((r) => (
                <MenuItem key={r.name} value={r.name}>
                  {r.name}
                </MenuItem>
              ))}
            </TextField>

            {error && <Typography color="error">{error}</Typography>}
          </Box>
        
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>

        <Button
          variant="contained"
          color="primary"
          onClick={mode === "add" ? handleAdd : handleEdit}
        >
          {mode === "add" ? "حفظ" : "تعديل"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
