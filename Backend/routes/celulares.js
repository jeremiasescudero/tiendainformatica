const express = require("express");
const router = express.Router();
const { Celulares } = require("../base-orm/sequelize-init"); // Importamos el modelo Celulares
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las Celulares
router.get('/celulares', async (req, res) => {
    try {
        const celulares = await Celulares.findAll();
        res.json(celulares);
    } catch (error) {
        console.error('Error al obtener los Celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para Celulares por id
router.get('/celulares/:id', async(req,res) => {
    try {
        const celularesId = req.params.id;
        const celulares = await Celulares.findByPk(celularesId);
        if (celulares) {
            res.json(celulares);
        } else {
            res.status(404).json({ error: 'celular no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener la Celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una Celulares
router.post('/celulares', async (req, res) => {
    try {
        const { nombre, fechaIngreso, marcaCelular_id } = req.body;

        const nuevocelular = await Celulares.create({
            nombre,
            fechaIngreso,
            marcaCelular_id
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
router.put('/celulares/:id', async (req, res) => {
    try {
        const celularesId = req.params.id;
        const celulares = await Celulares.findByPk(celularesId);

        if (!celulares) {
            return res.status(404).json({ error: 'celular no encontrado' });
        }

        const { nombre, fechaIngreso, marcaCelular_id } = req.body;
        await Celulares.update({
            nombre,
            fechaIngreso,
            marcaCelular_id
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

// Endpoint para eliminar una Celulares
router.delete('/celulares/:id', async (req, res) => {
    try {
        const celularesId = req.params.id;

        const celulares = await Celulares.findByPk(celularesId);

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
