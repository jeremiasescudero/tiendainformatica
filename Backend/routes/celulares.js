const express = require("express");
const router = express.Router();
const { Celulares } = require("../base-orm/sequelize-init"); // Importamos el modelo Celulares
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las Celulares
router.get('/Celulares', async (req, res) => {
    try {
        const celulares = await Celulares.findAll();
        res.json(celulares);
    } catch (error) {
        console.error('Error al obtener los Celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para Celulares por id
router.get('/Celulares/:id', async(req,res) => {
    try {
        const celularesId = req.params.id;
        const celulares = await Celulares.findByPk(CelularesId);
        if (Celulares) {
            res.json(Celulares);
        } else {
            res.status(404).json({ error: 'celular no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener la Celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una Celulares
router.post('/Celulares', async (req, res) => {
    try {
        const { nombre, fechaIngreso } = req.body;

        const nuevocelular = await Celulares.create({
            nombre,
            fechaIngreso
        });

        res.status(201).json(nuevocelular);
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

// Endpoint para actualizar una Celulares
router.put('/Celulares/:id', async (req, res) => {
    try {
        const CelularesId = req.params.id;
        const Celulares = await Celulares.findByPk(CelularesId);

        if (!Celulares) {
            return res.status(404).json({ error: 'celular no encontrado' });
        }

        const { nombre, fechaIngreso } = req.body;
        await Celulares.update({
            nombre,
            fechaIngreso
        });

        res.json(Celulares);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar el celular:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar una Celulares
router.delete('/Celulares/:id', async (req, res) => {
    try {
        const CelularesId = req.params.id;

        const Celulares = await Celulares.findByPk(CelularesId);

        if (!Celulares) {
            return res.status(404).json({ error: 'celular no encontrado' });
        }

        await Celulares.destroy();
        res.json({ message: 'celular eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el celular:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
