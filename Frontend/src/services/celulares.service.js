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
    await httpService.delete(urlResource + "/" + item.IdArticulo);
  }

async function Grabar(item) {
    if (item.Id === 0) {
      await httpService.post(urlResource, item);
    } else {
      await httpService.put(urlResource + "/" + item.Id, item);
    }
  }



export const celularesService = {
    Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
