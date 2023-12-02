import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const URI = "http://localhost:8000/post/";

const FormPost = () => {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState(null);
  const [description, setDescription] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [ubication, setUbication] = useState("");
  const [tipo, setTipo] = useState(1);
  const [post, setPost] = useState([]);

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

  const updateHandler = async () => {
    try {
      await axios.put(`${URI}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchPost();
    } catch (error) {
      console.error(error);
    }
  };
  //Delete
  //HTML
  return (
    <div className='container'>
      <div className='card card-primary'>
        <form className='card-body' onSubmit={updateHandler}>
          <div className='form-group mb-3'>
            <label htmlFor='titulo' className='form-label'>
              Titulo
            </label>
            <input
              onChange={(event) => {
                setTitulo(event.target.value);
              }}
              type='text'
              id='titulo'
              className='form-control'
              value={titulo}
            />
            <p className='fs-6 m-2 text-muted'>"{post.titulo}"</p>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='imagen' className='form-label'>
              Imagen
            </label>
            <input
              onChange={(event) => {
                setImagen(event.target.files[0]);
              }}
              type='file'
              accept='image/*'
              id='imagen'
              name='imagen'
              className='form-control'
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='description' className='form-label'>
              Descripción
            </label>
            <div className='d-flex'>
              <textarea
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                id='description'
                className='form-control col'
                rows='3'></textarea>
              <p className='fs-6 ps-2  text-muted col'>"{post.description}"</p>
            </div>
          </div>
          <div className='form-group ms-1 p-2 row'>
            <div className='col'>
              <label htmlFor='fecha' className='form-label col-auto'>
                Fecha
              </label>
              <input
                onChange={(event) => {
                  setFecha(event.target.value);
                }}
                type='date'
                id='fecha'
                className='form-control col'
              />
              <p className='text-muted'>
                {new Date(post.fecha).toLocaleString()}
              </p>
            </div>
            <div className='col'>
              <label htmlFor='ubication' className='form-label col-auto'>
                Ubicación
              </label>
              <input
                onChange={(event) => {
                  setUbication(event.target.value);
                }}
                type='text'
                id='ubication'
                className='form-control col'
              />
              <p className='text-muted'>{post.ubication}</p>
            </div>
            <div className='col'>
              <label className='form-label col'> Tipo </label>
              <div></div>
              <select
                onChange={(event) => {
                  setTipo(event.target.value);
                }}
                id='tipo'
                className='form-select col'
                value={tipo}>
                <option value='1'> Evento </option>
                <option value='2'> Torneo </option>
                <option value='3'> Noticia </option>
              </select>
              <p>{post.tipo}</p>
            </div>
          </div>
        </form>
        <div className='card-footer'>
          <Link className='btn btn-outline-success btn-sm me-4' to='/app/feed'>
            Atras
          </Link>
          <label
            onClick={updateHandler}
            className='btn  btn-outline-warning btn-sm me-3'>
            Editar
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormPost;
