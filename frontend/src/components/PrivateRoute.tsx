import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role: "admin" | "worker" | "user";
}

const PrivateRoute = ({ children, role }: Props) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user || user.role !== role) {
    return <Navigate to="/login/user" />; // or a 403 page
  }

  return <>{children}</>;
};

export default PrivateRoute;
