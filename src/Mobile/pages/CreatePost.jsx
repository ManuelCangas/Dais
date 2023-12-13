import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const URI = "http://localhost:8000/post/";

const CreatePost = () => {
  const [token, setToken] = useState("");

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const [id, setUserId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState("");
  const [description, setDescription] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [ubication, setUbication] = useState("");
  const [tipo, setTipo] = useState(1);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setUserId(decodedToken.userId);
    }
  }, []);

  // Post Imagen
  const addPostHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("rutaImg", imagen, imagen.name);
    formData.append("description", description);
    formData.append("fecha", fecha);
    formData.append("ubication", ubication);
    formData.append("tipo_id", tipo);
    formData.append("tags", tags);
    formData.append("usuario_id", userId);

    try {
      await axios.post(URI, formData, {
        headers: {
          "content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Publicación creada exitosamente");
    } catch (error) {
      console.error(error);
    }
  };

  // HTML
  return (
    <div className='container-fluid bg-image'>
      <div className='container'>
        <h2 className='pb-4 pt-4'>Crear Publicación</h2>
        <div className='card card-primary'>
          <div className='card-header bg-success bg-opacity-50'>
            <h6>Formulario</h6>
          </div>
          <form className='card-body' onSubmit={addPostHandler}>
            <div className='mb-3 row'>
              <div className='col'>
                <label htmlFor='titulo' className='form-label col-2'>
                  Titulo
                </label>
                <input
                  onChange={(event) => {
                    setTitulo(event.target.value);
                  }}
                  type='text'
                  id='titulo'
                  className='form-control'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='imagen' className='form-label col-2'>
                Imagen
              </label>
              <div className='col'>
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
            </div>
            <div className='mb-3 row'>
              <div className='col'>
                <label htmlFor='description' className='form-label'>
                  Descripción
                </label>
                <textarea
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  id='description'
                  className='form-control'
                  rows='3'></textarea>
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='fecha' className='form-label col-2'>
                Fecha
              </label>
              <div className='col'>
                <input
                  onChange={(event) => {
                    setFecha(event.target.value);
                  }}
                  type='datetime-local'
                  id='fecha'
                  className='form-control'
                />
              </div>
              <label htmlFor='ubication' className='form-label col-2'>
                Ubicación
              </label>
              <div className='col'>
                <input
                  onChange={(event) => {
                    setUbication(event.target.value);
                  }}
                  type='text'
                  id='ubication'
                  className='form-control'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label htmlFor='tipo' className='form-label col-2'>
                Tipo
              </label>
              <div className='col'>
                <select
                  onChange={(event) => {
                    setTipo(event.target.value);
                  }}
                  id='tipo'
                  className='form-select'>
                  <option value='1'>Evento</option>
                  <option value='2'>Torneo</option>
                  <option value='3'>Noticia</option>
                </select>
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='tags' className='form-label'>
                Etiquetas
              </label>
              <select
                onChange={(event) => {
                  setTags(event.target.value);
                }}
                className='form-select'
                id='tags'>
                <option value='1'>Eurogames</option>
                <option value='2'>Ameritrash</option>
                <option value='3'>Fillers</option>
                <option value='4'>Party games</option>
                <option value='5'>Dungeon</option>
                <option value='6'>Abstractos</option>
                <option value='7'>Push your luck</option>
                <option value='8'>Familiares</option>
                <option value='9'>Roll and write</option>
                <option value='10'>Deckbuild</option>
                <option value='11'>Rol</option>
                <option value='12'>Wargames</option>
              </select>
            </div>
            <div className='card-footer'>
              <Link
                className='btn btn-outline-warning btn-sm me-3'
                to='/app/feed'>
                Atras
              </Link>
              <button type='submit' className='btn btn-outline-success btn-sm '>
                Añadir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
