import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuth.store";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);

  const isAuthorized = isAuthenticated && Boolean(accessToken);

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
}