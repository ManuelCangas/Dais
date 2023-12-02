import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

const URI = "http://localhost:8000/tipo/";

const FormTipo = () => {
  //Datos
  const [tipo, setTipo] = useState("");
  const [tipos, setTipos] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState(null);

  //Post
  const addTipo = () => {
    axios
      .post(URI, {
        tipo: tipo,
      })
      .then(() => {
        alert("Tipo de publicación agregado");
        getAllTipo();
        setTipo("");
      });
  };
  //Get
  useEffect(() => {
    getAllTipo();
  }, []);
  //Listar
  const getAllTipo = async () => {
    const res = await axios.get(URI);
    setTipos(res.data);
  };
  //Delete
  const deleteTipo = async (id) => {
    await axios.delete(`${URI}${id}`);
    getTipo().then(() => {
      alert("Tipo de publicación eliminada");
    });
  };
  //Update
  const updateTipo = () => {
    if (selectedTipo !== "") {
      axios
        .patch(`${URI}/${selectedTipo}`, {
          tipo: tipo,
        })
        .then(() => {
          alert("Tipo de publicación actualizada");
          getAllTipo();
          setTipo("");
          setSelectedTipo(null);
        })
        .catch((error) => {
          console.error("Error al actualizar: ", error);
        });
    }
  };

  const handleUpdateTipo = (id, tipo) => {
    setSelectedTipo(id);
    setTipo(tipo);
  };
  //HTML
  return (
    <div className='card card-primary'>
      <div className='card-header bg-success bg-opacity-50'>
        <h6> CRUD Tipos de usuario </h6>
      </div>
      <div className='card-body'>
        <div className='input-group mb-3'>
          <span htmlFor='txtTipo' className='input-group-text'>
            Tipo
          </span>
          <input
            onChange={(event) => {
              setTipo(event.target.value);
            }}
            type='text'
            className='form-control'
            id='txtTipo'
          />
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'> Tipo </th>
              <th scope='col'> </th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((tipo) => (
              <tr className='justify-content-between' key={tipo.id}>
                <td className='pe-5'> {tipo.tipo} </td>
                <td>
                  <button
                    className='btn btn-outline-danger btn-sm me-3'
                    onClick={() => deleteTipo(tipo.id)}>
                    <i className='bi bi-trash3'></i>
                  </button>
                  <button
                    className='btn btn-outline-warning btn-sm'
                    onClick={() => handleUpdateTipo(tipo.id, tipo.tipo)}>
                    <i className='bi bi-pencil-square'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='card-footer d-flex'>
        <button
          className='btn btn-outline-success btn-sm me-2'
          onClick={addTipo}>
          Añadir
        </button>
        <button
          className='btn btn-outline-warning btn-sm me-auto'
          onClick={updateTipo}>
          Actualizar
        </button>
        <label> Seleccionado : {selectedTipo}</label>
      </div>
    </div>
  );
};

export default FormTipo;
