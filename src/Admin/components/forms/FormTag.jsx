import React, { useEffect, useState } from "react";
import axios from "axios";

const URI = "http://localhost:8000/tag/";

const FormTag = () => {
  const [etiqueta, setEtiqueta] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const addTag = () => {
    axios.post(URI, { etiqueta: etiqueta }).then(() => {
      alert("Etiqueta creada");
      getAllTags();
      setEtiqueta("");
    });
  };

  const getAllTags = async () => {
    const res = await axios.get(URI);
    setTags(res.data);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const deleteTag = (id) => {
    axios.delete(`${URI}/${id}`).then(() => {
      alert("Etiqueta eliminada correctamente");
      getAllTags();
    });
  };

  const updateTag = () => {
    if (selectedTag && etiqueta !== "") {
      axios
        .patch(`${URI}${selectedTag}`, {
          etiqueta: etiqueta, // Asegúrate de que 'etiqueta' sea el nombre correcto del campo
        })
        .then(() => {
          alert('Etiqueta actualizada correctamente');
          getAllTags();
          setEtiqueta('');
          setSelectedTag(null);
        })
        .catch((error) => {
          console.error('Error al actualizar la etiqueta:', error);
        });
    }
  };

  const handleUpdateTag = (id, etiqueta) => {
    setSelectedTag(id);
    setEtiqueta(etiqueta);
  };

  return (
    <div className='card card-primary mb-4'>
      <div className='card-header bg-success bg-opacity-50'>
        <h6>Formulario</h6>
      </div>
      <div className='card-body'>
        <h6 className='mb-3 ms-3'>Etiquetas</h6>
        <p className='text-black-50'>
          Para actualizar la etiqueta, coloque el nombre y luego presione el
          botón 'Actualizar'
        </p>
        <div className='input-group input-group-sm m-3 row'>
          <div className='form-group row'>
            <label
              htmlFor='Etiqueta'
              className='form-group col-1 justify-content-center m-2'>
              Nombre:
            </label>
            <input
              onChange={(event) => {
                setEtiqueta(event.target.value);
              }}
              value={etiqueta}
              type='text'
              id='Etiqueta'
              className='form-control col'
            />
          </div>
          <div className='row rounded-2 p-1 flex-row justify-content-start'>
            <button
              className='btn btn-outline-success col-1 m-1'
              onClick={addTag}>
              Añadir
            </button>
            <button
              className='btn btn-outline-warning col-1 m-1'
              onClick={updateTag}>
              Actualizar
            </button>
            <label className='col-2 mt-1'>
              Seleccionado : {selectedTag}
            </label>
          </div>
        </div>
        <ul className='d-flex flex-wrap'>
          {tags.map((tag) => (
            <li
              key={tag.id}
              className='list-group list-group-horizontal col-2 mb-3'>
              <label
                className='list-group-item btn'
                onClick={() => handleUpdateTag(tag.id, tag.etiqueta)}>
                {tag.id}. {tag.etiqueta}
              </label>
              <button
                className='list-group-item btn btn-outline-danger'
                onClick={() => deleteTag(tag.id)}>
                <i className='bi bi-trash'></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormTag;
