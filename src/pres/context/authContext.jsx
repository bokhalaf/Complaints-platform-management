import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  name: null,
  token: null,
  refreshToken: null,
  role: null,
  setAuthData: (data) => {}, 
  logout: () => {},
});


export const AuthProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const setAuthData = ({ name, token, refreshToken, role }) => {
    setName(name);
    setToken(token);
    setRefreshToken(refreshToken);
    setRole(role);

    localStorage.setItem("name", name);
    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setName(null);
    setToken(null);
    setRefreshToken(null);
    setRole(null);

    localStorage.removeItem("name");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ name, token, refreshToken, role, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
