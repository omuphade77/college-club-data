import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute — Wraps any route that requires authentication.
 * Checks for a JWT token in localStorage. If missing, redirects to /login.
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
