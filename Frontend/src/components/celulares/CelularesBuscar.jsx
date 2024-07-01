import React, { useState } from "react";

export default function CelularesBuscar({ BuscarPorNombre, Agregar }) {
  const [nombre, setNombre] = useState("");

  const handleBuscar = () => {
    BuscarPorNombre(nombre); // Llama a la función BuscarPorNombre pasando el nombre actual
  };

  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Nombre:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              maxLength="55"
              autoFocus
            />
          </div>
        </div>
        <hr />

        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
            <button type="button" className="btn btn-primary" onClick={handleBuscar}>
              <i className="fa fa-search"></i> Buscar por Nombre
            </button>
            <button type="button" className="btn btn-primary" onClick={() => Agregar()}>
              <i className="fa fa-plus"></i> Agregar
            </button>
            
          </div>
        </div>
        <br></br>
      </div>
    </form>
  );
}
