import React from "react";
import FormTipo from "../components/forms/FormTipo";
import FormPost from "../components/forms/FormPost";


function Posts() {
  return (
    <div className='container pt-4'>
      <h2 className="ms-3 mb-3">Crud para Publicaciones y Tipos</h2>
      <div className="row">
        <div className='col-9'>
          <FormPost />
        </div>
        <div className='col-3'>
          <FormTipo />
        </div>
      </div>
    </div>
  );
}

export default Posts;
