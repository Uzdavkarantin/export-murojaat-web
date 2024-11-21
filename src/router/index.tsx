import { ROUTER } from "@/constants/routers";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Layout = lazy(async () => await import("@/layout"));
const Dashboard = lazy(async () => await import("@/pages/dashboard"));
const Inbox = lazy(async () => await import("@/pages/inbox"));
const Chat = lazy(async () => await import("@/pages/chat"));
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
          element: <Navigate to={ROUTER.INBOX} />,
        },
        {
          path: ROUTER.INBOX,
          element: <Inbox />,
          children: [
            {
              path: ROUTER.INBOX + ":id",
              element: <Chat />,
            },
          ],
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
