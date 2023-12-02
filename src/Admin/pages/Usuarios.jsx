import React, { useState } from "react";
import FormUsuario from "../components/forms/FormUsuario";
import FormRol from "../components/forms/FormRol";
import ListUsuario from "../components/lists/ListUsuario";

const Usuarios = () => {

  const [formData, setFormData] = useState(null)
  
  return (
    <div className='container pt-4'>
      <h2 className="ms-3 mb-3">Crud para Usuarios y Roles</h2>
      <div className='row'>
        <div className='col-9'>
          <FormUsuario />
        </div>
        <div className='col-3'>
          <FormRol />
        </div>
      </div>
      <div>
        <ListUsuario />
      </div>
    </div>
  );
}

export default Usuarios;
