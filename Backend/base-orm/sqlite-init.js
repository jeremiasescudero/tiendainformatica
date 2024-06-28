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
          id INTEGER PRIMARY KEY AUTOINCREMENT,
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
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fechaIngreso DATE NOT NULL,
          marcaCelular_id INTEGER NOT NULL,
          FOREIGN KEY (marcaCelular_id) REFERENCES MarcaCelular(id)
        );`,
    datos: `INSERT INTO Celulares (nombre, fechaIngreso, marcaCelular_id) VALUES
    ('Galaxy S22', '2023-05-10', 1),
    ('iPhone 13', '2023-05-12', 2),
    ('Moto G100', '2023-05-15', 3),
    ('Mi 11', '2023-05-18', 4),
    ('P50 Pro', '2023-05-20', 5),
    ('V60 ThinQ', '2023-05-22', 6),
    ('Find X3', '2023-05-25', 7),
    ('Pixel 6', '2023-05-28', 8),
    ('GT Master', '2023-06-01', 9),
    ('Magic 3', '2023-06-03', 10);`
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
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fechaIngreso DATE NOT NULL,
          marcaNotebook_id INTEGER NOT NULL,
          FOREIGN KEY (marcaNotebook_id) REFERENCES MarcaNotebook(id)
        );`,
    datos: `INSERT INTO Notebooks (nombre, fechaIngreso, marcaNotebook_id) VALUES
    ('Galaxy Book', '2022-01-01', 1),
    ('Aspire 5', '2022-02-15', 2),
    ('ZenBook', '2022-05-20', 3),
    ('ThinkPad', '2022-11-10', 4),
    ('MacBook Pro', '2022-09-05', 5),
    ('Pavilion', '2022-11-10', 6),
    ('Prestige', '2022-11-10', 7),
    ('VAIO 13', '2021-11-10', 8),
    ('XPS 13', '2023-11-10', 9),
    ('MateBook', '2021-11-10', 10);`
};

// Definición del modelo de TipoPeriferico
const TipoPeriferico = {
    nombre: "TipoPeriferico",
    sql: `CREATE TABLE TipoPeriferico (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
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
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fechaIngreso DATE NOT NULL,
          tipoPeriferico_id INTEGER,
          FOREIGN KEY (tipoPeriferico_id) REFERENCES TipoPeriferico(id)
        );`,
    datos: `INSERT INTO Perifericos (nombre, fechaIngreso, tipoPeriferico_id) VALUES
          ('Auriculares Sony', '2022-01-01', 1),
          ('Teclado Logitech', '2022-01-01', 2),
          ('Mouse Microsoft', '2022-01-01', 3),
          ('Parlantes JBL', '2022-01-01', 4),
          ('MousePad Steel', '2022-01-01', 5),
          ('Impresora Epson', '2022-01-01', 6),
          ('Joystick PS4', '2022-01-01', 7),
          ('Microfono HyperX', '2022-01-01', 8),
          ('USB Dongle generico', '2022-01-01', 9),
          ('Camara Logitech', '2022-01-01', 10);`
};

// Definición del modelo de TipoServicio
const TipoServicio = {
    nombre: "TipoServicio",
    sql: `CREATE TABLE TipoServicio (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
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
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fechaIngreso DATE NOT NULL,
          tipoServicio_id INTEGER,
          FOREIGN KEY (tipoServicio_id) REFERENCES TipoServicio(id)
        );`,
    datos: `INSERT INTO Servicios (nombre, fechaIngreso, tipoServicio_id) VALUES
          ('Limpieza básica', '2022-08-08', 1),
          ('Mantenimiento anual', '2022-04-01', 2),
          ('Configuración Windows', '2022-01-01', 3),
          ('Recuperación HDD', '2022-08-12', 4),
          ('Asistencia remota', '2022-04-01', 5),
          ('Eliminación Malware', '2021-02-01', 6),
          ('Upgrade Hardware', '2023-12-01', 7),
          ('Configuración LAN', '2022-09-11', 8),
          ('Soporte Impresoras', '2022-05-10', 9),
          ('Consultoría técnica', '2022-04-05', 10);`
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

        // Agregar datos iniciales si las tablas están recién creadas
        await Promise.all([
            agregarDatosSiNoExisten(MarcaCelular),
            agregarDatosSiNoExisten(Celulares),
            agregarDatosSiNoExisten(MarcaNotebook),
            agregarDatosSiNoExisten(Notebooks),
            agregarDatosSiNoExisten(TipoPeriferico),
            agregarDatosSiNoExisten(Perifericos),
            agregarDatosSiNoExisten(TipoServicio),
            agregarDatosSiNoExisten(Servicios)
        ]);

        // cerrar la base
        await db.close();
    } catch (error) {
        console.error("Error al crear la base de datos:", error);
    }
}

// Función para crear la tabla si no existe
async function crearTablaSiNoExiste(modelo) {
    let existe = await tablaExiste(modelo.nombre);
    if (!existe) {
        await db.run(modelo.sql);
        console.log(`Tabla ${modelo.nombre} creada!`);
    }
}

// Función para verificar si la tabla ya existe
async function tablaExiste(nombreTabla) {
    let res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= ?",
        [nombreTabla]
    );
    return res.contar > 0;
}

// Función para agregar datos si no existen registros
async function agregarDatosSiNoExisten(modelo) {
    let res = await db.get(
        `SELECT count(*) as contar FROM ${modelo.nombre}`
    );
    if (res.contar === 0 && modelo.datos.trim().length > 0) {
        await db.run(modelo.datos);
        console.log(`Datos agregados a la tabla ${modelo.nombre}!`);
    }
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;

