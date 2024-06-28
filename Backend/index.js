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
        "Celulares <a href='http://localhost:4000/celulares'>http://localhost:4000/celulares</a><br>" +
        "Marcas de Celulares <a href='http://localhost:4000/marcascelulares'>http://localhost:4000/marcascelulares</a><br>" +
        "Notebooks <a href='http://localhost:4000/notebooks'>http://localhost:4000/notebooks</a><br>" +
        "Marcas de Notebooks <a href='http://localhost:4000/marcasnotebooks'>http://localhost:4000/marcasnotebooks</a><br>" +
        "Perifericos <a href='http://localhost:4000/perifericos'>http://localhost:4000/perifericos</a><br>" +
        "Tipos de Perifericos <a href='http://localhost:4000/tipoperiferico'>http://localhost:4000/tipoperiferico</a>"+
        "Servicios <a href='http://localhost:4000/servicios'>http://localhost:4000/servicios</a>"+
        "Tipos de Servicios <a href='http://localhost:4000/tiposervicios'>http://localhost:4000/tiposervicios</a>");});


// Routes para los nuevos modelos
const marcacelularesRouter = require("./routes/marcacelulares");
const celularesRouter = require("./routes/celulares");
const marcanotebooksRouter = require("./routes/marcasnotebooks");
const notebooksRouter = require("./routes/notebooks");
const tipoperifericoRouter = require("./routes/tipoperiferico");
const perifericosRouter = require("./routes/perifericos");
const tiposervicioRouter = require("./routes/tiposervicio");
const serviciosRouter = require("./routes/servicios");


// Middleware para las nuevas rutas
app.use(marcacelularesRouter);
app.use(celularesRouter);
app.use(marcanotebooksRouter);
app.use(notebooksRouter);
app.use(tipoperifericoRouter);
app.use(perifericosRouter);
app.use(tiposervicioRouter);
app.use(serviciosRouter);


// Levantar servidor
if (!module.module) {
    // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    const port = process.env.PORT || 4000; // en producción se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
        console.log(`Servidor hosteado en http://localhost:${port}`);
    });
}

// module.exports = app; // para testing