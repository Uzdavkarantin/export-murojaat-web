import { Inbox, LayoutDashboard, UserSearch } from "lucide-react";
import { ROUTER } from "./routers";

export const sidebarMenuOptions = [
  {
    title: "Inbox",
    url: ROUTER.INBOX,
    icon: Inbox,
  },
  {
    title: "Dashboard",
    url: ROUTER.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: ROUTER.USERS,
    icon: UserSearch,
  },
];
