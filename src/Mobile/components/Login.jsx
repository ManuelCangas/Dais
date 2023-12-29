import { useState, useEffect } from "react";
import axios from "axios";
import DadoImage from "../css/dado.png";
import "../css/Login.css";
import { useAuth } from "../../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const URI = "http://localhost:8000/usuario/login-tienda";

const LoginUsuario = ({ onLoginSuccess }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const { login, token } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    // Verifica si ya hay un token
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        navigateTo("/app/feed"); // Redirige directamente a Feed
      }
    }
  }, [token, navigateTo]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${URI}`, {
        nickname: nickname,
        password: password,
      });
      if (response.data && response.data.token) {
        const token = response.data.token;
        console.log("Token:", token);
        login(token);
        onLoginSuccess();
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
            <button
              className='btn btn-outline-success btn-block'
              onClick={handleLogin}>
              Log in
            </button>
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
