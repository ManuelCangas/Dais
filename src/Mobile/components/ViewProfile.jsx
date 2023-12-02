import React from "react";
import { Link } from "react-router-dom";

const ViewProfile = () => {
  // Pedir datos
  // Simulación de datos de usuario (puedes reemplazarlo con datos reales)
  const userData = {
    nickname: "Dado",
    name: "El Dado",
    email: "dado.dado@hotmail.com",
    // ... otros datos del usuario
  };

  return (
    <div className='container pt-5'>
      <div className='row justify-content-center'>
        <div className='card text-center p-5 shadow col-6'>
          <div className='fs-1'>
            <i className='bi bi-person-circle'></i>
          </div>
          <h2 className='card-title fs-2 mb-3'>{userData.name}</h2>
          <p className='card-text fs-4 text-muted mb-3'>
            Usuario: {userData.nickname}
          </p>
          <p className='card-text fs-4 text-muted mb-4'>
            Correo: {userData.email}
          </p>
          <div className='d-flex justify-content-center'>
            <Link
              className='btn btn-outline-success me-3'
              to='/app/edit/profile'>
              Editar Perfil
            </Link>
            <button className='btn btn-outline-danger'>Cerrar Sesión</button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
