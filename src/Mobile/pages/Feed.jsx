import React from "react";
import ListPost from "../components/ListPost";

function Feed() {
  return (
    <div className='container-fluid pt-4 bg-image'>
      <h2 className='ms-3 mt-3'>Publicaciones</h2>
      <div>
        <ListPost />
      </div>
    </div>
  );
}

export default Feed;
