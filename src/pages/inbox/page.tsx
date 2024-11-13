import { Button } from "@/components/ui/button";
import { Sidebar } from "./components";
import { Outlet, useOutlet } from "react-router-dom";

const Page = () => {
  const outlet = useOutlet();

  return (
    <div className="flex w-full h-[calc(100vh-64px)]">
      <div className="w-full sm:w-60 md:w-72">
        <Sidebar />
      </div>

      <main className="sm:flex w-0 sm:w-[calc(100%-240px)] md:w-[calc(100%-288px)]">
        <Outlet />
        {!outlet && (
          <div className="w-full h-full sm:flex hidden items-center justify-center">
            <Button variant="outline" className="rounded-full px-10">
              Select a chat to start messaging
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
