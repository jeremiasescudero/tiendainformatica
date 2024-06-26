import express from "express"
import { usersServices } from "../services/usuarios.service.js"

const router = express.Router() // en este router defino ENDPOINTS

// obtener todos los usuarios
router.get("/obtenerTodos", async (req, res) => {
    try {
        const usuarios = await usersServices.getAll() // llamo al servicio de obtener todos los usuarios
        res.json(usuarios)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Oops, algo salio mal" })
    }
})

// PATH PARAM
// se declara como /:nombreDePathParam, en postman se usaria por ejemplpo obtenerById/1
router.get("/obtenerById/:id", async (req, res) => {
    try {
        const usuario = await usersServices.getById(req.params.id) // llamo al servicio de obtener por id
        res.json(usuario)
    } catch (error) {
        res.status(404).json({ error: "No existe ese usuario" })
    }
})

// crear un nuevo usuario, a traves de lo ue este en el cuerpo de la peticion
router.post("/crearUsuario", async (req, res) => {
    try {
        const usuario = await usersServices.createUser(req.body)
        res.json(usuario)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// TAREA: HACER UN GET BY FILTER DE USUARIOS (EL FILTRO LO DECIDEN UDS) (SOLO BACKEND)
router.get("/byFilters", async (req, res) => {
    try {
        const response = await usersServices.getByFilters(req.query.nombre, req.query.apellido)
        return res.json(response)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
})

// QUERY PARAM
// en postman esto se usa: /usuarioABorrar?id=12
router.delete("/usuarioABorrar", async (req, res, next) => {
    const { id } = req.query // extraigo el query param
    try {
        const response = await usersServices.deleteUser(id) // invoco al servicio
        return res.json(response)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.put("/modificar", async (req, res) => {
    const { id } = req.query
    try {
        const response = await usersServices.updateUser(id, req.body)
        return res.json(response)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.get("/ejercicio", async (req, res) => {
    const { apellido } = req.query
    try {
        const response = await usersServices.ejercicio(apellido)
        return res.json(response)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

const usuariosRouter = {
    router
}

export { usuariosRouter }