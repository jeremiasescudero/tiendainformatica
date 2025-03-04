const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

let db;

// Función para abrir la base de datos
async function abrirBaseDatos() {
    db = await sqlite.open({
        filename: './.data/pr.db',
        driver: sqlite3.Database
    });
}

// Definición del modelo de MarcaCelular
const MarcaCelular = {
    nombre: "MarcaCelular",
    sql: `CREATE TABLE MarcaCelular (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL
        );`,
    datos: `INSERT INTO MarcaCelular (nombre) VALUES
    ('Samsung'),
    ('Apple'),
    ('Motorola'),
    ('Xiaomi'),
    ('Huawei'),
    ('LG'),
    ('Oppo'),
    ('Google'),
    ('Realme'),
    ('Honor');`
};

// Definición del modelo de Celulares
const Celulares = {
    nombre: "Celulares",
    sql: `CREATE TABLE Celulares (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fechaIngreso DATE NOT NULL,
          marcaCelular_id INTEGER NOT NULL,
          activo BOOLEAN NOT NULL DEFAULT TRUE,
          FOREIGN KEY (marcaCelular_id) REFERENCES MarcaCelular(id)
        );`,
    datos: `INSERT INTO Celulares (nombre, fechaIngreso, marcaCelular_id, activo) VALUES
    ('Galaxy S22', '2023-05-10', 1, TRUE),
    ('iPhone 13', '2023-05-12', 2, TRUE),
    ('Moto G100', '2023-05-15', 3, TRUE),
    ('Mi 11', '2023-05-18', 4, TRUE),
    ('P50 Pro', '2023-05-20', 5, TRUE),
    ('V60 ThinQ', '2023-05-22', 6, TRUE),
    ('Find X3', '2023-05-25', 7, TRUE),
    ('Pixel 6', '2023-05-28', 8, TRUE),
    ('GT Master', '2023-06-01', 9, TRUE),
    ('Magic 3', '2023-06-03', 10, TRUE);`
};

// Definición del modelo de MarcaNotebook
const MarcaNotebook = {
    nombre: "MarcaNotebook",
    sql: `CREATE TABLE MarcaNotebook (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL
        );`,
    datos: `INSERT INTO MarcaNotebook (nombre) VALUES
    ('Samsung'),
    ('Acer'),
    ('ASUS'),
    ('Lenovo'),
    ('Apple'),
    ('HP'),
    ('MSI'),
    ('Vaio'),
    ('Dell'),
    ('Huawei');`
};

// Definición del modelo de Notebooks
const Notebooks = {
    nombre: "Notebooks",
    sql: `CREATE TABLE Notebooks (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fechaIngreso DATE NOT NULL,
          marcaNotebook_id INTEGER NOT NULL,
          activo BOOLEAN NOT NULL DEFAULT TRUE,
          FOREIGN KEY (marcaNotebook_id) REFERENCES MarcaNotebook(id)
        );`,
    datos: `INSERT INTO Notebooks (nombre, fechaIngreso, marcaNotebook_id, activo) VALUES
    ('Galaxy Book', '2022-01-01', 1, TRUE),
    ('Aspire 5', '2022-02-15', 2, TRUE),
    ('ZenBook', '2022-05-20', 3, TRUE),
    ('ThinkPad', '2022-11-10', 4, TRUE),
    ('MacBook Pro', '2022-09-05', 5, TRUE),
    ('Pavilion', '2022-11-10', 6, TRUE),
    ('Prestige', '2022-11-10', 7, TRUE),
    ('VAIO 13', '2021-11-10', 8, TRUE),
    ('XPS 13', '2023-11-10', 9, TRUE),
    ('MateBook', '2021-11-10', 10, TRUE);`
};

// Definición del modelo de TipoPeriferico
const TipoPeriferico = {
    nombre: "TipoPeriferico",
    sql: `CREATE TABLE TipoPeriferico (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL
        );`,
    datos: `INSERT INTO TipoPeriferico (nombre) VALUES
          ('Auriculares'),
          ('Teclados'),
          ('Mouse'),
          ('Parlantes'),
          ('Mousepad'),
          ('Impresora'),
          ('Joystick'),
          ('Microfono'),
          ('Usb Dongle'),
          ('Cámara');`
};

// Definición del modelo de Perifericos
const Perifericos = {
    nombre: "Perifericos",
    sql: `CREATE TABLE Perifericos (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fechaIngreso DATE NOT NULL,
          tipoPeriferico_id INTEGER,
          activo BOOLEAN NOT NULL DEFAULT TRUE,
          FOREIGN KEY (tipoPeriferico_id) REFERENCES TipoPeriferico(id)
        );`,
    datos: `INSERT INTO Perifericos (nombre, fechaIngreso, tipoPeriferico_id, activo) VALUES
          ('Auriculares Sony', '2022-01-01', 1, TRUE),
          ('Teclado Logitech', '2022-01-01', 2, TRUE),
          ('Mouse Microsoft', '2022-01-01', 3, TRUE),
          ('Parlantes JBL', '2022-01-01', 4, TRUE),
          ('MousePad Steel', '2022-01-01', 5, TRUE),
          ('Impresora Epson', '2022-01-01', 6, TRUE),
          ('Joystick PS4', '2022-01-01', 7, TRUE),
          ('Microfono HyperX', '2022-01-01', 8, TRUE),
          ('USB Dongle generico', '2022-01-01', 9, TRUE),
          ('Camara Logitech', '2022-01-01', 10, TRUE);`
};

// Definición del modelo de TipoServicio
const TipoServicio = {
    nombre: "TipoServicio",
    sql: `CREATE TABLE TipoServicio (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL
        );`,
    datos: `INSERT INTO TipoServicio (nombre) VALUES
          ('Limpieza'),
          ('Mantenimiento Preventivo'),
          ('Instalación SW'),
          ('Recuperación de Datos'),
          ('Soporte Tecnico Remoto'),
          ('Eliminación de Virus'),
          ('Actualización componentes HW'),
          ('Configuración de Redes'),
          ('Soporte impresoras y perifericos'),
          ('Consultoría y asesoramiento');`
};

// Definición del modelo de Servicios
const Servicios = {
    nombre: "Servicios",
    sql: `CREATE TABLE Servicios (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fechaIngreso DATE NOT NULL,
          tipoServicio_id INTEGER,
          activo BOOLEAN NOT NULL DEFAULT TRUE,
          FOREIGN KEY (tipoServicio_id) REFERENCES TipoServicio(id)
        );`,
    datos: `INSERT INTO Servicios (nombre, fechaIngreso, tipoServicio_id, activo) VALUES
          ('Limpieza básica', '2022-08-08', 1, TRUE),
          ('Mantenimiento anual', '2022-04-01', 2, TRUE),
          ('Configuración Windows', '2022-01-01', 3, TRUE),
          ('Recuperación HDD', '2022-08-12', 4, TRUE),
          ('Asistencia remota', '2022-04-01', 5, TRUE),
          ('Eliminación Malware', '2021-02-01', 6, TRUE),
          ('Upgrade Hardware', '2023-12-01', 7, TRUE),
          ('Configuración LAN', '2022-09-11', 8, TRUE),
          ('Soporte Impresoras', '2022-05-10', 9, TRUE),
          ('Consultoría técnica', '2022-04-05', 10, TRUE);`
};

async function CrearBaseSiNoExiste() {
    try {
        // abrir base, si no existe el archivo/base lo crea
        await abrirBaseDatos();

        // Verificar y crear las tablas según los modelos
        await Promise.all([
            crearTablaSiNoExiste(MarcaCelular),
            crearTablaSiNoExiste(Celulares),
            crearTablaSiNoExiste(MarcaNotebook),
            crearTablaSiNoExiste(Notebooks),
            crearTablaSiNoExiste(TipoPeriferico),
            crearTablaSiNoExiste(Perifericos),
            crearTablaSiNoExiste(TipoServicio),
            crearTablaSiNoExiste(Servicios)
        ]);

        // Agregar datos iniciales si las tablas están vacías
        await Promise.all([
            agregarDatosIniciales(MarcaCelular),
            agregarDatosIniciales(MarcaNotebook),
            agregarDatosIniciales(TipoPeriferico),
            agregarDatosIniciales(TipoServicio),
            agregarDatosIniciales(Celulares),
            agregarDatosIniciales(Notebooks),
            agregarDatosIniciales(Perifericos),
            agregarDatosIniciales(Servicios)
        ]);

        console.log('Base de datos y tablas creadas correctamente.');
    } catch (error) {
        console.error('Error al crear la base de datos y tablas:', error);
    }
}

// Función para crear una tabla si no existe
async function crearTablaSiNoExiste(modelo) {
    const tablaExiste = await db.get(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
        [modelo.nombre]
    );

    if (!tablaExiste) {
        await db.run(modelo.sql);
        console.log(`Tabla '${modelo.nombre}' creada.`);
    }
}

// Función para agregar datos iniciales si la tabla está vacía
async function agregarDatosIniciales(modelo) {
    const cantidadRegistros = await db.get(`SELECT COUNT(*) as count FROM ${modelo.nombre}`);
    if (cantidadRegistros.count === 0) {
        await db.run(modelo.datos);
        console.log(`Datos iniciales agregados a la tabla '${modelo.nombre}'.`);
    }
}

// Ejecutar función principal para crear la base de datos y las tablas
CrearBaseSiNoExiste();

// Exportar la base de datos para su uso en otros módulos
module.exports = db;
