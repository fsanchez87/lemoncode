import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), checker({ typescript: true }), react()],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[path][name]__[local]--[hash:base64:5]",
    },
  },
});
