"use client";

import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Hoc } from "./hoc";
import ErrorBoundary from "@/pages/error";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { sidebarMenuOptions } from "@/constants/sidebar";
import { useEffect, useState } from "react";
import queryString from "query-string";

const Layout = () => {
  const location = useLocation();
  const params = useParams();
  const { name } = queryString.parse(window.location.search);

  const [pageTitle, setPageTitle] = useState<string>("");

  useEffect(() => {
    const l = location.pathname.split("/")[1];
    let arr = sidebarMenuOptions.filter(item => item.url === `/${l}`);
    if (arr.length > 0) {
      setPageTitle(arr[0].title);
    }
  }, [location]);

  return (
    <ErrorBoundary>
      <Hoc>
        <section className="">
          <SidebarProvider
            style={
              {
                "--sidebar-width": "300px",
              } as React.CSSProperties
            }
          >
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 fixed bg-background z-10 w-full">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="block">
                      <Link to={location.pathname}>{pageTitle}</Link>
                    </BreadcrumbItem>
                    {params.id && (
                      <>
                        <BreadcrumbSeparator className="block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>{name}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
              <main className="pt-16">
                <Outlet />
              </main>
            </SidebarInset>
          </SidebarProvider>
        </section>
      </Hoc>
    </ErrorBoundary>
  );
};

export default Layout;
