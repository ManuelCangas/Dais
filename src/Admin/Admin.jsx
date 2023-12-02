import React from "react";
import Navbar from "./components/common/Navbar";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="vh-100 vw-100">
      <Navbar />
      <Outlet/>
    </div>
  );
}

export default Admin;
