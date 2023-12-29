import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/ListPost.css";

const URI = "http://localhost:8000/post/";

const ListPost = () => {
  //Get
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState(""); // Nuevo estado para el filtro

  useEffect(() => {
    getPost();
  }, []);

  //Listar
  const getPost = async () => {
    const res = await axios.get(URI);
    setPosts(res.data);
    setFilteredPosts(res.data);
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
  //Filter
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    // Filtrar los posts basados en el título o cualquier otro criterio que desees
    const filtered = posts.filter((post) =>
      post.titulo.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  //HTML
  return (
    <section className='container'>
      <div className='mb-3'>
        <label htmlFor='filter' className='form-label'>
          Filtrar por título:
        </label>
        <input
          type='text'
          id='filter'
          className='form-control'
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className='d-flex scroll-container mt-5'>
        {filteredPosts.map((post) => (
          <div className='col-3' key={post.id}>
            <div className='card card-primary m-3'>
              <div className='card-header bg-success-subtle bg-opacity-25'>
                <h4>{post.titulo}</h4>
              </div>
              <div className='card-text m-2 d-flex flex-column post-text'>
                <p className='fs-6 description'>{post.description}</p>
                <h6>Ubicación : {post.ubication}</h6>
                <h6>Fecha : {new Date(post.fecha).toLocaleString()}</h6>
              </div>
              <div className='card-footer d-flex bg-success-subtle bg-opacity-25'>
                <h6 className='col'>ID: {post.id}</h6>
                <h6 className='col'>Usuario : {post.usuario_id}</h6>
                <Link
                  className='btn btn-outline-danger btn-sm me-2'
                  onClick={() => deletePost(post.id)}>
                  <i className='bi bi-calendar-x'></i>
                </Link>
                <Link
                  className='btn btn-outline-success btn-sm'
                  to={`/admin/posts/${post.id}`}>
                  <i className='bi bi-eye'></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListPost;
