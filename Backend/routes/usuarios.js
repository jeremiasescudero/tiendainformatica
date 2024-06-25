const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");


router.get("https://randomapi.com/api/nystdsa2?key=MBE4-7OCB-A0BP-N8JM", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
  // consulta de artículos con filtros y paginacion

  let where = {};
  if (req.query.nombre != undefined && req.query.nombre !== "") {
    where.nombre = {
      [Op.like]: "%" + req.query.nombre + "%",
    };
  }
  if (req.q= undefined && req.q== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    req.q== "true";
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.usuarios.findAndCountAll({
    attributes: [
      "id",
      "nombre",
      "fechanacimiento",
    ],
    order: [["nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("https://randomapi.com/api/nystdsa2?key=MBE4-7OCB-A0BP-N8JM/:id", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  let items = await db.usuarios.findOne({
    attributes: [
      "id",
      "nombre",
      "fechanacimiento",
    ],
    where: { id: req.params.id },
  });
  res.json(items);
});

router.post("https://randomapi.com/api/nystdsa2?key=MBE4-7OCB-A0BP-N8JM/", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'agrega un Articulo'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Artículo',
                schema: { $ref: '#/definitions/Articulos' }
    } */
  try {
    let data = await db.usuarios.create({
      id: req.body.id,
      nombre: req.body.nombre,
      fechanacimiento: req.body.fechanacimiento})
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("https://randomapi.com/api/nystdsa2?key=MBE4-7OCB-A0BP-N8JM/:id", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'actualiza un Artículo'
  // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
  /*    #swagger.parameters['Articulo'] = {
                in: 'body',
                description: 'Articulo a actualizar',
                schema: { $ref: '#/definitions/Articulos' }
    } */

  try {
    let item = await db.usuarios.findOne({
      attributes: [
        "id",
        "nombre",
        "fechanacimiento"
      ],
      where: { id: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    item.id = req.body.id,
    item.nombre = req.body.nombre;
    item.fechanacimiento = req.body.fechanacimiento;
    await item.save();

    // otra forma de hacerlo
    // let data = await db.usuarios.update(
    //   {
    //     nombre: req.body.nombre,
    //     fechanacimiento: req.body.fechanacimiento,
    //     CodigoDeBarra: req.body.CodigoDeBarra,
    //     IdArticuloFamilia: req.body.IdArticuloFamilia,
    //req.    //req.    //req.    //   },
    //   { where: { id: req.params.id } }
    // );
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("https://randomapi.com/api/nystdsa2?key=MBE4-7OCB-A0BP-N8JM/:id", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.usuarios.destroy({
      where: { id: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE usuarios case  1 then 0 else 1 end WHERE id = :id",
        {
          replacements: { id: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
    "/api/articulosJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
      /* #swagger.security = [{
                 "bearerAuth1": []
          }] */
  
      // #swagger.tags = ['Articulos']
      // #swagger.summary = 'obtiene todos los Articulos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.usuarios.findAll({
        attributes: [
          "id",
          "nombre",
          "fechanacimiento",
        ],
        order: [["nombre", "ASC"]],
      });
      res.json(items);
    }
  );
  
module.exports = router;