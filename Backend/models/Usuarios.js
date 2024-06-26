import { DataTypes } from "sequelize"

const usuariosAttributes = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false // que no me permita null
    },
    apellido: {
        type: DataTypes.TEXT,
        allowNull: false // que no me permita null
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false // que no me permita null
    },
    usuario: {
        type: DataTypes.TEXT,
        allowNull: false // que no me permita null
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false // que no me permita null
    },
    fecha_alta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}

const usuariosMethods = {
    timestamps: false
}

const UsuariosModel = {
    usuariosAttributes,
    usuariosMethods
}

export { UsuariosModel }