import React from "react";
import Etiquetas from "../components/forms/FormTag";

function Tags() {
  return (
    <div className='container pt-4 '>
      <h4 className='ms-3 mb-3'>Tags</h4>
      <div className="row">
        <div className="col">
        <Etiquetas />
        </div>
      </div>
    </div>
  );
}

export default Tags;
