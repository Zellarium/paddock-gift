import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/paddock-gift/",
  plugins: [react()],
  server: {
    allowedHosts: ["terminal.local"],
  },
});
