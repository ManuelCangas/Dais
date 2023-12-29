import React from "react";
import LoginUsuario from "../components/Login";

function Login() {
  const handleLoginSuccess = () => {
    console.log("Login exitoso");
  };

  return (
    <div className='container-fluid bg-image'>
      <LoginUsuario onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default Login;
