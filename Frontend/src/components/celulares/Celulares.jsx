import React, { useState, useEffect } from "react";
import CelularesBuscar from "./CelularesBuscar";
import CelularesListado from "./CelularesListado";
import CelularesRegistro from "./CelularesRegistro";
import { celularesService } from "../../services/celulares.service";
//import { articulosFamiliasMockService as articulosfamiliasService } from "../../services/articulosFamilias-mock.service";
import modalDialogService from "../../services/modalDialog.service";



function Celulares() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [nombre, setnombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState([]); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  

  async function Buscar(_pagina) {
    try {
      modalDialogService.BloquearPantalla(true);
      const data = await celularesService.Buscar(nombre, _pagina);
      console.log("Respuesta de la API:", data); // Verifica la respuesta completa de la API en la consola
      modalDialogService.BloquearPantalla(false);
  
      // Verifica si data tiene la estructura esperada y contiene los elementos que necesitas
      if (data && Array.isArray(data)) { // Asumiendo que data es un array de objetos
        setItems(data); // Asigna los datos al estado Items
  
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
          arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
      } else {
        console.error("Los datos recibidos no son válidos:", data);
        modalDialogService.Alert("Los datos recibidos no son válidos.");
      }
    } catch (error) {
      console.error("Error al buscar celulares:", error);
      modalDialogService.Alert("Error al buscar celulares: " + error.message);
    }
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
      Id: 0,
      nombre: "",
      fechaIngreso: new Date().toISOString().split("T")[0], // Establece la fecha actual en el formato YYYY-MM-DD
      marcaCelular_id: 1, // Cambia esto según los valores válidos para tu base de datos
      Activo: true,
    });
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
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
        <CelularesBuscar
          nombre={nombre}
          setnombre={setnombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <CelularesListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
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
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Celulares };