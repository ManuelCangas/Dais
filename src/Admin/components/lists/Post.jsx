import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Crud.css";

const URI1 = "http://localhost:8000/post/";
const URI2 = "http://localhost:8000/participante/";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${URI1}${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };
    const fetchParticipant = async () => {
      try {
        const response = await axios.get(`${URI2}usuarios/${id}`);
        console.log(response.data);
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error.message);
      }
    };
    if (id) {
      fetchPost();
      fetchParticipant();
    }
  }, [id]);

  const handleFinalizarClick = async () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas marcar esta publicación como finalizada?"
    );
    if (confirmacion) {
      try {
        await axios.patch(`${URI1}${id}`, {
          estado: false,
        });

        setPost((prevPost) => ({
          ...prevPost,
          estado: false,
        }));
      } catch (error) {
        console.error(
          "Error al intentar marcar como finalizada:",
          error.message
        );
      }
    }
  };

  if (!id || !post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container-fluid bg-color'>
      <div className='container pt-4'>
        <div className='row'>
          <div className='col-6'>
            <div className='card'>
              {post.rutaImg && (
                <div className='p-2'>
                  <img
                    className='card-img-top aspect-ratio-content'
                    src={`http://localhost:8000/Imagenes/${post.rutaImg}`}
                    alt='Imagen de Publicación'
                    style={{ width: "620px", height: "300px" }}
                  />
                </div>
              )}
              {/* Datos adicionales debajo de la imagen */}
              <div className='d-flex justify-content-between'>
                <p className='text-muted'>
                  Fecha de evento: {new Date(post.fecha).toLocaleString()}
                </p>
                <p className='text-muted'>
                  Ubicación de evento: {post.ubication || "No disponible"}
                </p>
              </div>
              <div className='card-body'>
                <h2 className='card-title'>{post.titulo}</h2>
                <p className='card-text mt-3 lh-lg'>{post.description}</p>
              </div>
              <div className='d-flex justify-content-end me-3 mb-3'>
                {post.estado ? (
                  <>
                    <Link
                      className='btn btn-outline-warning btn-sm me-3'
                      to='/admin/posts/listar'>
                      Atrás
                    </Link>
                    <button
                      className='btn btn-outline-danger btn-sm'
                      onClick={handleFinalizarClick}>
                      Finalizar
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      className='btn btn-outline-warning btn-sm me-3'
                      to='/admin/posts/listar'>
                      Atrás
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default Post;
