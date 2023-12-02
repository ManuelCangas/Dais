import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/Landing.css'

const URI = "http://localhost:8000/post/";

const ListPost = () => {
  //Get
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPost();
  }, []);
  //Listar
  const getPost = async () => {
    const res = await axios.get(URI);
    setPosts(res.data);
  };
  //Delete

  //HTML
  return (
    <section>
      {posts.map((post) => (
        <div className="col-4" key={post.id}>
          <div className='card card-primary m-3'>
            <div className='card-header bg-success-subtle bg-opacity-25'>
              <h4>{post.titulo}</h4>
            </div>
            {post.rutaImg && (
              <img
                src={`http://localhost:8000/Imagenes/${post.rutaImg}`}
                alt='Imagen de Publicación'
                style={{ width: "auto", height: "auto" }}
              />
            )}
            <div className='card-text m-2 d-flex flex-column post-text'>
              <p className='fs-6'>{post.description}</p>
              <h6>Ubicación : {post.ubication}</h6>
              <h6>Fecha : {new Date(post.fecha).toLocaleString()}</h6>
            </div>
            <div className="card-footer d-flex bg-success-subtle bg-opacity-25">
              <h6 className="col">ID: {post.id}</h6>
              <h6 className="col">Tipo : {post.tipo_id}</h6>
              <h6 className="col">Usuario : {post.usuario_id}</h6>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ListPost;
