import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Suspense } from "./components/suspense/index.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Suspense>
    <App />
  </Suspense>,
);
