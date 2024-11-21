import { Inbox, LayoutDashboard } from "lucide-react";
import { ROUTER } from "./routers";

export const sidebarMenuOptions = [
  {
    title: "Dashboard",
    url: ROUTER.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: ROUTER.INBOX,
    icon: Inbox,
  },
];
