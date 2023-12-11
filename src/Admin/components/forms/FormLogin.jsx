import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DadoImage from "../css/Dado.png";
import { useAuth } from "../../../auth/AuthContext";
import { jwtDecode } from "jwt-decode";

const URI = "http://localhost:8000/usuario/logAdmin";

const FormLogin = ({ onLoginSuccess }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const { login, token } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    // Verifica si ya hay un token
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        navigateTo("/admin/dashboard"); // Redirige directamente a Feed
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
        console.log("Inicio de sesión exitoso, Token:", token);
        login(token);
        onLoginSuccess();
        navigateTo("/admin/dashboard");
        alert("Ingresado correctamente");
      } else {
        console.log("La respuesta del servidor no contiene un token.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión: ", error);
    } finally {
      setNickname("");
      setPassword("");
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='col-3'>
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
          <Link
            className='btn btn-outline-success btn-block'
            onClick={handleLogin}
            to='/admin/dashboard'>
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
