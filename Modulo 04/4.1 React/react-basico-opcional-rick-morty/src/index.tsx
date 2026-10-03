import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { App } from "./app";
import { theme } from "./theme";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // `injectFirst` inyecta los estilos de MUI antes que los CSS Modules, de forma
  // que las clases locales pueden sobrescribir los estilos base de MUI.
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StyledEngineProvider>
);
