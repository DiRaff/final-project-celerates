import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  if (!token || user.role !== "admin") {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
};

export default AdminRoute;
