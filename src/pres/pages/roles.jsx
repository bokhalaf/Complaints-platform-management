// @ts-nocheck
import React, { useEffect, useState } from "react";
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
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { RolesRepositoryImpl } from "data/repositories/roles.repository.impl";
import { GetRolesUseCase } from "logic/usecases/RoleAndPermission/get_roles.usecase";
import { GetPermissionsUseCase } from "logic/usecases/RoleAndPermission/get_permissions.usecase";
import { AddRoleUseCase } from "logic/usecases/RoleAndPermission/add_role.usecase";
import { PermissionsRepositoryImpl } from "data/repositories/permissions.repository.impl";
import SnackBarCustom from "pres/component/snackBar";

export default function RolesPage() {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Saving, setSaving] = useState(false);
  const [Roles, setRoles] = useState([]);

  const [snack, setSnack] = useState({
    open: false,
    title: "",
    severity: "success",
  });

  const showSnack = (title, severity = "success") => {
    setSnack({ open: true, title, severity });
  };

  const repository = new RolesRepositoryImpl();
  const repositoryPer = new PermissionsRepositoryImpl();

  const getUseCase = new GetRolesUseCase(repository);
  const getPermissionsUseCase = new GetPermissionsUseCase(repositoryPer);
  const addRoleUseCase = new AddRoleUseCase(repository);

  const fetchData = async () => {
    setLoading(true);
    try {
      const rolesData = await getUseCase.execute();
      setRoles(rolesData);

      const permRes = await getPermissionsUseCase.execute();
      setPermissions(permRes);
    } catch (err) {
      showSnack(err.message || "حدث خطأ عند جلب البيانات", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTogglePermission = (permissionName) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionName)
        ? prev.filter((p) => p !== permissionName)
        : [...prev, permissionName]
    );
  };

  const handleSaveRole = async () => {
    if (!roleName.trim()) {
      showSnack("الرجاء كتابة اسم الدور", "warning");
      return;
    }

    setSaving(true);
    try {
      await addRoleUseCase.execute(roleName, selectedPermissions);
      showSnack("تم إضافة الدور بنجاح", "success");

      const rolesData = await getUseCase.execute();
      setRoles(rolesData);

      setRoleName("");
      setSelectedPermissions([]);
    } catch (err) {
      showSnack(err.message || "حدث خطأ أثناء حفظ الدور", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      {/* الأدوار الحالية */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography fontWeight="bold" mb={2}>
          الأدوار الحالية
        </Typography>

        {Loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f6fa" }}>
                <TableCell align="right">اسم الدور</TableCell>
                <TableCell align="right">الصلاحيات</TableCell>
                <TableCell align="center">الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell align="right">{role.name}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {role.permissions?.map((permission, index) => (
                        <Box
                          key={index}
                          sx={{
                            bgcolor: "#f1f3f9",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                          }}
                        >
                          {permission.name || permission}
                        </Box>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>none</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* إضافة دور جديد */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography fontWeight="bold" mb={2}>
          إضافة دور جديد
        </Typography>

        <TextField
          fullWidth
          label="اسم الدور"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* قائمة الصلاحيات */}
        <Box sx={{ maxHeight: 300, overflowY: "auto", mb: 3 }}>
          <FormGroup>
            {permissions.map((perm) => (
              <FormControlLabel
                key={perm.id}
                control={
                  <Checkbox
                    checked={selectedPermissions.includes(perm.name)}
                    onChange={() => handleTogglePermission(perm.name)}
                  />
                }
                label={perm.name}
              />
            ))}
          </FormGroup>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => {
              setRoleName("");
              setSelectedPermissions([]);
            }}
            disabled={Saving}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveRole}
            disabled={Saving}
          >
            {Saving ? "جاري الحفظ..." : "حفظ الدور"}
          </Button>
        </Stack>
      </Paper>

      {/* SnackBar */}
      <SnackBarCustom
        open={snack.open}
        title={snack.title}
        severity={snack.severity}
        onClose={() => setSnack({ ...snack, open: false })}
      />
    </Box>
  );
}
