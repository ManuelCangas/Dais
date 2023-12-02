import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DadoImage from "../css/Dado.png";

const URI = "http://localhost:8000/usuario/logAdmin";

const FormLogin = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${URI}`, {
        nickname: nickname,
        password: password,
      });
      if (response.status === 200) {
        console.log("Inicio de sesión exitoso");
        navigateTo("/admin/dashboard");
      } else {
        console.log("Error en el servidor");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión: ", error);
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
              className='form-control card-input'
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
            to='/admin/dashboard'>
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
