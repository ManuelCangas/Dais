import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function Platform() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Platform;