import React, { useState, useEffect } from "react";
import moment from "moment";
import NotebooksBuscar from "./ArticulosBuscar";
import NotebookListado from "./NotebookListado";
import NotebookRegistro from "./NotebookRegistro";
import { notebooksService } from "../../services/articulos.service";
//import { articulosFamiliasMockService as articulosfamiliasService } from "../../services/articulosFamilias-mock.service";
import modalDialogService from "../../services/modalDialog.service";
import { notebooksService } from "../../services/notebooks.service";
import { MarcaNotebook } from "../../../Backend/base-orm/sequelize-init";

function Notebooks () {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };

  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

 
  const [Notebooks, setNotebooks] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarNotebooks() {
      const data = await notebooksService.Buscar();
      setNotebooks(data);
    }
    BuscarNotebooks();
    
  }, [Nombre, Activo]);

  async function BuscarPorId(item, accionABMC) {
    const data = await notebooksService.BuscarPorId(item);
    setItems(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    if (!item.Activo) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdNotebook: 0,
      Nombre: '',
      FechaIngreso: moment(new Date()).format("YYYY-MM-DD"),
      MarcaNotebook: '',
    });
  }


  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await notebooksService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    try {
      await notebooksService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();
    modalDialogService.Alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
    );
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Notebooks <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <form>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 col-md-2">
              <label className="col-form-label">Nombre de notebook:</label>
            </div>
            <div className="col-sm-8 col-md-4">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setNombre(e.target.value)}
                value={Nombre}
                maxLength="55"
                autoFocus
              />
            </div>
          </div>
    
          <hr />
    
          {/* Botones */}
          <div className="row">
            <div className="col text-center botones">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => Buscar(1) }
            >
              <i className="fa fa-search"> </i> Buscar Notebook
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => Agregar() }
            >
              <i className="fa fa-plus"> </i> Agregar Nueva Notebook
            </button>
            </div>
          </div>
        </div>
      </form>
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <NotebookListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <NotebookRegistro
          {...{ AccionABMC, Notebooks, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Notebooks };
