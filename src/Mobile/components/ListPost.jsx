import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PostDash.css";
import { useAuth } from "../../auth/AuthContext";
import { jwtDecode } from "jwt-decode";

const URI = "http://localhost:8000/post";

const ListPost = () => {
  const { token, login } = useAuth();
  const [posts, setPosts] = useState([]);

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      login(storedToken); // Si hay un token en localStorage, actualiza el estado con ese token
    }
    if (token && userId) {
      getPost();
    }
  }, [login, token]); // [] como segundo argumento significa que se ejecuta solo en el montaje inicial

  //Listar
  const getPost = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(`${URI}/tienda`, null, config);
      console.log("Respuesta de API:", res.data);
      setPosts(res.data || []);
    } catch (error) {
      console.error("Error al hacer fetching en post:", error);
    }
  };
  //Delete
  const deletePost = async (id) => {
    try {
      await axios.delete(`${URI}/${id}`);
      getPost();
      alert("Publicación eliminada");
    } catch (error) {
      console.error("Error deleting post:", error.message);
      alert("Error al eliminar la publicación");
    }
  };
  //HTML
  return (
    <section className='container-fluid scroll-container'>
      <h3 className='text-muted'>Activas</h3>
      <div>
        <div className='d-flex'>
          {posts
            .filter((post) => post.estado)
            .map((post) => (
              <div key={post.id}>
                <div className='card card-post m-4 bg-light'>
                  <div className='d-flex'>
                    <div className='col-auto'>
                      {post.rutaImg && (
                        <img
                          className='rounded-2'
                          src={`http://localhost:8000/Imagenes/${post.rutaImg}`}
                          alt='Imagen de publicación'
                          style={{ width: "210px", height: "150px" }}
                        />
                      )}
                    </div>
                    <div className='col-3 card-body d-flex flex-column'>
                      <h5 className='card-title'>{post.titulo}</h5>
                      <p className='card-text description flex-grow-1'>
                        {post.description}
                      </p>
                    </div>
                  </div>
                  <div className='card-footer d-flex'>
                    <div className='col-9 text-muted '>
                      {new Date(post.fecha).toLocaleString(Date)}
                    </div>
                    <div className='col-3'>
                      <Link
                        className='btn btn-outline-warning btn-sm me-2'
                        to={`/app/form/post/${post.id}`}>
                        <i className='bi bi-pencil-square'></i>
                      </Link>
                      <Link
                        className='btn btn-outline-danger btn-sm me-2'
                        onClick={() => deletePost(post.id)}>
                        <i className='bi bi-calendar-x'></i>
                      </Link>
                      <Link
                        className='btn btn-outline-success btn-sm'
                        to={`/app/view/post/${post.id}`}>
                        <i className='bi bi-eye'></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className='card card-plus m-4 bg-light'>
            <Link className='btn btn-outline-success' to='/app/post'>
              <i className='bi bi-plus-circle icon-size'></i>
            </Link>
          </div>
        </div>
        <h3 className='text-muted'>Finalizadas</h3>
        <div>
          {posts
            .filter((post) => !post.estado) // Filtrar publicaciones finalizadas
            .map((post) => (
              <div key={post.id}>
                <div className='card card-post m-4 bg-light'>
                  <div className='d-flex'>
                    <div className='col-auto'>
                      {post.rutaImg && (
                        <img
                          className='rounded-2'
                          src={`http://localhost:8000/Imagenes/${post.rutaImg}`}
                          alt='Imagen de publicación'
                          style={{ width: "210px", height: "150px" }}
                        />
                      )}
                    </div>
                    <div className='col-3 card-body d-flex flex-column'>
                      <h5 className='card-title'>{post.titulo}</h5>
                      <p className='card-text description flex-grow-1'>
                        {post.description}
                      </p>
                    </div>
                  </div>
                  <div className='card-footer d-flex'>
                    <div className='col-9 text-muted '>
                      {new Date(post.fecha).toLocaleString(Date)}
                    </div>
                    <div className='col-3'>
                      <Link
                        className='btn btn-outline-success btn-sm ms-5'
                        to={`/app/view/post/${post.id}`}>
                        <i className='bi bi-eye'></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ListPost;
