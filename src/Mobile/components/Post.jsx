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
              <p className='text-muted'>N° de participantes: 0</p>
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
              <Link className='btn btn-outline-success' to='/'>
                Participantes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
