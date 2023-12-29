import React from "react";
import Etiquetas from "../components/forms/FormTag";
import "../components/css/Crud.css";

function Tags() {
  return (
    <div className='container-fluid pt-4 bg-color'>
      <div className='container'>
        <h3 className='ms-3 mb-3'>Tags</h3>
        <div className='row'>
          <div className='col'>
            <Etiquetas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tags;
