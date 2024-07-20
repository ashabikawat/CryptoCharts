import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import CoinPage from "../Pages/CoinPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/coins/:id",
        element: <CoinPage />,
      },
    ],
  },
]);

export default router;
