import httpService from "./http.service";
const urlResource = "http://localhost:4000/perifericos";


async function Buscar(nombre) {
    const resp = await httpService.get(urlResource, {
        params: { nombre },
    });
    return resp.data;
}


async function BuscarPorId(item) {
    const resp = await httpService.get(urlResource + "/" + item.IdPerifericos);
    return resp.data;
}


async function ActivarDesactivar(item) {
    await httpService.delete(urlResource + "/" + item.IdPerifericos);
}


async function Grabar(item) {
    if (item.IdPerifericos === 0) {
        await httpService.post(urlResource, item);
    } else {
    await httpService.put(urlResource + "/" + item.IdPerifericos, item);
    }
}


export const perifericosService = {
    Buscar,BuscarPorId,ActivarDesactivar,Grabar
};