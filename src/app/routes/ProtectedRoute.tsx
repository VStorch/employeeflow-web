import type React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../features/auth/services/authService";

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
