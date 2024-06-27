const express = require("express");
const router = express.Router();
const { TipoPeriferico } = require("../base-orm/sequelize-init"); // Importamos el modelo TipoPeriferico
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las tipoperifericos
router.get('/tipoperiferico', async (req, res) => {
    try {
        const tipoperiferico = await TipoPeriferico.findAll();
        res.json(tipoperiferico);
    } catch (error) {
        console.error('Error al obtener las tipoperifericos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para tipoperiferico por id
router.get('/tipoperiferico/:id', async(req,res) => {
    try {
        const tipoperifericoId = req.params.id;
        const tipoperiferico = await TipoPeriferico.findByPk(tipoperifericoId);
        if (tipoperiferico) {
            res.json(tipoperiferico);
        } else {
            res.status(404).json({ error: 'TipoPeriferico no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la tipoperiferico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una tipoperiferico
router.post('/tipoperiferico', async (req, res) => {
    try {
        const { nombre} = req.body;

        const nuevaTipoPeriferico = await TipoPeriferico.create({
            nombre
        });

        res.status(201).json(nuevaTipoPeriferico);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al crear la nueva tipoperiferico:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar una tipoperiferico
router.put('/tipoperiferico/:id', async (req, res) => {
    try {
        const tipoperifericoId = req.params.id;
        const tipoperiferico = await TipoPeriferico.findByPk(tipoperifericoId);

        if (!tipoperiferico) {
            return res.status(404).json({ error: 'TipoPeriferico no encontrada' });
        }

        const { nombre} = req.body;
        await tipoperiferico.update({
            nombre
        });

        res.json(tipoperiferico);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar la tipoperiferico:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar una tipoperiferico
router.delete('/tipoperiferico/:id', async (req, res) => {
    try {
        const tipoperifericoId = req.params.id;

        const tipoperiferico = await TipoPeriferico.findByPk(tipoperifericoId);

        if (!tipoperiferico) {
            return res.status(404).json({ error: 'TipoPeriferico no encontrada' });
        }

        await tipoperiferico.destroy();
        res.json({ message: 'TipoPeriferico eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la tipoperiferico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports=router;