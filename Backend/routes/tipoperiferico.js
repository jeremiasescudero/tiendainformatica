const express = require("express");
const router = express.Router();
const { TipoPeriferico } = require("../base-orm/sequelize-init"); // Importamos el modelo TipoPeriferico
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las TipoPeriferico
router.get('/TipoPeriferico', async (req, res) => {
    try {
        const TipoPeriferico = await TipoPeriferico.findAll();
        res.json(TipoPeriferico);
    } catch (error) {
        console.error('Error al obtener los TipoPeriferico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para TipoPeriferico por id
router.get('/TipoPeriferico/:id', async(req,res) => {
    try {
        const TipoPerifericoId = req.params.id;
        const TipoPeriferico = await TipoPeriferico.findByPk(TipoPerifericoId);
        if (TipoPeriferico) {
            res.json(TipoPeriferico);
        } else {
            res.status(404).json({ error: 'TipoPeriferico no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el TipoPeriferico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una TipoPeriferico
router.post('/TipoPeriferico', async (req, res) => {
    try {
        const { nombre } = req.body;

        const nuevoTipoPeriferico = await TipoPeriferico.create({
            nombre,
            fechaInaguracion
        });

        res.status(201).json(nuevoTipoPeriferico);
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

// Endpoint para actualizar una TipoPeriferico
router.put('/TipoPeriferico/:id', async (req, res) => {
    try {
        const TipoPerifericoId = req.params.id;
        const TipoPeriferico = await TipoPeriferico.findByPk(TipoPerifericoId);

        if (!TipoPeriferico) {
            return res.status(404).json({ error: 'TipoPeriferico no encontrada' });
        }

        const { nombre } = req.body;
        await TipoPeriferico.update({
            nombre,
            fechaInaguracion
        });

        res.json(TipoPeriferico);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar la TipoPeriferico:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar una TipoPeriferico
router.delete('/TipoPeriferico/:id', async (req, res) => {
    try {
        const TipoPerifericoId = req.params.id;

        const TipoPeriferico = await TipoPeriferico.findByPk(TipoPerifericoId);

        if (!TipoPeriferico) {
            return res.status(404).json({ error: 'TipoPeriferico no encontrada' });
        }

        await TipoPeriferico.destroy();
        res.json({ message: 'TipoPeriferico eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la TipoPeriferico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
