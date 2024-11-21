import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { sidebarMenuOptions } from "@/constants/sidebar";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "Karantin agentligi",
    email: "info@karantin.uz",
    avatar: "/man.png",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-14" />
          <h2 className="text-[10px] font-bold uppercase ml-2">
            O‘zbekiston Respublikasi Qishloq xo‘jaligi vazirligi huzuridagi O‘simliklar Karantini va
            Himoyasi Agentligi
          </h2>
        </div>
        <SidebarMenu>
          {sidebarMenuOptions.map(item => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={`/${location.pathname.split("/")[1]}` === item.url}
                onClick={() => (isMobile ? toggleSidebar() : null)}
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>{/* We create a SidebarGroup for each parent. */}</SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
