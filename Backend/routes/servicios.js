const express = require("express");
const router = express.Router();
const { Servicios } = require("../base-orm/sequelize-init"); // Importamos el modelo servicios
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las servicios
router.get('/servicios', async (req, res) => {
    try {
        const servicios = await Servicios.findAll();
        res.json(servicios);
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para servicios por id
router.get('/servicios/:id', async(req,res) => {
    try {
        const serviciosId = req.params.id;
        const servicios = await Servicios.findByPk(serviciosId);
        if (servicios) {
            res.json(servicios);
        } else {
            res.status(404).json({ error: 'servicio no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener la servicios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una servicios
router.post('/servicios', async (req, res) => {
    try {
        const { nombre, fechaIngreso } = req.body;

        const nuevoservicio = await Servicios.create({
            nombre,
            fechaIngreso
        });

        res.status(201).json(nuevoservicio);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al crear el nuevo Producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar una servicios
router.put('/servicios/:id', async (req, res) => {
    try {
        const serviciosId = req.params.id;
        const servicios = await Servicios.findByPk(serviciosId);

        if (!servicios) {
            return res.status(404).json({ error: 'servicios no encontrada' });
        }

        const { nombre, fechaIngreso } = req.body;
        await servicios.update({
            nombre,
            fechaIngreso
        });

        res.json(servicios);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar la servicios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar una servicios
router.delete('/servicios/:id', async (req, res) => {
    try {
        const serviciosId = req.params.id;

        const servicios = await Servicios.findByPk(serviciosId);

        if (!servicios) {
            return res.status(404).json({ error: 'servicios no encontrada' });
        }

        await servicios.destroy();
        res.json({ message: 'servicios eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la servicios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
