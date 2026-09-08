import { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ShieldImage from "../../../assets/images/shield-check.png";
import { useNavigate } from "react-router-dom";

import { handleApiError } from "core/errors/handleApiError";
import { provideLoginUseCase } from "./di/auth.di";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

import { AuthContext } from "pres/context/authContext";
import SnackBarCustom from "pres/component/snackBar";

export default function LoginPage() {
    const { setAuthData } = useContext(AuthContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
const navigate = useNavigate();

  const loginUseCase = provideLoginUseCase();

 const handleLogin = async (e) => {
  e.preventDefault();

  if (!selectedRole) {
    setError("الرجاء اختيار نوع الدخول");
    return;
  }

  setLoading(true);
  setError("");

  try {
 const { user, tokens, role } = await loginUseCase.execute(email, password, selectedRole);

    console.log(user.name,tokens,role);

setAuthData({
  name: user.name,          
  token: tokens.access_token,
  refreshToken: tokens.refresh_token,
  role: role         
});
 

console.log(user.id);

setSnackbarOpen(true);

 setTimeout(() => {
    navigate("/dashboard"); 
  }, 1500);

  } catch (err) {
    handleApiError(err, setError);
  } finally {
    setLoading(false);
  }
};




  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ backgroundColor: "#f7f9fc", fontFamily: "Cairo"}}>
<SnackBarCustom
  open={snackbarOpen}
  onClose={() => setSnackbarOpen(false)}
  title="تم تسجيل الدخول بنجاح"
  severity="success"
/>


<Box textAlign="center" sx={{  mr: 5  }} >
  <img 
    src={ShieldImage} 
    alt="shield" 
    style={{ width: "350px", height: "350px" }} 
  />
</Box>
      <Card sx={{ width: 380, p: 3, borderRadius: 3 }}>
        <CardContent>
           <Box textAlign="center" mb={1}>
            <VerifiedUserIcon sx={{ fontSize: 45, color: "#1976d2" }} />
          </Box>

          <Typography variant="h5" mb={3} textAlign="center" fontWeight="bold">
            تسجيل الدخول إلى لوحة التحكم
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="البريد الإلكتروني "
              type="text"
              fullWidth
              size="small"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                "& .MuiInputLabel-root": { fontSize: "14px" }
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

         
            <TextField
              label="كلمة المرور"
              type={showPassword ? "text" : "password"}
              fullWidth
              size="small"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                "& .MuiInputLabel-root": { fontSize: "14px" }
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" mb={1} textAlign="center">
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{ py: 1.3, mt: 1, borderRadius: "10px" }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : (
                "تسجيل الدخول"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card sx={{ p: 2, width: 220, borderRadius: 3, ml: 2 }}>
  <Typography variant="h6" mb={2} textAlign="center" fontWeight="bold">
نوع الدخول  </Typography>

  <Card
    onClick={() => setSelectedRole("admin")}
    sx={{
      p: 2,
      mb: 2,
      cursor: "pointer",
      textAlign: "center",
      borderRadius: 3,
      border: selectedRole === "admin" ? "2px solid #1976d2" : "2px solid #ccc",
      backgroundColor: selectedRole === "admin" ? "#e3f2fd" : "#fff",
      transition: "0.3s",
    }}
  >
    <Typography fontWeight="bold">Admin</Typography>
        <AdminPanelSettingsIcon fontSize="large"></AdminPanelSettingsIcon>

  </Card>

  <Card 
    onClick={() => setSelectedRole("employee")}
    sx={{
      p: 2,
      cursor: "pointer",
      textAlign: "center",
      borderRadius: 3,
      border: selectedRole === "employee" ? "2px solid #1976d2" : "2px solid #ccc",
      backgroundColor: selectedRole === "employee" ? "#e3f2fd" : "#fff",
      transition: "0.3s",
    }}
  >
    <Typography fontWeight="bold">Employee</Typography>
    <PersonIcon fontSize="large"></PersonIcon>
  </Card>
</Card>


    </Box>
  );
}

