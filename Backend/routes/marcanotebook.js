const express = require("express");
const router = express.Router();
const { MarcaNotebook } = require("../base-orm/sequelize-init"); // Importamos el modelo Notebooks
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las Notebooks
router.get('/marcasnotebooks', async (req, res) => {
    try {
        const marcasnotebooks = await MarcaNotebook.findAll();
        res.json(marcasnotebooks);
    } catch (error) {
        console.error('Error al obtener las marcas de notebooks:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para Notebooks por id
router.get('/marcasnotebooks/:id', async(req,res) => {
    try {
        const marcasnotebooksId = req.params.id;
        const marcasnotebooks = await marcasnotebooks.findByPk(marcasnotebooksId);
        if (marcasnotebooks) {
            res.json(marcasnotebooks);
        } else {
            res.status(404).json({ error: 'Marca de notebook no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener la marca de notebook:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una Notebooks
router.post('/marcasnotebooks', async (req, res) => {
    try {
        const { nombre} = req.body;

        const nuevomarcanotebook = await MarcaNotebook.create({
            nombre
            
        });

        res.status(201).json(nuevomarcanotebook);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al crear la nueva marca:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar una Notebooks
router.put('/marcasnotebooks/:id', async (req, res) => {
    try {
        const marcaNotebookId = req.params.id;
        const marcasNotebooks = await marcasNotebooks.findByPk(marcaNotebookId);

        if (!marcasNotebooks) {
            return res.status(404).json({ error: 'Marca de Notebook no encontrada' });
        }

        const { nombre } = req.body;
        await marcasNotebooks.update({
            nombre
        });

        res.json(marcasNotebooks);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar las marcas de Notebooks:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar una MarcaNotebook
router.delete('/marcasnotebooks/:id', async (req, res) => {
    try {
        const marcaNotebookId = req.params.id;

        const marcasNotebooks = await marcasNotebooks.findByPk(marcaNotebookId);

        if (!marcasNotebooks) {
            return res.status(404).json({ error: 'Marca de notebook no encontrada' });
        }

        await marcasNotebooks.destroy();
        res.json({ message: 'marca de notebook eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la marca de notebook:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
