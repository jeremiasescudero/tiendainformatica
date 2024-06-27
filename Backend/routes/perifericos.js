const express = require("express");
const router = express.Router();
const { Perifericos } = require("../base-orm/sequelize-init"); // Importamos el modelo Perifericos
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las Perifericos
router.get('/Perifericos', async (req, res) => {
    try {
        const Perifericos = await Perifericos.findAll();
        res.json(Perifericos);
    } catch (error) {
        console.error('Error al obtener los Perifericos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para Perifericos por id
router.get('/Perifericos/:id', async(req,res) => {
    try {
        const PerifericosId = req.params.id;
        const Perifericos = await Perifericos.findByPk(PerifericosId);
        if (Perifericos) {
            res.json(Perifericos);
        } else {
            res.status(404).json({ error: 'Periferico no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener la Perifericos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una Perifericos
router.post('/Perifericos', async (req, res) => {
    try {
        const { nombre, fechaIngreso } = req.body;

        const nuevoPeriferico = await Perifericos.create({
            nombre,
            fechaIngreso
        });

        res.status(201).json(nuevoPeriferico);
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

// Endpoint para actualizar una Perifericos
router.put('/Perifericos/:id', async (req, res) => {
    try {
        const PerifericosId = req.params.id;
        const Perifericos = await Perifericos.findByPk(PerifericosId);

        if (!Perifericos) {
            return res.status(404).json({ error: 'Perifericos no encontrada' });
        }

        const { nombre, fechaIngreso } = req.body;
        await Perifericos.update({
            nombre,
            fechaIngreso
        });

        res.json(Perifericos);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar la Perifericos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar una Perifericos
router.delete('/Perifericos/:id', async (req, res) => {
    try {
        const PerifericosId = req.params.id;

        const Perifericos = await Perifericos.findByPk(PerifericosId);

        if (!Perifericos) {
            return res.status(404).json({ error: 'Perifericos no encontrada' });
        }

        await Perifericos.destroy();
        res.json({ message: 'Perifericos eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la Perifericos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
