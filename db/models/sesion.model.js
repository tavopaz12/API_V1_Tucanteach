const { Model, DataTypes, Sequelize } = require('sequelize');

const SESION_TABLE = 'sesiones';

const SesionSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  objective: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Sesion extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: SESION_TABLE,
      modelName: 'Sesion',
      timestamps: false,
    };
  }
}

module.exports = { SESION_TABLE, SesionSchema, Sesion };
