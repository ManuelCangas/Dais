import { useState, useEffect } from "react";
import axios from "axios";
import DadoImage from "../css/dado.png";
import "../css/Login.css";
import { useAuth } from "../../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  }, []);

  const notifyLogin = () => {
    toast.success("Ingresado correctamente", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyError = () => {
    toast.error("Verifique sus credenciales", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
        notifyLogin();
        onLoginSuccess();
        setTimeout(() => {
          navigateTo("/app/feed");
        }, 3000);
      } else {
        notifyError();
        console.log("La respuesta del servidor no contiene un token.");
      }
    } catch (error) {
      notifyError();
      console.error("Error durante el inicio de sesión:", error.message);
    } finally {
      setNickname("");
      setPassword("");
    }
  };

  return (
    <section className='container h-100'>
      <div className='d-flex justify-content-center align-items-center h-100'>
        <ToastContainer />
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
            <div className='form-outline mb-5'>
              <input
                className='form-control'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className='form-label text-muted'>Password</label>
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
