import React from "react";
import Navbar from "./components/common/Navbar";
import { useAuth } from "../auth/AuthContext";
import { Outlet } from "react-router-dom";

function Admin() {
  const { isLoggedIn } = useAuth();

  return (
    <div className='vh-100 vw-100'>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
    </div>
  );
}

export default Admin;
