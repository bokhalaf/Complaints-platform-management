  import React, { useEffect, useState } from "react";
  import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Button,

    CircularProgress
  } from "@mui/material";
  import { useDepartments } from "pres/hooks/useDepartments";
  import { useRoles } from "pres/hooks/useRoles";
  import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

  import SearchIcon from "@mui/icons-material/Search";
  import AddIcon from "@mui/icons-material/Add";
  import { EmployeesRepositoryImpl } from "data/repositories/employee.repository.impl";
  import { GetEmployeesUseCase } from "logic/usecases/getEmployee.usecase";
  import { handleApiError } from "core/errors/handleApiError";
  import AddEmployeeDialog from "pres/pages/Users/component/addEmployee";
  import DynamicTable from "pres/component/table";
  import Employee from "pres/pages/Users/component/employee";
  import { DeleteEmployeeUseCase } from "logic/usecases/deleteEmployee.usecase";
  import { UpdateEmployeeStatusUseCase } from "logic/usecases/updateStatus.usecase";
  import SnackBarCustom from "pres/component/snackBar";
  import { SearchEmployeeUseCase } from "logic/usecases/searchEmployee.usecase";
  import NumbersIcon from "@mui/icons-material/Numbers";
  import PersonIcon from "@mui/icons-material/Person";
  import ApartmentIcon from "@mui/icons-material/Apartment";
  import WorkIcon from "@mui/icons-material/Work";
  import EmailIcon from "@mui/icons-material/Email";
  import ToggleOnIcon from "@mui/icons-material/ToggleOn";
  import SettingsIcon from "@mui/icons-material/Settings";
  import { GetByRoleEmployeesUseCase } from "logic/usecases/getByRoleEmployees.usecase";
  export default function UserPage() {
    const normalizeEmployees = (data) =>
  data.map(emp => ({
    id: emp.id,
    name: emp.name,
    email: emp.email,
    department: emp.department_id ?? "غير محدد",
    role: emp.role ?? "غير محدد",
    status: emp.status
  }));

      const [snackbarOpen, setSnackbarOpen] = useState(false);
      const [loading, setLoading] = useState(false);

    const { departments, loading: depLoading } = useDepartments();
  const { roles, loading: rolesLoading } = useRoles();
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");
      const [ query, setQuery] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [snack, setSnack] = useState({
    open: false,
    title: "",
    severity: "success",
  });
  const [selectedRole, setSelectedRole] = useState("");

  const showSnack = (title, severity = "success") => {
    setSnack({ open: true, title, severity });
  };

  useEffect(() => {
    setLoading(true);

    if (!rolesLoading && !depLoading) {
      console.log("📌 الأدوار:", roles);
      console.log("📌 الأقسام:", departments);
        setError("");
      const repository = new EmployeesRepositoryImpl();
      const useCase = new GetEmployeesUseCase(repository);

      useCase.execute()
        .then((data) => {
          const normalized = data.map(emp => ({
            id: emp.id,
            name: emp.name,
            email: emp.email,
            department: emp.department_id ?? "غير محدد",
            role: emp.role ?? "غير محدد",
            status: emp.status
          }));
          setEmployees(normalized);
        })
        .catch((err) => handleApiError(err, setError)).finally(()=>setLoading(false));
    }
          console.log(employees);

  }, [rolesLoading, depLoading, roles, departments]);

    const repository = new EmployeesRepositoryImpl();
  const deleteUseCase = new DeleteEmployeeUseCase(repository);
  const updateStatusUseCase = new UpdateEmployeeStatusUseCase(repository);
  const searchUseCase = new SearchEmployeeUseCase(repository);
  const getByRoleUseCase = new GetByRoleEmployeesUseCase(repository);

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف الموظف؟")) return;

    try {
      await deleteUseCase.execute(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      showSnack("تم الحذف بنجاح", "success");

    } catch (err) {
      handleApiError(err, setError);
    }
  };
  const handleEditEmployee = (emp) => {
    setDialogMode("edit");
    setSelectedEmployee(emp);
    setOpenDialog(true);
  };
  const handleStatusUpdate = async (emp) => {
      const newStatus = emp.status === "active" ? "inactive" : "active";


      try {
        await updateStatusUseCase.execute(emp.id, newStatus);

        setEmployees(prev =>
          prev.map(e =>
            e.id === emp.id ? { ...e, status: newStatus } : e
          )
        );

  showSnack("تم تحديث الحالة بنجاح", "success");
      } catch (err) {
        handleApiError(err, setError);
      }
    };
const handleSearch = async () => {
  if (!query.trim()) return;

  setLoading(true);
  setError("");

  try {
    const data = await searchUseCase.execute(query);
    setEmployees(normalizeEmployees(data));
  } catch (err) {
    handleApiError(err, setError);
  } finally {
    setLoading(false);
  }
};
const handleRoleFilter = async (role) => {
  setSelectedRole(role);
  setLoading(true);
  setError("");

  try {
    if (!role) {
      const data = await new GetEmployeesUseCase(
        new EmployeesRepositoryImpl()
      ).execute();

      setEmployees(normalizeEmployees(data));
      return;
    }

    const data = await getByRoleUseCase.execute(role);
    setEmployees(normalizeEmployees(data));
  } catch (err) {
    handleApiError(err, setError);
  } finally {
    setLoading(false);
  }
};


    return (
      <Box sx={{ direction: "rtl"}}>
            <Box sx={{ direction: "rtl", display:"flex", gap:1}}>

  <ManageAccountsIcon fontSize="large"></ManageAccountsIcon>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          إدارة المستخدمين
        </Typography>
  </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
            alignItems: "center",
            gap: 2
          }}
        >
          <TextField
            placeholder="ابحث عن مستخدم..."
            size="small"
            sx={{ width: 250 }}
              onChange={(e) => {
  setQuery(e.target.value);
  setSelectedRole(""); 
}}
  onKeyDown={(e) => {
      if (e.key === "Enter") {
        
        handleSearch();
      }
    }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
  select
  size="small"
  value={selectedRole}
  sx={{ width: 200 }}
  SelectProps={{ native: true }}
  onChange={(e) => {
    setQuery(""); 
    handleRoleFilter(e.target.value);
  }}
>
  <option value="">كل الأدوار</option>
  {roles.map((role) => (
    <option key={role.id} value={role.name}>
      {role.name}
    </option>
  ))}
</TextField>

          
    <Button
    variant="contained"
    startIcon={<AddIcon />}
    sx={{
      borderRadius: 2,
      px: 3,
      fontWeight: 600,
    }}
    onClick={() => {
      setDialogMode("add");
      setSelectedEmployee(null);
      setOpenDialog(true);
    }}
  >
    إضافة موظف
  </Button>

    <AddEmployeeDialog
    open={openDialog}
    mode={dialogMode}
    employee={selectedEmployee}
    onClose={() => setOpenDialog(false)}
    onSave={(newEmployee) => {
      if (dialogMode === "add") {
        setEmployees([newEmployee, ...employees]);
        showSnack("تم إضافة الموظف بنجاح", "success");
      } else {
        setEmployees(prev =>
          prev.map(emp =>
            emp.id === newEmployee.id ? newEmployee : emp
          )
        );
        showSnack("تم تعديل بيانات الموظف بنجاح", "success");
      }
    }}
    title={dialogMode === "add" ? "إضافة موظف" : "تعديل موظف"}
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
      { label: "ID", icon: <NumbersIcon fontSize="medium" /> },
      { label: "الاسم", icon: <PersonIcon fontSize="medium" /> },
      { label: "القسم", icon: <ApartmentIcon fontSize="medium" /> },
      { label: "المنصب", icon: <WorkIcon fontSize="medium" /> },
      { label: "البريد الإلكتروني", icon: <EmailIcon fontSize="medium" /> },
      { label: "الحالة", icon: <ToggleOnIcon fontSize="medium" /> },
      { label: "الإجراءات", icon: <SettingsIcon fontSize="medium" /> },
    ]}
    rows={employees.map((emp) => (
    <Employee key={emp.id} data={emp} onDelete={handleDelete}  onEdit={handleEditEmployee}             onStatusUpdated={() => handleStatusUpdate(emp)}

  />
  ))}
    pagination={{
      count: 2,
      page: 1,
      onChange: (e, value) => console.log("Page:", value)
    }}
    
  />
  )}
  <SnackBarCustom
    open={snack.open}
    title={snack.title}
    severity={snack.severity}
    duration={3000}
    onClose={() => setSnack({ ...snack, open: false })}
  />

    
      </Box>
    );
  }
