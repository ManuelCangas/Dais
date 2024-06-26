import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import "../css/Landing.css";

const Navbar = ({ isLoggedIn }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const icon = {
    height: "20px",
    width: "20px",
    color: "black",
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-success bg-opacity-25 shadow'>
      <div className='container-fluid'>
        <div className='navbar-image ms-2 me-3' href=''></div>
        <Link className='navbar-brand font-monospace ' to='/'>
          Dais
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            {isLoggedIn && (
              <>
                <li className='nav-item'>
                  <Link
                    className='nav-link '
                    to='/admin/dashboard'
                    aria-current='page'>
                    DashBoard
                  </Link>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    role='button'
                    data-bs-toggle='dropdown'>
                    CRUD
                  </a>
                  <ul className='dropdown-menu bg-success-subtle bg-opacity-25'>
                    <li>
                      <Link className='dropdown-item' to='/admin/usuarios'>
                        Usuarios
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/posts'>
                        Publicaciones
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/tags'>
                        Tags
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    role='button'
                    data-bs-toggle='dropdown'>
                    Listar
                  </a>
                  <ul className='dropdown-menu bg-success-subtle bg-opacity-25'>
                    <li>
                      <Link className='dropdown-item' to='/admin/usuarios'>
                        Usuarios
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/posts/listar'>
                        Publicaciones
                      </Link>
                    </li>
                  </ul>
                </li>
                <ul className='navbar-nav ms-auto me-2'>
                  <li className='nav-item dropdown'>
                    <a
                      className='nav-link collapse-cuenta dropdown-toggle'
                      href='#'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'>
                      <i className='bi bi-person-circle me-2' style={icon}></i>
                      <span>Administrador</span>
                    </a>
                    <ul className='dropdown-menu bg-success-subtle bg-opacity-25'>
                      <button onClick={handleLogout} className='dropdown-item'>
                        Salir
                      </button>
                    </ul>
                  </li>
                </ul>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
