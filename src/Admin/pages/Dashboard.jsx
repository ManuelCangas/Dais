import React from "react";
import Dashadmin from "../components/lists/DashAdmin";
import ReportUsuario from "../components/lists/ReportUsuario";

const Dashboard = () => {
  return (
    <div className='container pt-4'>
      <h2 className='ms-3 mb-3'>Dashboard</h2>
      <div className='row'>
        <div className='col-6'>
          <Dashadmin />
        </div>
        <div className='col-6'>
          <ReportUsuario />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
