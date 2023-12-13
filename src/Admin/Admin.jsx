import React from "react";
import Navbar from "./components/common/Navbar";
import { useAuth } from "../auth/AuthContext";
import { Outlet } from "react-router-dom";

function Admin() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
    </div>
  );
}

export default Admin;
