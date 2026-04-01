import React from "react";
import { createRoot } from "react-dom/client";
import { HelloWorldComponent } from "./helloWorldComponent";
import logo from "./content/logo_1.png";

console.log(`Api base: ${process.env.API_BASE}`);

const root = createRoot(document.getElementById("root")!);
root.render(
  <div>
    <h1>Módulo 3 - Webpack (parte 2)</h1>
    <HelloWorldComponent />
    <img src={logo} alt="Logo 1" style={{ width: 100 }} />
  </div>,
);
