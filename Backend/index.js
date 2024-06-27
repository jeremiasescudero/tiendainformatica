const express = require("express");
const app = express();

console.clear();

require("./base-orm/sqlite-init"); // crear base si no existe

app.use(express.json()); // para poder leer json en el body

const cors = require("cors");
app.use(
    cors({
        origin: "*", // origin: 'https://dds-frontend.azurewebsites.net'
    })
);

// Controlar ruta principal
app.get("/", (req, res) => {
    res.send("dds-backend iniciado!<br>" +
        "Celulares <a href='http://localhost:4000/bodega'>http://localhost:4000/bodega</a><br>" +
        "Marcas de Celulares <a href='http://localhost:4000/vino'>http://localhost:4000/vino</a><br>" +
        "Notebooks <a href='http://localhost:4000/resenia'>http://localhost:4000/resenia</a><br>" +
        "Marcas de Notebooks <a href='http://localhost:4000/enologo'>http://localhost:4000/enologo</a><br>" +
        "Perifericos <a href='http://localhost:4000/cliente'>http://localhost:4000/cliente</a><br>" +
        "Tipos de Perifericos <a href='http://localhost:4000/pedido'>http://localhost:4000/pedido</a>"+
        "Servicios <a href='http://localhost:4000/pedido'>http://localhost:4000/pedido</a>"+
        "Tipos de Servicios <a href='http://localhost:4000/pedido'>http://localhost:4000/pedido</a>"+);});


// Routes para los nuevos modelos
const marcacelularesRouter = require("./routes/marcacelulares");
const celularesRouter = require("./routes/celulares");
const marcanotebooksRouter = require("./routes/notebooks");
const notebooksRouter = require("./routes/resenia");
const tipoperifericosRouter = require("./routes/tiposperifericos");
const perifericosRouter = require("./routes/perifericos");
const tiposerviciosRouter = require("./routes/tiposervicios");
const serviciosRouter = require("./routes/servicios");

// Middleware para las nuevas rutas
app.use(marcacelularesRouter);
app.use(celularesRouter);
app.use(marcanotebooksRouter);
app.use(notebooksRouter);
app.use(tipoperifericosRouter);
app.use(perifericosRouter);
app.use(tiposerviciosRouter);
app.use(serviciosRouter);


// Levantar servidor
if (!module.parent) {
    // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    const port = process.env.PORT || 4000; // en producción se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
        console.log(`Servidor hosteado en http://localhost:${port}`);
    });
}

// module.exports = app; // para testing