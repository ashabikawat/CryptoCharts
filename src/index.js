import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { CryptoContext } from "./contexts/CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CryptoContext>
      <RouterProvider router={router} />
    </CryptoContext>
  </React.StrictMode>
);
