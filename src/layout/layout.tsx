import { Outlet } from "react-router-dom";
import { Hoc } from "./hoc";
import ErrorBoundary from "@/pages/error";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Layout = () => {
  return (
    <ErrorBoundary>
      <Hoc>
        <section className="">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4">
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
