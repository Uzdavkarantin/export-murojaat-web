import { ROUTER } from "@/constants/routers";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Layout = lazy(async () => await import("@/layout"));
const Dashboard = lazy(async () => await import("@/pages/dashboard"));
const Users = lazy(async () => await import("@/pages/users"));
const Login = lazy(async () => await import("@/pages/login"));
const NotFound = lazy(async () => await import("@/pages/not-found"));

export const router = createBrowserRouter(
  [
    // ADMIN
    {
      path: ROUTER.HOME,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to={ROUTER.USERS} />,
        },
        {
          path: ROUTER.USERS,
          element: <Users />,
        },
        {
          path: ROUTER.DASHBOARD,
          element: <Dashboard />,
        },
      ],
    },

    // AUTH
    {
      path: ROUTER.LOGIN,
      element: <Login />,
    },

    // NOT FOUND
    {
      path: ROUTER.NOT_FOUND,
      element: <NotFound />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);
