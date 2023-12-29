import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Navbar = ({ isLoggedIn }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/app/login");
  };

  return (
    <nav className='navbar navbar-expand-lg bg-success bg-opacity-25 shadow'>
      <div className='container-fluid'>
        <div className='navbar-image ms-2 me-3'></div>
        <Link className='navbar-brand font-monospace ' to='/home'>
          Dais
        </Link>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            {isLoggedIn && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/app/feed'>
                    Feed
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/app/report'>
                    Reportes
                  </Link>
                </li>
                <ul className='navbar-nav ms-auto me-2'>
                  <li className='nav-item dropdown'>
                    <a
                      className='nav-link dropdown-toggle'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                      role='button'>
                      <i className='bi bi-gear-fill me-2'></i>
                      Configuraciones
                    </a>
                    <ul className='dropdown-menu'>
                      <Link className='dropdown-item' to='/app/profile'>
                        Perfil
                      </Link>
                      <Link className='dropdown-item' to='/app/subs'>
                        Subscripción
                      </Link>
                      <button onClick={handleLogout} className='dropdown-item'>
                        <i className='bi bi-door-open text-danger'>
                          Cerrar sesión
                        </i>
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
