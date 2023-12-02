import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const URI = "http://localhost:8000/post/";

const FormPost = () => {
  //Datos
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState("");
  const [description, setDescription] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [ubication, setUbication] = useState("");
  const [tipo, setTipo] = useState(1);
  const [tags, setTags] = useState(null);
  const [usuario, setUsuario] = useState("");

  //Post Imagen
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
    formData.append("usuario_id", usuario);

    try {
      await axios.post(URI, formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });
      alert("Publicación creada exitosamente");
    } catch (error) {
      console.error(error);
    }
  };

  //HTML
  return (
    <div className='card card-primary'>
      <div className='card-header bg-success bg-opacity-50'>
        <h6> CRUD Publicaciones </h6>
      </div>
      <form className='card-body' onSubmit={addPostHandler}>
        <div className='form-group mb-3 row'>
          <label htmlFor='titulo' className='form-label col-1'>
            Titulo
          </label>
          <input
            onChange={(event) => {
              setTitulo(event.target.value);
            }}
            type='text'
            id='titulo'
            className='form-control col me-2'
          />
        </div>
        <div className='form-group mb-3 row'>
          <label htmlFor='imagen' className='form-label col-1'>
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
            className='form-control col me-2'
          />
        </div>
        <div className='form-group mb-3 col ms-2'>
          <label htmlFor='description' className='form-label row'>
            Descripción
          </label>
          <textarea
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            id='description'
            className='form-control row'
            rows='3'></textarea>
        </div>
        <div className='form-group row mb-3'>
          <label htmlFor='fecha' className='form-label col-1'>
            Fecha
          </label>
          <input
            onChange={(event) => {
              setFecha(event.target.value);
            }}
            type='datetime-local'
            id='fecha'
            className='form-control col'
          />
          <label htmlFor='ubication' className='form-label col-2'>
            Ubicación
          </label>
          <input
            onChange={(event) => {
              setUbication(event.target.value);
            }}
            type='text'
            id='ubication'
            className='form-control col me-2'
          />
        </div>
        <div className='form-group mb-3 row'>
          <label htmlFor='tipo' className='form-label col-1'>
            Tipo
          </label>
          <select
            onChange={(event) => {
              setTipo(event.target.value);
            }}
            id='tipo'
            className='form-select col'>
            <option value='1'> Evento </option>
            <option value='2'> Torneo </option>
            <option value='3'> Noticia </option>
          </select>
          <label htmlFor='usuario' className='form-label col-2'>
            ID Usuario
          </label>
          <input
            onChange={(event) => {
              setUsuario(event.target.value);
            }}
            type='number'
            id='usuario'
            className='form-control col'
          />
        </div>
        <div>
          <label htmlFor='tags'>Etiquetas</label>
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
      </form>
      <div className='card-footer'>
        <button
          onClick={addPostHandler}
          className='btn btn-outline-success btn-sm me-3'>
          Añadir
        </button>
        <Link
          className='btn btn-outline-warning btn-sm'
          to='/admin/posts/listar'>
          <i className='bi bi-collection'></i>
        </Link>
      </div>
    </div>
  );
};

export default FormPost;
