import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const URI = "http://localhost:8000/participante/";

const Participants = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Utiliza Axios para realizar la solicitud al servidor
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${URI}usuarios/${id}`);
        console.log(response.data);
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error.message);
      }
    };
    if (id) {
      fetchParticipants();
    }
  }, [id]);

  if (!id || !participants) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container-fluid bg-image'>
      <div className='container col'>
        <h2 className='container pt-4 pb-4'>Participantes</h2>
        <div className='col-6'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th className='text-muted'>#</th>
                <th className='text-muted'>Nombre de usuario</th>
                <th className='text-muted'>Apodo de usuario</th>
                <th className='text-muted'>Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participante, index) => (
                <tr key={participante.id}>
                  <th scope='row'>{index + 1}</th>
                  <th>{participante.nombre}</th>
                  <th>{participante.nickname}</th>
                  <th>
                    {participante.asistencia === 1
                      ? "confirmado"
                      : participante.asistencia === null
                      ? "No asistente"
                      : "participando"}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Participants;
