import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DadoImage from "../css/dado.png";
import "../css/Register.css";

const RegisterUser = () => {
  const URI = "http://localhost:8000/";

  const [nickname, setNickname] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [rol, setRol] = useState(2);

  const handleSignUp = async () => {
    try {
      if (!nickname || !nombre || !correo || !password || !repeatPassword) {
        alert("Todos los campos son obligatorios");
        return;
      }
      if (password !== repeatPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      const response = await axios.post(URI + "usuario", {
        nickname: nickname,
        nombre: nombre,
        mail: correo,
        password: password,
        usuario_rol: rol,
      });
      console.log("Respuesta del servidor:", response.data);
      alert("Usuario registrado con exito");
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };

  return (
    <section className='container-fluid bg-image'>
      <div className='d-flex justify-content-center align-items-center h-100'>
        <div className='col-4'>
          <form className='bg-white rounded-5 shadow-5-strong p-4'>
            <div className='form-outline mb-3'>
              <div className='d-flex justify-content-center mb-4 '>
                <img className='img-logo' src={DadoImage} alt='Dais' />
              </div>
              <input
                className='form-control'
                type='text'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <label className='form-label text-muted'>Apodo</label>
              <input
                className='form-control'
                type='text'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <label className='form-label text-muted'>Nombre</label>
              <input
                className='form-control'
                type='text'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <label className='form-label text-muted'>Correo</label>
              <input
                className='form-control'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className='form-label text-muted'>Contraseña</label>
              <input
                className='form-control'
                type='password'
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <label className='form-label text-muted'>
                Repetir contraseña
              </label>
            </div>
            <div>
              <Link
                className='btn btn-outline-success btn-block ms-3'
                onClick={handleSignUp}>
                Registrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterUser;
