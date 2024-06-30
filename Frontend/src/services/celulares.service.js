import httpService from "./http.service";
import axios from "axios";
const urlResource = "http://localhost:4000/celulares";

async function Buscar(nombre, Pagina) {
    try {
        const resp = await httpService.get(urlResource, {
            params: { nombre, Pagina },
        });
        return resp.data; // Esperamos que el servidor devuelva { Items: [], RegistrosTotal: 0 }
    } catch (error) {
        console.error("Error al buscar celulares:", error);
        throw error; // Lanzamos el error para que sea manejado por quien llame a esta función
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

async function ActivarDesactivar(Id) {
    try {
        await httpService.delete(`${urlResource}/${Id}`);
    } catch (error) {
        console.error(`Error al activar/desactivar celular con id ${Id}:`, error);
        throw error; // Lanzamos el error para que sea manejado por quien llame a esta función
    }
}

async function Grabar(item) {
    try {
      console.log("Datos a grabar:", item); // Verifica los datos que estás enviando
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (item.Id === 0) {
        const response = await axios.post(urlResource, item, config);
        console.log("Respuesta del servidor (POST):", response.data);
      } else {
        const response = await axios.put(`${urlResource}/${item.Id}`, item, config);
        console.log("Respuesta del servidor (PUT):", response.data);
      }
    } catch (error) {
      console.error(`Error al grabar celular ${item.Id ? 'existente' : 'nuevo'}:`, error);
      throw error; // Lanzamos el error para que sea manejado por quien llame a esta función
    }
  }



export const celularesService = {
    Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
