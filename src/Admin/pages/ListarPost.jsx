import React from "react";
import ListPost from "../components/lists/ListPost";
import "../components/css/Crud.css";

function ListarPost() {
  return (
    <div className='container-fluid pt-4 bg-color'>
      <div className='container'>
        <h2 className='ms-3 mb-3'>Listar Publicaciones</h2>
        <ListPost />
      </div>
    </div>
  );
}

export default ListarPost;
