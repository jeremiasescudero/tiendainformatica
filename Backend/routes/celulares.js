const express = require("express");
const router = express.Router();
const { Celulares } = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

// Endpoint para obtener todas las Celulares
router.get('/celulares', async (req, res) => {
    try {
        const celulares = await Celulares.findAll({
            attributes: ["Id", "nombre", "fechaIngreso", "marcaCelular_id","activo",],
            order: [["Id", "ASC"]],
        });
        console.log(`Todos los celulares:`, celulares);
        res.json(celulares);
    } catch (error) {
        console.error('Error al obtener los celulares:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener una Celulares por id
router.get('/celulares/:Id', async(req, res) => {
    try {
        const celularesId = req.params.Id;
        //console.log(`Buscando celular con ID: ${celularesId}`);
        const celulares = await Celulares.findByPk(celularesId);
        //console.log(`Resultado de la búsqueda:`, celulares);
        
        if (celulares) {
            res.json(celulares);
        } else {
            res.status(404).json({ error: 'Celular no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el celular:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/celulares', async (req, res) => {
    try {
      const nuevoCelular = await Celulares.create(
        {
          nombre: req.body.nombre,
          fechaIngreso: req.body.fechaIngreso,
          marcaCelular_id: req.body.marcaCelular_id,
          activo: req.body.activo
        });
      res.status(200).json(nuevoCelular);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Endpoint para actualizar una Celular
router.put('/celulares/:Id', async (req, res) => {
    try {
        const celularesId = req.params.Id;
        const celular = await Celulares.findByPk(celularesId);

        if (!celular) {
            return res.status(404).json({ error: 'Celular no encontrado' });
        }

        const { nombre, fechaIngreso, marcaCelular_id,activo } = req.body;
        await celular.update({ nombre, fechaIngreso, marcaCelular_id,activo });

        res.json(celular);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error al actualizar el celular:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar una Celulares por id
router.delete('/celulares/:Id', async (req, res) => {
    try {
        const celularesId = req.params.Id;
        const celulares = await Celulares.findByPk(celularesId);

        if (!celulares) {
            return res.status(404).json({ error: 'Celular no encontrado' });
        }

        await celulares.destroy();
        res.json({ message: 'Celular eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el celular:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
