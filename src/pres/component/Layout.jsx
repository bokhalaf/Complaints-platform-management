import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "لوحة التحكم";
    if (path === "/dashboard/complaints") return "الشكاوي";
    if (path === "/dashboard/log") return "المراقبة";
    if (path === "/dashboard/users") return "المستخدمون";
    if (path === "/dashboard/roles") return "الادوار";
    if (path === "/dashboard/departments") return "الاقسام";


    return "الصفحة";
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", direction: "ltr" }}>

      <SideBar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        <Header pageTitle={getPageTitle()} />

        <div style={{ padding: "20px", direction: "rtl" }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}
