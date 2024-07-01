const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/pr.db");

// Definición del modelo de MarcaCelular
const MarcaCelular = sequelize.define(
    'MarcaCelular',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [5, 25],
                    msg: "Nombre debe ser tipo caracteres, entre 5 y 25 de longitud"
                }
            }
        }, 
    },
    { timestamps: false,
        freezeTableName: true
     }
);

// Definición del modelo de Celulares
const Celulares = sequelize.define(
    'Celulares',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Nombre es requerido"
                }
            }
        },
        fechaIngreso: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Fecha es requerida"
                }
            }
        },
        marcaCelular_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: MarcaCelular,
                key: 'id'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "El ID es requerido"
                }
            }
        }
    },
    { timestamps: false }
);

// Definición del modelo de MarcaNotebook
const MarcaNotebook = sequelize.define(
    'MarcaNotebook',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [2, 50],
                    msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud"
                }
            }
        },
    },
    { timestamps: false,
        freezeTableName: true
     }
);

// Definición del modelo de Notebooks
const Notebooks = sequelize.define(
    'Notebooks',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [2, 50],
                    msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud"
                }
            }
        },
        fechaIngreso: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Fecha de ingreso es requerida"
                }
            }
        },
        marcaNotebook_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: MarcaNotebook,
                key: 'id'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "El ID es requerido"
                }
            }
        }
    },
    { timestamps: false }
);

// Definición del modelo de TipoPeriferico
const TipoPeriferico = sequelize.define(
    'TipoPeriferico',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [2, 50],
                    msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud"
                }
            }
        },
    },
    { timestamps: false,
        freezeTableName: true
     }
);

// Definición del modelo de Pedido
const Perifericos = sequelize.define(
    'Perifericos',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [2, 50],
                    msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud"
                }
            }
        },
        fechaIngreso: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Fecha del ingreso es requerida"
                }
            }
        },
        tipoPeriferico_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: TipoPeriferico,
                key: 'id'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "El ID es requerido"
                }
            }
        },
    },
    { timestamps: false }
);

// Definición del modelo de TipoServicio
const TipoServicio = sequelize.define(
    'TipoServicio',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [2, 50],
                    msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud"
                }
            }
        },
    },
    { timestamps: false,
        freezeTableName: true
     }
);


// Definición del modelo de Pedido
const Servicios = sequelize.define(
    'Servicios',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [2, 50],
                    msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud"
                }
            }
        },
        fechaIngreso: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Fecha del ingreso es requerida"
                }
            }
        },
        tipoServicio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: TipoServicio,
                key: 'id'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: "El ID es requerido"
                }
            }
        },
    },
    { timestamps: false }
);
Celulares.belongsTo(MarcaCelular, {
    foreignKey: 'marcaCelular_id',
    as: 'marcaCelular' // Alias opcional para la asociación
  });

// Exportación de los modelos
module.exports = {
    sequelize,
    Celulares,
    MarcaCelular,
    Notebooks,
    MarcaNotebook,
    Perifericos,
    TipoPeriferico,
    Servicios,
    TipoServicio
};
