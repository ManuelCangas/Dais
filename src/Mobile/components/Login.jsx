import { useState } from "react";
import React from "react";
import axios from "axios";
import DadoImage from "../css/dado.png";
import "../css/Login.css";
import { useAuth } from "../../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginUsuario = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigateTo = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/usuario/logTienda",
        {
          nickname: nickname,
          password: password,
        }
      );
      // Si el inicio de sesión es exitoso
      if (response.data && response.data.token) {
        const token = response.data.token;
        console.log("Inicio de sesión exitoso, Token:", token);
        login(token); // Almacena el token en el contexto
        navigateTo("/app/feed");
        alert("Ingresado correctamente");
      } else {
        console.log("La respuesta del servidor no contiene un token.");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error.message);
      alert("Error durante el inicio de sesión. Verifica tus credenciales.");
    } finally {
      setNickname("");
      setPassword("");
    }
  };

  return (
    <section className='container h-100'>
      <div className='d-flex justify-content-center align-items-center h-100'>
        <div className='col-4'>
          <form className='bg-white rounded-5 shadow-5-strong p-4'>
            <div className='form-outline mb-4'>
              <div className='d-flex justify-content-center mb-4 '>
                <img className='img-logo' src={DadoImage} alt='Dais' />
              </div>
              <input
                className='form-control'
                type='text'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <label className='form-label text-muted'>Nickname</label>
            </div>

            <div className='form-outline mb-4'>
              <input
                className='form-control'
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className='form-label text-muted'>Password</label>
            </div>
            <div className='row mb-4'>
              <div className='col text-center'>
                <a href='#!'>Forgot password?</a>
              </div>
            </div>
            <Link
              className='btn btn-outline-success btn-block'
              onClick={handleLogin}
              to='/app/feed'>
              Log in
            </Link>
            <Link
              className='btn btn-outline-success btn-block ms-3'
              to='/app/register'>
              Sign in
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginUsuario;
