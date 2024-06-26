import { Sequelize } from "sequelize";
import { TareasModel } from "../models/Tareas.js";
import { UsuariosModel } from "../models/Usuarios.js";

// cadena de conexion + bd
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite"
})

// Vincular en base de datos
// sequelize.define(nombre, atributos, metodos)
sequelize.define("Tareas", TareasModel.tareasAttributes, TareasModel.tareasMethods)
sequelize.define("Usuarios", UsuariosModel.usuariosAttributes, UsuariosModel.usuariosMethods)

// crear FKs
sequelize.models.Tareas.belongsTo(sequelize.models.Usuarios, { foreignKey: "UsuarioId" })

export default sequelize