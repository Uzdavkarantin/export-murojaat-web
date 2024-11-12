import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      cache: false,
      include: ["./src/**/*.tsx", "./src/**/*.ts"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
