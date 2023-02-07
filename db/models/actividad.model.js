const { Model, DataTypes, Sequelize } = require('sequelize');

const ACTIVIDAD_TABLE = 'actividades';

const ActividadSchema = {
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

class Actividad extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ACTIVIDAD_TABLE,
      modelName: 'Actividad',
      timestamps: false,
    };
  }
}

module.exports = { ACTIVIDAD_TABLE, ActividadSchema, Actividad };
