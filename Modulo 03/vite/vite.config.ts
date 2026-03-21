import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { analyzer } from "vite-bundle-analyzer";
import compression from "vite-plugin-compression2";

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    analyzer({
      analyzerMode: "static",
      openAnalyzer: false,
      reportTitle: "Bundle Analysis Module 03",
      fileName: "bundle-analysis-module-03.html",
    }),
    compression({
      algorithms: ["gzip", "brotliCompress"],
      threshold: 0,
    }),
  ],
});
