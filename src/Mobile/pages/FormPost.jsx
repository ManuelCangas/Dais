import React from "react";
import Form from "../components/FormPost";

function FormPost() {
  return (
    <div className='container pt-4 '>
      <h2 className='ms-3 mb-3'>Post</h2>
      <div className='col'>
        <Form />
      </div>
    </div>
  );
}

export default FormPost;
