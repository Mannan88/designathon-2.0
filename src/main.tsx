import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/index.css";
import App from "@/App.tsx";
import LenisProvider from "./lib/Lenis";
// import AdminPortal from "./portal/AdminPortal";

// force page to start at top on every load/reload
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LenisProvider>
              <App />
            </LenisProvider>
          }
        />
        {/*<Route path="/todo/*" element={<AdminPortal />} />*/}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
