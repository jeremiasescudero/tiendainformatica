import httpService from "./http.service";
const urlResource = "http://localhost:4000/api/servicios";


async function Buscar(nombre) {
    const resp = await httpService.get(urlResource, {
        params: { nombre },
    });
    return resp.data;
}


async function BuscarPorId(item) {
    const resp = await httpService.get(urlResource + "/" + item.IdServicios);
    return resp.data;
}


async function ActivarDesactivar(item) {
    await httpService.delete(urlResource + "/" + item.IdServicios);
}


async function Grabar(item) {
    if (item.IdServicios === 0) {
        await httpService.post(urlResource, item);
    } else {
    await httpService.put(urlResource + "/" + item.IdServicios, item);
    }
}


export const serviciosService = {
    Buscar,BuscarPorId,ActivarDesactivar,Grabar
};