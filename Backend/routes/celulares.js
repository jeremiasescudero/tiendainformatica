const express = require("express");
const router = express.Router();
const { celulares } = require("../base-orm/sequelize-init"); // Importamos el modelo celulares
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las Celulares
router.get('/celulares', async (req, res) => {
    try {
        const Celulares = await celulares.findAll();
        res.json(Celulares);
    } catch (error) {
        console.error('Error al obtener los Celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para celulares por id
router.get('/celulares/:id', async(req,res) => {
    try {
        const celularesId = req.params.id;
        const celulares = await celulares.findByPk(celularesId);
        if (celulares) {
            res.json(celulares);
        } else {
            res.status(404).json({ error: 'celular no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener la celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una celulares
router.post('/celulares', async (req, res) => {
    try {
        const { nombre, fechaIngreso } = req.body;

        const nuevocelular = await celulares.create({
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

// Endpoint para actualizar una celulares
router.put('/celulares/:id', async (req, res) => {
    try {
        const celularesId = req.params.id;
        const celulares = await celulares.findByPk(celularesId);

        if (!celulares) {
            return res.status(404).json({ error: 'celular no encontrado' });
        }

        const { nombre, fechaIngreso } = req.body;
        await celulares.update({
            nombre,
            fechaIngreso
        });

        res.json(celulares);
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

// Endpoint para eliminar una celulares
router.delete('/celulares/:id', async (req, res) => {
    try {
        const celularesId = req.params.id;

        const celulares = await celulares.findByPk(celularesId);

        if (!celulares) {
            return res.status(404).json({ error: 'celular no encontrado' });
        }

        await celulares.destroy();
        res.json({ message: 'celular eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el celular:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;