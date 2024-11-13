import { Button } from "@/components/ui/button";
import { Sidebar } from "./components";
import { Outlet, useOutlet } from "react-router-dom";

const Page = () => {
  const outlet = useOutlet();

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar />
      <main className="flex-1">
        {!outlet && (
          <div className="w-full h-full flex items-center justify-center">
            <Button variant="outline" className="rounded-full px-10">
              Select a chat to start messaging
            </Button>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Page;
