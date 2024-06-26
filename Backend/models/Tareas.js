// en estos archivitos hago los modelos de las tablas de la base de datos
import { DataTypes } from "sequelize"

const tareasAttributes = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false // que no me permita null
    },
    UsuarioId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}

const tareasMethods = {
    timestamps: false
}

const TareasModel = {
    tareasAttributes,
    tareasMethods
}

export { TareasModel }