import React, { useState, useEffect } from "react";
import CelularesBuscar from "./CelularesBuscar";
import CelularesListado from "./CelularesListado";
import CelularesRegistro from "./CelularesRegistro";
import { celularesService } from "../../services/celulares.service";
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

  const [nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");
  const [Item, setItem] = useState({
    Id: 0,
    nombre: "",
    fechaIngreso: "",
    marcaCelular_id: 0,
    Activo: true,
  });
  

  const [Items, setItems] = useState([]);
  const [ItemPorId, setItemPorId] = useState(null); // Estado para guardar el resultado de BuscarPorId
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  // Cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    Buscar(); // Realiza la búsqueda al cargar el componente
  }, []); // El array vacío asegura que solo se ejecute una vez al montar

  async function Buscar(_pagina = 1) {
    try {
      modalDialogService.BloquearPantalla(true);
      const data = await celularesService.Buscar(nombre, _pagina); // Llama a la función de servicio con el nombre
      console.log("Respuesta de la API:", data); // Verifica la respuesta completa de la API en la consola
      modalDialogService.BloquearPantalla(false);

      if (data && Array.isArray(data.Items)) {
        setItems(data.Items);
        setRegistrosTotal(data.RegistrosTotal);
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
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

  async function BuscarPorId(id) {
    try {
      const data = await celularesService.BuscarPorId(id);
      setItemPorId(data);
    } catch (error) {
      console.error("Error al buscar por ID:", error);
      modalDialogService.Alert("Error al buscar por ID: " + error.message);
    }
  }

  async function BuscarPorNombre(nombre) {
    setNombre(nombre); // Actualiza el estado del nombre
    try {
      modalDialogService.BloquearPantalla(true);
      const data = await celularesService.BuscarPorNombre(nombre); // Llama a la función de servicio con el nombre
      console.log("Respuesta de la API:", data); // Verifica la respuesta completa de la API en la consola
      modalDialogService.BloquearPantalla(false);
  
      if (data && Array.isArray(data)) {
        setItems(data);
        setRegistrosTotal(data.length);
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
      console.error("Error al buscar celulares por nombre:", error);
      modalDialogService.Alert("Error al buscar celulares por nombre: " + error.message);
    }
  }

  function Consultar(id) {
    BuscarPorId(id, "C"); // Paso la accionABMC porque es asíncrono la búsqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Modificar(item) {
    if (!item.Activo) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item.Id, "M"); // Paso la accionABMC porque es asíncrono la búsqueda y luego de ejecutarse quiero cambiar el estado accionABMC
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
      "Está seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await celularesService.ActivarDesactivar(item);
        await Buscar(Pagina);
      }
    );
  }

  async function Grabar(item) {
    try {
      await celularesService.Grabar(item);
      await Buscar(Pagina);
      Volver();
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
    }
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Celulares <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      <CelularesBuscar
        BuscarPorNombre={BuscarPorNombre}
        Agregar={Agregar}
      />

      {Items?.length > 0 && (
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

      {Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {ItemPorId && (
        <div className="mt-3">
          <h3>Resultado de Búsqueda por ID</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha de Ingreso</th>
                <th>Marca ID</th>
                <th>Activo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ItemPorId.Id}</td>
                <td>{ItemPorId.nombre}</td>
                <td>{ItemPorId.fechaIngreso}</td>
                <td>{ItemPorId.marcaCelular_id}</td>
                <td>{ItemPorId.Activo ? "Sí" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}


      {AccionABMC !== "L" && (
        <CelularesRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Celulares };
