import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";


function Menu() {

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          <i className="fa fa-industry"></i>
          &nbsp;<i>Tienda Informática</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown bg-dark">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Celulares
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/celulares">
                    Listado Celulares
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/marcascelulares">
                    Marcas de Celulares
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown bg-dark">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Notebooks
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/notebooks">
                    Listado de Notebooks
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/marcasnotebooks">
                    Marcas de Notebooks
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown bg-dark">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Perifericos
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/perifericos">
                    Listado de Perifericos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/marcasperifericos">
                    Marcas de Perifericos
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown bg-dark">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Servicios
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/servicios">
                    Listado de Servicios
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/tiposervicio">
                    Tipos de Servicios
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/inicio">
                Inicio
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export {Menu};