import { useState } from "react";
import axios from "axios";

const URI = "http://localhost:8000/usuario/";

const FormUsuario = () => {
  //Datos de Usuario
  const [selectedUser, setSelectedUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [mail, setMail] = useState("");
  const [nickname, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState(null);
  const [sexo, setSexo] = useState("Masculino");
  const [usuario_rol, setRol] = useState(1);

  //Registro
  const addUser = () => {
    axios
      .post(URI, {
        nombre: nombre,
        mail: mail,
        nickname: nickname,
        password: password,
        edad: edad,
        sexo: sexo,
        usuario_rol: usuario_rol,
      })
      .then(() => {
        alert("Usuario registrado correctamente");
        setNombre("");
        setMail("");
        setNick("");
        setPassword("");
        setEdad(null);
        setSexo("Masculino");
        setRol(1);
      });
  };
  //Actualizar
  const updateUser = () => {
    if (selectedUser !== "") {
      axios
        .patch(`${URI}${selectedUser}`, {
          id: id,
          nombre: nombre,
          mail: mail,
          nickname: nickname,
          password: password,
          edad: edad,
          sexo: sexo,
          usuario_rol: usuario_rol,
        })
        .then(() => {
          alert("Usuario actualizado correctamente");
          setSelectedUser(null);
        });
    } else {
      alert("Recuerde seleccionar el usuario que desea actualizar");
    }
  };
  //HTML Y Bootstrap 5
  return (
    <div className='card card-primary'>
      <div className='card-header bg-success bg-opacity-50'>
        <h6 className='card-title'>Usuario</h6>
      </div>
      <div className='card-body'>
        <div className='form-group row mt-2 mb-4 me-1'>
          <label htmlFor='id' className='form-label col-2 ps-4'>
            ID
          </label>
          <input
            onChange={(event) => {
              setSelectedUser(event.target.value);
            }}
            type='text'
            id='id'
            className='form-control col'
            readOnly
          />
          <label htmlFor='mail' className='form-label col-2 ps-4'>
            Correo
          </label>
          <input
            onChange={(event) => {
              setMail(event.target.value);
            }}
            type='text'
            id='mail'
            className='form-control col'
          />
        </div>
        <div className='form-group row mb-4 me-1'>
          <label htmlFor='nombre' className='form-label col-2 ps-4'>
            Nombre
          </label>
          <input
            onChange={(event) => {
              setNombre(event.target.value);
            }}
            type='text'
            id='nombre'
            className='form-control col'
          />
          <label htmlFor='nick' className='form-label col-2 ps-4'>
            Nick
          </label>
          <input
            onChange={(event) => {
              setNick(event.target.value);
            }}
            type='text'
            id='nick'
            className='form-control col'
          />
        </div>
        <div className='form-group row mb-4 me-1'>
          <label htmlFor='contraseña' className='form-label col-2 ps-4'>
            Contraseña
          </label>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type='text'
            id='contraseña'
            className='form-control col'
          />

          <label htmlFor='edad' className='form-label col-2 ps-4'>
            Edad
          </label>
          <input
            onChange={(event) => {
              setEdad(event.target.value);
            }}
            type='date'
            id='edad'
            className='form-control col'
          />
        </div>
        <div className='form-group mb-3 row'>
          <label htmlFor='sexo' className='form-label col col-2 ps-4'>
            Sexo
          </label>
          <select
            id='sexo'
            className='form-select col'
            onChange={(event) => {
              setSexo(event.target.value);
            }}>
            <option value='Masculino'>Masculino</option>
            <option value='Femenino'>Femenino</option>
          </select>
          <label htmlFor='tipo' className='form-label col col-2 ps-4'>
            Tipo
          </label>
          <select
            id='tipo'
            className='form-select col me-3'
            onChange={(event) => {
              setRol(event.target.value);
            }}>
            <option value='1'>Jugador</option>
            <option value='2'>Tienda</option>
            <option value='3'>Administrador</option>
          </select>
        </div>
      </div>
      <div className='card-footer'>
        <button className='btn btn-sm btn-outline-success' onClick={addUser}>
          Registrar
        </button>
        <button
          className='btn btn-sm btn-outline-warning ms-3'
          onClick={updateUser}>
          <i className='bi bi-pencil-square'> </i>
        </button>
      </div>
    </div>
  );
};

export default FormUsuario;
