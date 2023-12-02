import React from "react";
import ListPost from "../components/ListPost";

function Feed() {
  return (
    <div className='container-fluid pt-4'>
      <h2 className='ms-3 mt-3'>Publicaciones</h2>
      <div>
        <h4 className='ms-3 mt-3 text-black-50 '>Activas</h4>
        <ListPost />
      </div>
      <div>
        <h4 className="ms-3 mt-3 text-black-50">Finalizadas</h4>
      </div>
    </div>
  );
}

export default Feed;
