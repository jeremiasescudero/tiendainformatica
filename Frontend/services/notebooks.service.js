import httpService from "./http.service";
const urlResource = "http://localhost:4000/notebooks";


async function Buscar(nombre) {
    const resp = await httpService.get(urlResource, {
        params: { nombre },
    });
    return resp.data;
}


async function BuscarPorId(item) {
    const resp = await httpService.get(urlResource + "/" + item.IdNotebooks);
    return resp.data;
}


async function ActivarDesactivar(item) {
    await httpService.delete(urlResource + "/" + item.IdNotebooks);
}


async function Grabar(item) {
    if (item.IdNotebooks === 0) {
        await httpService.post(urlResource, item);
    } else {
    await httpService.put(urlResource + "/" + item.IdNotebooks, item);
    }
}


export const notebooksService = {
    Buscar,BuscarPorId,ActivarDesactivar,Grabar
};