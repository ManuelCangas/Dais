import React from "react";
import "../Landing.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-success bg-opacity-25 shadow'>
        <div className='container-fluid'>
          <div className='navbar-image ms-2 me-3' href=''></div>
          <Link className='navbar-brand font-monospace ' to='/'>
            Dais
          </Link>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to='/nosotros'>
                  Nosotros
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/contacto'>
                  Contacto
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  Plataforma
                </a>
                <ul className='dropdown-menu bg-success-subtle bg-opacity-25'>
                  <li>
                    <Link className='dropdown-item' to='/admin/login'>
                      Administrador
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-item' to='/app/login'>
                      Usuario
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
