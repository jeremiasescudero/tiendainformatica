const express = require("express");
const router = express.Router();
const { Perifericos } = require("../base-orm/sequelize-init"); // Importamos el modelo Perifericos
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las perifericoss
router.get('/perifericos', async (req, res) => {
    try {
        const perifericos = await Perifericos.findAll();
        res.json(perifericos);
    } catch (error) {
        console.error('Error al obtener las perifericoss:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para perifericos por id
router.get('/perifericos/:id', async(req,res) => {
    try {
        const perifericosId = req.params.id;
        const perifericos = await Perifericos.findByPk(perifericosId);
        if (perifericos) {
            res.json(perifericos);
        } else {
            res.status(404).json({ error: 'Perifericos no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la perifericos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una perifericos
router.post('/perifericos', async (req, res) => {
    try {
        const { nombre, fechaIngreso, tipoPeriferico_id } = req.body;

        const nuevaPerifericos = await Perifericos.create({
            nombre,
            fechaIngreso,
            tipoPeriferico_id
        });

        res.status(201).json(nuevaPerifericos);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al crear la nueva perifericos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar una perifericos
router.put('/perifericos/:id', async (req, res) => {
    try {
        const perifericosId = req.params.id;
        const perifericos = await Perifericos.findByPk(perifericosId);

        if (!perifericos) {
            return res.status(404).json({ error: 'Perifericos no encontrada' });
        }

        const { nombre, fechaIngreso, tipoPeriferico_id } = req.body;
        await perifericos.update({
            nombre,
            fechaIngreso,
            tipoPeriferico_id
        });

        res.json(perifericos);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar la perifericos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar una perifericos
router.delete('/perifericos/:id', async (req, res) => {
    try {
        const perifericosId = req.params.id;

        const perifericos = await Perifericos.findByPk(perifericosId);

        if (!perifericos) {
            return res.status(404).json({ error: 'Perifericos no encontrada' });
        }

        await perifericos.destroy();
        res.json({ message: 'Perifericos eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la perifericos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports=router;