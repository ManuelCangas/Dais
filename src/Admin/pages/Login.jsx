import React from "react";
import FormLogin from "../components/forms/FormLogin";

function Login() {
  const handleLoginSuccess = () => {
    console.log("Login exitoso");
  };

  return (
    <div className='container-fluid bg-image'>
      <FormLogin onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default Login;
