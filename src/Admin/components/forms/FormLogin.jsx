import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DadoImage from "../css/Dado.png";
import { useAuth } from "../../../auth/AuthContext";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URI = "http://localhost:8000/usuario/login-admin";

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
        setTimeout(() => {
          onLoginSuccess();
          navigateTo("/admin/dashboard");
        }, 3000);
      } else {
        console.log("La respuesta del servidor no contiene un token.");
      }
    } catch (error) {
      notifyError();
      console.error("Error en el inicio de sesión: ", error);
    } finally {
      setNickname("");
      setPassword("");
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <ToastContainer />
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
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className='form-label text-muted'>Password</label>
          </div>
          <Link
            className='btn btn-outline-success btn-block'
            onClick={handleLogin}
            to='/admin/dashboard'>
            Log in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
