import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import axios from "axios";

const ViewProfile = () => {
  const { token } = useAuth();

  const navigateTo = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.error("No hay token de autenticación.");
          return;
        }
        const response = await axios.post(
          "http://localhost:8000/usuario/perfil",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  if (!token || !userData) {
    // Manejar el caso en que no hay token o datos de usuario
    return (
      <div>
        No se ha iniciado sesión o no se pueden cargar los datos del usuario.
      </div>
    );
  }

  return (
    <div className='container pt-5'>
      <div className='row justify-content-center'>
        <div className='card text-center p-5 shadow col-6'>
          <div className='fs-1'>
            <i className='bi bi-person-circle'></i>
          </div>
          <h2 className='card-title fs-2 mb-3'>
            {userData.nombre || "Nombre"}
          </h2>
          <p className='card-text fs-4 text-muted mb-3'>
            Usuario: {userData.nickname}
          </p>
          <p className='card-text fs-4 text-muted mb-4'>
            Correo: {userData.mail}
          </p>
          <div className='d-flex justify-content-center'>
            <Link
              className='btn btn-outline-warning btn-sm me-3'
              to='/app/feed'>
              Atras
            </Link>
            <Link
              className='btn btn-outline-success btn-sm me-3'
              to='/app/edit/profile'>
              Editar Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
