import sequelize from Sequelize

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alumno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    DNI: DataTypes.INTEGER,
    Nombre: DataTypes.STRING,
    FechaNacimiento: DataTypes.DATE,
    Calificacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alumno',
  });
  return Alumno;
};