import React from "react";

export default function CelularesListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Buscar,
  Eliminar,
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
            <th className="text-center">Activo</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.Id}>
                <td className="text-center">{Item.Id}</td>
                <td className="text-center">{Item.nombre}</td>
                <td className="text-center">{Item.fechaIngreso}</td>
                <td className="text-center">{Item.marcaCelular_id}</td>
                <td className="text-center">{Item.activo ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item.Id)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                    
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
<<<<<<< HEAD
                    className="btn btn-sm btn-outline-primary"
                    title="Eliminar"
                      onClick={() => Eliminar(Item)}
                  >
                   <i className="fa fa-trash"></i>
                  </button>
=======
  className="btn btn-sm btn-outline-primary"
  title="Eliminar"
  onClick={() => Eliminar(Item)}
>
  <i className="fa fa-trash"></i>
</button>
>>>>>>> 4814a197e49015d030eee537d22d2bdb5d77a697
                  <button
                    className={
                      "btn btn-sm " +
                      (Item.activo
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Item.activo ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-" + (Item.activo ? "times" : "check")}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
  );
}

