import { useEffect, useState } from "react";
import axios from "axios";

const URI = "http://localhost:8000/usuario/";

const ListUsuario = () => {
  const [search, setSearch] = useState("");
  //Get
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    getUsuario();
  }, []);
  //Listar
  const getUsuario = async () => {
    const res = await axios.get(URI);
    setUsuarios(res.data);
  };
  //Delete
  const dele = async (id) => {
    await axios.delete(`${URI}${id}`);
    getUsuario().then(() => {
      alert("Usuario eliminado");
    });
  };
  //Search
  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)
  };
  //Filtro
  let results = [];
  if (!search) {
    results = usuarios;
  } else {
    results = usuarios.filter((dato) =>
      dato.nickname.toLowerCase().includes(search.toLowerCase())
    );
  }
  //Rol
  const getRolName = (rolNumber) => {
    if (rolNumber === 1) {
      return "Jugador";
    } else if (rolNumber === 2) {
      return "Tienda";
    } else {
      return "Rol desconocido";
      // Puedes manejar otros números de rol según sea necesario
    }
  };
  //HTML
  return (
    <>
      <div>
        <h2 className='ms-4 mb-4'>Lista de usuarios</h2>
      </div>
      <input
        value={search}
        onChange={searcher}
        className='form form-control mb-2'
        type='text'
        placeholder='Busqueda'
      />
      <table className='table bg-success'>
        <thead>
          <tr className='bg-success'>
            <th className='col-1' scope='col'>
              #
            </th>
            <th className='col-2' scope='col'>
              Nombre
            </th>
            <th className='col-2' scope='col'>
              Correo
            </th>
            <th className='col-1' scope='col'>
              Nickname
            </th>
            <th className='col-1' scope='col'>
              Fecha de Nac.
            </th>
            <th className='col-1' scope='col'>
              Sexo
            </th>
            <th className='col-1' scope='col'>
              Rol
            </th>
            <th className='col-1' scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {results.map((usuario) => (
            <tr key={usuario.id}>
              <td> {usuario.id} </td>
              <td> {usuario.nombre} </td>
              <td> {usuario.mail} </td>
              <td> {usuario.nickname} </td>
              <td> {usuario.edad} </td>
              <td> {usuario.sexo} </td>
              <td> {getRolName(usuario.usuario_rol)} </td>
              <td className='text-center'>
                <button
                  className='btn btn-outline-danger btn-sm'
                  onClick={() => dele(usuario.id)}>
                  <i className='bi bi-trash3'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListUsuario;
