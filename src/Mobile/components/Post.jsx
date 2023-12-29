import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const URI = "http://localhost:8000/post/";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${URI}${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleFinalizarClick = async () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas marcar esta publicación como finalizada?"
    );
    if (confirmacion) {
      try {
        // Realizar la solicitud PATCH al servidor para marcar la publicación como finalizada
        await axios.patch(`${URI}${id}`, {
          estado: false,
        });

        // Actualizar el estado local para reflejar el cambio
        setPost((prevPost) => ({
          ...prevPost,
          estado: false,
        }));

        // Puedes hacer otras cosas después de marcar como finalizada, como recargar la página o actualizar la interfaz de usuario.
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
    <div className='container pt-4 h-100'>
      <div className='card align-content-center'>
        <div className='row g-0'>
          {/* Columna de la imagen */}
          <div className='col-md-6'>
            {post.rutaImg && (
              <div className='aspect-ratio-container'>
                <img
                  className='card-img-top aspect-ratio-content'
                  src={`http://localhost:8000/Imagenes/${post.rutaImg}`}
                  alt='Imagen de Publicación'
                />
              </div>
            )}
            {/* Datos adicionales debajo de la imagen */}
            <div className='d-flex justify-content-between  card-footer'>
              <p className='text-muted'>
                Fecha de inicio: {new Date(post.fecha).toLocaleString()}
              </p>
              <p className='text-muted'>
                Ubicación de evento: {post.ubication || "No disponible"}
              </p>
            </div>
          </div>

          {/* Columna del texto */}
          <div className='col-md-6'>
            <div className='card-body'>
              <h2 className='card-title'>{post.titulo}</h2>
              <p className='card-text mt-3 lh-lg'>{post.description}</p>
              {/* Otros valores del texto aquí */}
            </div>
            <div className='d-flex justify-content-end me-3'>
              {post.estado ? (
                <>
                  <Link
                    className='btn btn-outline-warning btn-sm me-3'
                    to='/app/feed'>
                    Atrás
                  </Link>
                  <Link
                    className='btn btn-outline-success btn-sm me-3'
                    to={`/app/view/post/participants/${post.id}`}>
                    Participantes
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
                    to='/app/feed'>
                    Atrás
                  </Link>
                  <Link
                    className='btn btn-outline-success btn-sm me-3'
                    to={`/app/view/post/participants/${post.id}`}>
                    Participantes
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
