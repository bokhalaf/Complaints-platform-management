import { Navigate } from "react-router-dom";

export const GuestRoute = ({  children }) => {
      const token = localStorage.getItem("access_token");

  if (token) {
    
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};


