const sql = require('mssql');

const config = {
    server: 'GOAT\SQLEXPRESS', 
    database: 'TiendaInformatica',
    options: {
        encrypt: true, 
        enableArithAbort: true 
    }
};

async function conectarYConsultar() {
    try {
        await sql.connect(config);
        console.log('Conexión exitosa a la base de datos SQL Server');
    } catch (err) {
        console.error('Error al conectar con la base de datos: ', err);
    }
}

module.exports = {
    conectarYConsultar
};