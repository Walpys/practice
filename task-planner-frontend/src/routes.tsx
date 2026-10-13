import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import AuthLayout from "./core/AuthLayout";
import MainLayout from "./core/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ErrorPage, RouteErrorPage } from "./components/shared/ErrorPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: <MainLayout />,
        errorElement: <RouteErrorPage />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
            errorElement: <RouteErrorPage />,
          },
          {
            path: '/cabinet',
            element: <ProfilePage />,
            errorElement: <RouteErrorPage />,
          },
          {
            path: '/',
            element: <Navigate to="/dashboard" replace />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <ErrorPage statusCode={404} />,
  },
])