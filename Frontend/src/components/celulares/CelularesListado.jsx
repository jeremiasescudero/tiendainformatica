import React from "react";

export default function CelularesListado({
  Items,
  Consultar,
  ActivarDesactivar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Fecha de Ingreso</th>
            <th className="text-center">ID MARCA</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.Id}>
                <td>{Item.Id}</td>
                <td>{Item.nombre}</td>
                <td className="text-end">{Item.fechaIngreso}</td>
                <td className="text-end">{Item.marcaCelular_id}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador */}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Página: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Consultar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>
          <div className="col">
            <button
              className="btn btn-primary float-end"
              onClick={() => Imprimir()}
            >
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
