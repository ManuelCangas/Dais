import React, { useState, useEffect } from "react";
import axios from "axios";

function ReportUsuario() {
  const URIpost = "http://localhost:8000/post";
  const URIusuario = "http://localhost:8000/usuario";

  const [userCount, setUserCount] = useState(0);
  const [subsCount, setSubsCount] = useState(0);

  const getUsuarios = async () => {
    try {
      const response = await axios.get(URIusuario);
      setUserCount(response.data.length); // Suponiendo que la respuesta contiene un array de usuarios
    } catch (error) {
      console.error("Error al capturar usuarios:", error.message);
    }
  };

  const getSuscriptores = async () => {
    try {
      const response = await axios.get(URIpost);
      setSubsCount(response.data.length);
    } catch (error) {
      console.error("Error al capturas valor:", error.message);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);
  return (
    <section>
      <div className='row'>
        <div className='card col m-2 '>
          <h5 className='d-flex justify-content-center  p-2'>Usuarios</h5>
          <div className='card-body'>
            <h6 className='d-flex justify-content-center'>
              Usuarios registrados
            </h6>
            <div className='d-flex justify-content-center '>
              <i className='bi bi-people-fill fs-1'></i>
            </div>
            <p className='d-flex justify-content-center'>{userCount}</p>
            <div>
              <p></p>
            </div>
          </div>
        </div>
        <div className='card col m-2'>
          <h5 className='d-flex justify-content-center p-2'>Usuarios</h5>
          <div className='card-body'>
            <h6 className='d-flex justify-content-center'>Suscriptores</h6>
            <div className='d-flex justify-content-center '>
              <i className='bi bi-star-fill fs-1'></i>
            </div>
            <p className='d-flex justify-content-center'>{subsCount}</p>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='card col m-2'>
          <h5 className='d-flex justify-content-center p-2'>Ingresos</h5>
          <div className='card-body'>
            <h6 className='d-flex justify-content-center'>Suscripciones</h6>
            <div className='d-flex justify-content-center'>
              <i className='bi bi-coin fs-1'></i>
            </div>
            <p className='d-flex justify-content-center'>{subsCount}</p>
          </div>
        </div>
        <div className='card col m-2'>
          <h5 className='d-flex justify-content-center p-2'>Publicaciones</h5>
          <div className='card-body'>
            <h6 className='d-flex justify-content-center col'>Activas</h6>
            <div className='d-flex justify-content-center'>
              <i className='bi bi-calendar-event-fill fs-1'></i>
            </div>
            <p className='d-flex justify-content-center'>0</p>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='card col m-2'>
          <h5 className='d-flex justify-content-center p-2'>Reportes</h5>
          <div className='row'>
            <p className='col btn btn-outline-success m-3'>Jugadores</p>
            <p className='col btn btn-outline-success m-3 '>Tiendas</p>
            <p className='col btn btn-outline-success m-3 '>Publicaciónes</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportUsuario;
