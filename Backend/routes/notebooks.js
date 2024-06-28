const express = require("express");
const router = express.Router();
const { Notebooks } = require("../base-orm/sequelize-init"); // Importamos el modelo celulares
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las Celulares
router.get('/notebooks', async (req, res) => {
    try {
        const notebooks = await Notebooks.findAll();
        res.json(notebooks);
    } catch (error) {
        console.error('Error al obtener las Notebooks:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para celulares por id
router.get('/notebooks/:id', async(req,res) => {
    try {
        const notebooksId = req.params.id;
        const notebooks = await Notebooks.findByPk(notebooksId);
        if (notebooks) {
            res.json(notebooks);
        } else {
            res.status(404).json({ error: 'Notebook no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener las Notebooks:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una celulares
router.post('/notebooks', async (req, res) => {
    try {
        const { nombre, fechaIngreso,marcaNotebook_id } = req.body;

        const nuevanotebook = await Notebook.create({
            nombre,
            fechaIngreso,
            marcaNotebook_id
        });

        res.status(201).json(nuevanotebook);
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

// Endpoint para actualizar una notebook
router.put('/notebooks/:id', async (req, res) => {
    try {
        const notebooksId = req.params.id;
        const notebooks = await Notebooks.findByPk(notebooksId);

        if (!notebooks) {
            return res.status(404).json({ error: 'Notebooks no encontrada' });
        }

        const { nombre, fechaIngreso,marcaNotebook_id } = req.body;
        await Notebook.update({
            nombre,
            fechaIngreso,
            marcaNotebook_id
        });

        res.json(notebook);
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
router.delete('/notebook/:id', async (req, res) => {
    try {
        const notebookId = req.params.id;

        const notebook = await notebook.findByPk(celularesId);

        if (!notebook) {
            return res.status(404).json({ error: 'celulares no encontrada' });
        }

        await notebook.destroy();
        res.json({ message: 'Notebooks eliminadas correctamente' });

    } catch (error) {
        console.error('Error al eliminar las notebooks:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;