const express = require("express");
const router = express.Router();
const { MarcaCelular } = require("../base-orm/sequelize-init"); // Importamos el modelo Celulares
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las Celulares
router.get('/marcascelulares', async (req, res) => {
    try {
        const marcascelulares = await MarcaCelular.findAll();
        res.json(marcascelulares);
    } catch (error) {
        console.error('Error al obtener los Celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para Celulares por id
router.get('/marcascelulares/:id', async(req,res) => {
    try {
        const marcacelularesId = req.params.id;
        const marcascelulares = await MarcaCelular.findByPk(marcacelularesId);
        if (marcascelulares) {
            res.json(marcascelulares);
        } else {
            res.status(404).json({ error: 'celular no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener la Celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una Celulares
router.post('/marcascelulares', async (req, res) => {
    try {
        const { nombre, fechaIngreso } = req.body;

        const nuevamarcacel = await Celulares.create({
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
router.put('/marcascelulares/:id', async (req, res) => {
    try {
        const marcacelularesId = req.params.id;
        const marcascelulares = await Celulares.findByPk(marcacelularesId);

        if (!marcascelulares) {
            return res.status(404).json({ error: 'celular no encontrado' });
        }

        const { nombre, fechaIngreso } = req.body;
        await MarcaCelular.update({
            nombre,
            fechaIngreso
        });

        res.json(marcascelulares);
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
router.delete('/marcascelulares/:id', async (req, res) => {
    try {
        const marcacelularesId = req.params.id;

        const marcascelulares = await Celulares.findByPk(marcacelularesId);

        if (!marcascelulares) {
            return res.status(404).json({ error: 'celular no encontrado' });
        }

        await marcascelulares.destroy();
        res.json({ message: 'celular eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el celular:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
