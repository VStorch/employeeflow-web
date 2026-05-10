import type React from "react";
import { isAuthenticated } from "../services/auth";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
