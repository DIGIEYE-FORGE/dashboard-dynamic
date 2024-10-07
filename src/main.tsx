import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { RouterProvider } from "@/components/router-provider";
import { SWRConfig } from "swr";

const body = document.body;
const theme = localStorage.getItem("theme") || "system";
body.classList.add(theme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        refreshInterval: 30,
      }}
    >
      <RouterProvider />
    </SWRConfig>
  </StrictMode>
);
