import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PostDash.css";
import { useAuth } from "../../auth/AuthContext";

const URI = "http://localhost:8000/post/";

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    getPost();
  }, [token]);
  //Listar
  const getPost = async () => {
    try {
      //const token = /* Obtén el token del usuario */;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(URI, null, config);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };
  //Delete
  const deletePost = async (id) => {
    await axios.delete(`${URI}${id}`);
    getPost().then(() => {
      alert("Publicación eliminada");
    });
  };
  //HTML
  return (
    <section className='container-fluid scroll-container'>
      <div className='d-flex'>
        {posts.map((post) => (
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
      </div>
    </section>
  );
};

export default ListPost;
