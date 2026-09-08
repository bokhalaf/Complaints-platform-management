import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";


import LoginPage from "pres/pages/login/LoginPage";
import { ProtectedRoute } from "pres/component/protectedRoute";
import { GuestRoute } from "pres/component/guestRoute";
import Layout from "pres/component/Layout";
import { AuthProvider } from "pres/context/authContext";
import UserPage from "pres/pages/Users/UserPage";
import ComplaintPage from "pres/pages/complaints/complaint";
import DashboardPage from "pres/pages/dashborad.jsx/dasboradPage";
import ComplaintsPage from "pres/pages/complaints/complaints";
import LogPage from "pres/pages/log/logPage";
import RolesPage from "pres/pages/roles";
import DepartmentPage from "pres/pages/department/departmentPage";
import { AdminRoute } from "pres/component/AdminRoute";


 function App() {
  localStorage.clear();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route
          path="/login"
          element={
            <GuestRoute token={token}>
              <Layout />
            </GuestRoute>
          }
          >
          <Route index element={<CitizensPage />} />
          <Route path="profile" element={<LoginPage />} />
        </Route> */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
>
  <Route path="complaints" element={<ComplaintsPage />} />
  <Route path="complaints/:id" element={<ComplaintPage />} />

  <Route
    element={
      <AdminRoute>
        <Outlet />
      </AdminRoute>
    }
  >
      <Route index element={<DashboardPage />} />

    <Route path="users" element={<UserPage />} />
    <Route path="roles" element={<RolesPage />} />
    <Route path="departments" element={<DepartmentPage />} />
    <Route path="log" element={<LogPage />} />
  </Route>
</Route>

        <Route
          path="*"
          element={<Navigate to={  "/login"} replace />}
        />
      </>
    )
  );

  return(
  
  <>
  <AuthProvider>
    <RouterProvider router = {router}/>
  </AuthProvider>
  </>
  );
}

export default App;
