import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuth.store";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const accessToken = useAuthStore((s) => s.accessToken);

  return isAuthenticated && accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}