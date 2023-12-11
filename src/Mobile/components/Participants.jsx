import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";

const URI = "http://localhost:8000/participante/";

const Participants = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState();
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    // Utiliza Axios para realizar la solicitud al servidor
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${URI}usuarios/${id}`);
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

  const handleSelectParticipant = async (participante) => {
    try {
      // Realiza la solicitud para obtener el código QR del participante seleccionado
      const response = await axios.get(
        `${URI}${id}/${participante.idUser}/codigoqr`
      );
      console.log(response.data.codigoQR);
      setQrCode(response.data.codigoQR);
      setSelectedParticipant(participante);
    } catch (error) {
      console.error("Error fetching QR code:", error.message);
    }
  };

  const handleCloseQR = () => {
    setSelectedParticipant(null);
    setQrCode(null);
  };

  return (
    <div className='container-fluid bg-image'>
      <h2 className='container pt-4 pb-4'>Participantes</h2>
      <div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='text-muted'>#</th>
              <th className='text-muted'>Nombre de usuario</th>
              <th className='text-muted'>Apodo de usuario</th>
              <th className='text-muted'>Imprimir código QR</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participante) => (
              <tr key={participante.id}>
                <th scope='row'>{participante.id}</th>
                <th>{participante.nombre}</th>
                <th>{participante.nickname}</th>
                <th className='col-2'>
                  <button
                    className='btn btn-outline-success bi bi-qr-code'
                    onClick={() =>
                      handleSelectParticipant(participante)
                    }></button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedParticipant && (
        <div>
          <h3>Código QR de {selectedParticipant.nombre}</h3>
          {qrCode ? (
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                lineHeight: "1.2",
              }}>
              {qrCode}
            </pre>
          ) : (
            <div className='alert alert-danger'>
              Error al cargar el código QR.
            </div>
          )}
          <button onClick={handleCloseQR}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Participants;
