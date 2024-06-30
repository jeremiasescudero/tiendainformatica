import React, { useState, useEffect } from "react";
import CelularesListado from "./CelularesListado";
import CelularesRegistro from "./CelularesRegistro";
import { celularesService } from "../../services/celulares.service";
import modalDialogService from "../../services/modalDialog.service";
//import { CelularesFamiliasMockService as CelularesfamiliasService } from "../../services/CelularesFamilias-mock.service";import modalDialogService from "../../services/modalDialog.service";


function Celulares() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

    // Función para cargar el listado completo al arranque
    useEffect(() => {
      async function cargarListadoInicial() {
        await Buscar();
      }
      cargarListadoInicial();
    }, []);


  async function Buscar(_pagina) {
    modalDialogService.BloquearPantalla(true);
    const data = await celularesService.Buscar(Nombre, Activo, _pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await celularesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      //alert("No puede modificarse un registro Inactivo.");
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        id: 0,
        nombre: '',
        fechaIngreso: '',
        Activo: true,
      });
    //modalDialogService.Alert("preparando el Alta...");
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
        await celularesService.ActivarDesactivar(item);
        await Buscar();
      }
    );

  }
  
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await celularesService.Grabar(item);
    }
    catch (error)
    {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    //setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    //}, 0);
  }
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Celulares <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        
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
            value={Nombre}
            maxLength="55"
            autoFocus
          />
        </div>
        <div className="col-sm-4 col-md-2">
          <label className="col-form-label">Activo:</label>
        </div>
        <div className="col-sm-8 col-md-4">
          <select
            className="form-control"
            onChange={(e) => setActivo(e.target.value)}
            value={Activo}
          >
            <option value={""}></option>
            <option value={false}>NO</option>
            <option value={true}>SI</option>
          </select>
        </div>
      </div>

      <hr />

      {/* Botones */}
      <div className="row">
        <div className="col text-center botones">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => Buscar(1) }
        >
          <i className="fa fa-search"> </i> Buscar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => Agregar() }
        >
          <i className="fa fa-plus"> </i> Agregar
        </button>
        </div>
      </div>
    </div>
  </form>
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <CelularesListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Pagina,
            RegistrosTotal,
            Paginas,
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
        <CelularesRegistro
          {...{ AccionABMC, Celulares, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Celulares };