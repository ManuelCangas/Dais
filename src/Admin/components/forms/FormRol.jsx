import { useEffect, useState } from "react";
import axios from "axios";

const URI = "http://localhost:8000/rol/";

const FormRol = () => {
  //Datos
  const [rol, setRol] = useState("");
  const [rols, setRols] = useState([]);
  const [selectedRol, setSelectedRol] = useState(null);
  // Post
  const addRol = () => {
    axios.post(URI, { rol: rol }).then(() => {
      alert("Rol creado");
      getAllRols();
    });
  };
  //Delete
  const deleteRol = (id) => {
    axios.delete(`${URI}/${id}`).then(() => {
      alert("Rol de usuario eliminado");
      getAllRols();
    });
  };
  //Get
  const getAllRols = async () => {
    const res = await axios.get(URI);
    setRols(res.data);
  };
  useEffect(() => {
    getAllRols();
  }, []);
  //Update
  const updateRol = () => {
    if (selectedRol && rol !== "") {
      axios
        .patch(`${URI}${selectedRol}`, {
          rol: rol,
        })
        .then(() => {
          alert("Rol actualizado correctamente");
          getAllRols();
          setRol("");
          setSelectedRol(null);
        })
        .catch((error) => {
          console.error("Error al actualizar el rol:", error);
        });
    } else {
      alert("Ingrese un valor y luego seleccione la etiqueta a actualizar");
    }
  };
  const handleUpdateRol = (id, rol) => {
    setSelectedRol(id);
    setRol(rol);
  };
  //HTML
  return (
    <div className='card card-primary mb-4'>
      <div className='card-header bg-success bg-opacity-50'>
        <h6>Roles de usuario </h6>
      </div>
      <div className='card-body'>
        <div className='input-group input-group-sm mb-3'>
          <span htmlFor='Rol' className='input-group-text'>
            Rol
          </span>
          <input
            onChange={(event) => {
              setRol(event.target.value);
            }}
            value={rol}
            type='text'
            className='form-control'
            id='Rol'
          />
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Rol</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {rols.map((rol) => (
              <tr className='justify-content-between' key={rol.id}>
                <td className='pe-5'> {rol.rol}</td>
                <td>
                  <button
                    className='btn btn-outline-danger btn-sm me-3'
                    onClick={() => deleteRol(rol.id)}>
                    <i className='bi bi-trash3'></i>
                  </button>
                  <button
                    className='btn btn-outline-warning btn-sm'
                    onClick={() => handleUpdateRol(rol.id, rol.rol)}>
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
          onClick={addRol}>
          Añadir
        </button>
        <button
          className='btn btn-outline-warning btn-sm me-auto'
          onClick={updateRol}>
          Actualizar
        </button>
        <label> Seleccionado : {selectedRol}</label>
      </div>
    </div>
  );
};

export default FormRol;
