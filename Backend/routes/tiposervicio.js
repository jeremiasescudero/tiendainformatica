const express = require("express");
const router = express.Router();
const { TipoServicio } = require("../base-orm/sequelize-init"); // Importamos el modelo TipoServicio
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las TipoServicio
router.get('/tiposervicio', async (req, res) => {
    try {
        const tipoServicio = await TipoServicio.findAll();
        res.json(tipoServicio);
    } catch (error) {
        console.error('Error al obtener los Tipode Servicio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para TipoServicio por id
router.get('/tiposervicio/:id', async(req,res) => {
    try {
        const TipoServicioId = req.params.id;
        const tipoServicio = await TipoServicio.findByPk(TipoServicioId);
        if (tipoServicio) {
            res.json(tipoServicio);
        } else {
            res.status(404).json({ error: 'Tipo de Servicio no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el TipoServicio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una TipoServicio
router.post('tiposervicio', async (req, res) => {
    try {
        const { nombre, fechaIngreso } = req.body;

        const nuevoTipoServicio = await TipoServicio.create({
            nombre,
            fechaIngreso
        });

        res.status(201).json(nuevoTipoServicio);
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

// Endpoint para actualizar una TipoServicio
router.put('/tiposervicio/:id', async (req, res) => {
    try {
        const TipoServicioId = req.params.id;
        const tipoServicio = await TipoServicio.findByPk(TipoServicioId);

        if (!tipoServicio) {
            return res.status(404).json({ error: 'Tipo de Servicio no encontrada' });
        }

        const { nombre, fechaIngreso } = req.body;
        await tipoServicio.update({
            nombre,
            fechaIngreso
        });

        res.json(tipoServicio);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar la Tipo de Servicio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar una TipoServicio
router.delete('/tiposervicio/:id', async (req, res) => {
    try {
        const TipoServicioId = req.params.id;

        const tipoServicio = await TipoServicio.findByPk(TipoServicioId);

        if (!tipoServicio) {
            return res.status(404).json({ error: 'Tipo de Servicio no encontrada' });
        }

        await tipoServicio.destroy();
        res.json({ message: 'Tipo de Servicio eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la Tipo de Servicio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
