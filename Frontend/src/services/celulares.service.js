import httpService from "./http.service";
import axios from "axios";
const urlResource = "http://localhost:4000/celulares";

async function Buscar(nombre, Pagina) {
    try {
        const resp = await httpService.get(urlResource, {
            params: { nombre, Pagina },
        });
        return { Items: resp.data, RegistrosTotal: resp.data.length };
    } catch (error) {
        console.error("Error al buscar celulares:", error);
        throw error;
    }
}

async function ActualizarLista(Pagina) {
    try {
      const resp = await httpService.get(urlResource, {
        params: { Pagina },
      });
      return { Items: resp.data, RegistrosTotal: resp.data.length };
    } catch (error) {
      console.error("Error al actualizar la lista de celulares:", error);
      throw error;
    }
  }
  

  async function Eliminar(Id) {
    try {
      const resp = await httpService.delete(`${urlResource}/${Id}`);
      return { success: true, message: "Registro eliminado correctamente" };
    } catch (error) {
      console.error(`Error al eliminar celular con id ${Id}:`, error);
      throw error;
    }
  }
async function BuscarPorNombre(nombre) {
    try {
      const resp = await httpService.get(urlResource, {
        params: { nombre },
      });
      console.log("Respuesta de BuscarPorNombre:", resp.data);
      if (resp.data && Array.isArray(resp.data)) {
        return resp.data.filter((item) => item.nombre.toLowerCase().includes(nombre.toLowerCase()));
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error al buscar celulares por nombre:", error);
      throw error;
    }
  }

async function BuscarPorId(Id) {
    try {
        const resp = await httpService.get(`${urlResource}/${Id}`);
        return resp.data; // Esperamos que el servidor devuelva el objeto del celular con el id proporcionado
    } catch (error) {
        console.error(`Error al buscar celular por id ${Id}:`, error);
        throw error; // Lanzamos el error para que sea manejado por quien llame a esta función
    }
}

async function ActivarDesactivar(item) {
    try {
      const resp = await httpService.put(urlResource + "/" + item.Id);
      return resp.data;
    } catch (error) {
      console.error("Error al activar/desactivar el celular:", error);
      throw error;
    }
  }

async function Grabar(item) {
    if (item.Id === 0) {
      await httpService.post(urlResource, item);
    } else {
      await axios.put(urlResource + "/" + item.Id, item);
    }
  }

async function Modificar(item) {
  try {
    const resp = await httpService.put(`${urlResource}/${item.Id}`, item);
    return resp.data; // Devuelve solo el registro modificado
  } catch (error) {
    console.error(`Error al modificar el celular con id ${item.Id}:`, error);
    throw error;
  }
}



export const celularesService = {
    Buscar,BuscarPorId,ActivarDesactivar,Grabar,BuscarPorNombre,Eliminar,ActualizarLista,Modificar
};
