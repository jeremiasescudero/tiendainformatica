const express = require("express");
const router = express.Router();
const { notebook } = require("../base-orm/sequelize-init"); // Importamos el modelo celulares
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las Celulares
router.get('/notebook', async (req, res) => {
    try {
        const Notebook = await notebook.findAll();
        res.json(Notebook);
    } catch (error) {
        console.error('Error al obtener las Notebooks:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para celulares por id
router.get('/notebook/:id', async(req,res) => {
    try {
        const notebookId = req.params.id;
        const notebook = await notebook.findByPk(notebookId);
        if (notebook) {
            res.json(notebook);
        } else {
            res.status(404).json({ error: 'notebook no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener las notebook:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una celulares
router.post('/notebook', async (req, res) => {
    try {
        const { nombre, fechaInaguracion } = req.body;

        const nuevocelular = await celulares.create({
            nombre,
            fechaInaguracion
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
            return res.status(404).json({ error: 'celulares no encontrada' });
        }

        const { nombre, fechaInaguracion } = req.body;
        await celulares.update({
            nombre,
            fechaInaguracion
        });

        res.json(celulares);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar la celulares:', error);
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
            return res.status(404).json({ error: 'celulares no encontrada' });
        }

        await celulares.destroy();
        res.json({ message: 'celulares eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;