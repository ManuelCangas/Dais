import React from "react";

const RepoUsuarios = () => {
  const [historialParticipacion, setHistorialParticipacion] = useState(null);
  const [estadisticasInicioSesion, setEstadisticasInicioSesion] =
    useState(null);
  const [detallesPerfil, setDetallesPerfil] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener estadísticas de historial de participación en eventos
        const historialParticipacionResponse = await axios.get(
          "http://localhost:8000/usuarios/historial-participacion"
        );
        setHistorialParticipacion(
          historialParticipacionResponse.data.historialParticipacion
        );

        // Obtener estadísticas de inicio de sesión
        const estadisticasInicioSesionResponse = await axios.get(
          "http://localhost:8000/usuarios/estadisticas-inicio-sesion"
        );
        setEstadisticasInicioSesion(
          estadisticasInicioSesionResponse.data.estadisticasInicioSesion
        );

        // Obtener detalles del perfil
        const detallesPerfilResponse = await axios.get(
          "http://localhost:8000/usuarios/detalles-perfil"
        );
        setDetallesPerfil(detallesPerfilResponse.data.detallesPerfil);
      } catch (error) {
        console.error("Error al obtener estadísticas del usuario:", error);
      }
    };

    // Llamada a la función para obtener datos
    fetchData();
  }, []);

  return (
    <div>
      <h3>Informe de Usuarios Jugadores</h3>

      {/* Sección de Historial de Participación en Eventos */}
      <div>
        <h4>Historial de Participación en Eventos</h4>
        {/* Mostrar aquí las estadísticas relacionadas con el historial de participación */}
        {historialParticipacion && (
          <div>
            <p>
              Eventos Participados: {historialParticipacion.eventosParticipados}
            </p>
            {/* Otras métricas relacionadas con el historial de participación */}
          </div>
        )}
      </div>

      {/* Sección de Estadísticas de Inicio de Sesión */}
      <div>
        <h4>Estadísticas de Inicio de Sesión</h4>
        {/* Mostrar aquí las estadísticas relacionadas con el inicio de sesión */}
        {estadisticasInicioSesion && (
          <div>
            <p>
              Intentos de inicio de sesión hoy:{" "}
              {estadisticasInicioSesion.intentosInicioSesionHoy}
            </p>
            <p>
              Inicio de sesión exitoso hoy:{" "}
              {estadisticasInicioSesion.inicioSesionExitosoHoy}
            </p>
            <p>
              Inicio de sesión fallido hoy:{" "}
              {estadisticasInicioSesion.inicioSesionFallidoHoy}
            </p>
            {/* Otras métricas relacionadas con el inicio de sesión */}
          </div>
        )}
      </div>

      {/* Sección de Detalles del Perfil */}
      <div>
        <h4>Detalles del Perfil</h4>
        {/* Mostrar aquí los detalles del perfil del usuario */}
        {detallesPerfil && (
          <div>
            <p>Edad: {detallesPerfil.edad}</p>
            <p>Sexo: {detallesPerfil.sexo}</p>
            {/* Otras métricas relacionadas con el perfil */}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoUsuarios;
