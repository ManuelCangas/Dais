import React from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function Platform() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
    </div>
  );
}

export default Platform;
