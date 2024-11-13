import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Suspense } from "./components/suspense/index.tsx";
import "./index.css";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <Suspense>
      <App />
    </Suspense>
  </ThemeProvider>,
);
