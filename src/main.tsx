import { Toaster } from "sonner";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Suspense } from "./components/suspense/index.tsx";
import "./index.css";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./configs/react-query.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <App />
      </QueryClientProvider>
    </Suspense>
  </ThemeProvider>,
);
