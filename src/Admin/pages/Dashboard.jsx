import React, { useEffect } from "react";
import Report from "../components/lists/Report";
import Calendario from "../components/lists/Calendar";
import { useAuth } from "../../auth/AuthContext";

const Dashboard = () => {
  const { login, token } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      login(storedToken); // Si hay un token en localStorage, actualiza el estado con ese token
    }
  }, [login, token]);

  return (
    <div className='container-fluid pt-4 bg-image'>
      <h2 className='ms-3 mb-3'>Dashboard</h2>
      <div className='row'>
        <div className='col-6'>
          <Calendario />
        </div>
        <div className='col-6'>
          <Report />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
