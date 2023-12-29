import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";
import { jwtDecode } from "jwt-decode";
import { PieChart } from "react-minimal-pie-chart";

const URI = "http://localhost:8000/post/report/";

const ReportList = ({ reports }) => (
  <div>
    {reports.map((report) => (
      <ReportCard key={report.post.id} report={report} />
    ))}
  </div>
);

const ReportCard = ({ report }) => {
  let eventType = "";

  // Determinar el tipo de evento
  switch (report.post.tipo_id) {
    case 1:
      eventType = "Evento";
      break;
    case 2:
      eventType = "Torneo";
      break;
    case 3:
      eventType = "Noticia";
      break;
    default:
      eventType = "Desconocido";
  }

  // Obtener solo la fecha (sin hora)
  const formattedDate = new Date(report.post.fecha).toLocaleDateString();

  return (
    <div className='card card-post m-2'>
      <div className='card-header'>{eventType}</div>
      <div className='card-body'>
        <p>Fecha: {formattedDate}</p>
        <p>Total Participantes: {report.participantes.length}</p>
        <p>
          Total Confirmados:{" "}
          {
            report.participantes.filter(
              (participant) => participant.asistencia === 1
            ).length
          }
        </p>
      </div>
    </div>
  );
};

const Report = () => {
  const { token, login } = useAuth();
  const [reports, setReports] = useState([]);

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const fetchReports = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        login(storedToken); // Si hay un token en localStorage, actualiza el estado con ese token
      }
      const response = await axios.get(`${URI}${userId}`);
      const data = response.data;
      setReports(data.reports);
    } catch (error) {
      console.error("Error al obtener informes:", error.message);
    }
  };

  // Efecto para cargar informes al montar el componente
  useEffect(() => {
    fetchReports();
  }, []); // Se ejecutará solo una vez al montar el componente

  const totalParticipants = reports.reduce(
    (total, report) => total + report.participantes.length,
    0
  );
  const attendedParticipants = reports.reduce(
    (total, report) =>
      total +
      report.participantes.filter((participant) => participant.asistencia === 1)
        .length,
    0
  );
  const absentParticipants = totalParticipants - attendedParticipants;

  // Calcular porcentajes
  const attendedPercentage = (attendedParticipants / totalParticipants) * 100;
  const absentPercentage = (absentParticipants / totalParticipants) * 100;

  console.log("attendedPercentage:", attendedPercentage);
  console.log("absentPercentage:", absentPercentage);

  return (
    <div className='container-fluid bg-color'>
      <div className='container pt-4'>
        <h2>Reportes</h2>
        <h3 className='text-muted'>Publicaciones</h3>
        <div className='d-flex'>
          <div className='flex-grow-1'>
            <ReportList reports={reports} />
          </div>
          <div style={{ marginLeft: "20px", textAlign: "center" }}>
            <div style={{ width: "300px", margin: "auto" }}>
              <h3>Asistencia</h3>
              <PieChart
                data={[
                  {
                    title: "Asistieron",
                    value: attendedPercentage,
                    color: "#4CAF50",
                  },
                  {
                    title: "No Asistieron",
                    value: absentPercentage,
                    color: "#FF5733",
                  },
                ]}
                radius={40}
                lineWidth={20}
                label={({ dataEntry }) =>
                  `${Math.round(dataEntry.percentage)}%`
                }
                labelStyle={{ fontSize: "8px", fontFamily: "sans-serif" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
