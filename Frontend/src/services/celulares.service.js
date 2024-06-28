import httpService from "./http.service";
const urlResource = "http://localhost:4000/celulares";


async function Buscar(nombre) {
    const resp = await httpService.get(urlResource, {
        params: { nombre },
    });
    return resp.data;
}


async function BuscarPorId(item) {
    const resp = await httpService.get(urlResource + "/" + item.IdCelulares);
    return resp.data;
}


async function ActivarDesactivar(item) {
    await httpService.delete(urlResource + "/" + item.IdCelulares);
}


async function Grabar(item) {
    if (item.IdCelulares === 0) {
        await httpService.post(urlResource, item);
    } else {
    await httpService.put(urlResource + "/" + item.IdCelulares, item);
    }
}


export const celularesService = {
    Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
