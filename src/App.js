import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const App = () => {
  return (
    <>
      <Box
        sx={{ backgroundColor: "#14161a", color: "white", minHeight: "100vh" }}
      >
        <Header />
        <Outlet />
      </Box>
    </>
  );
};

export default App;
