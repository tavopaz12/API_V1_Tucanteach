const { Model, DataTypes, Sequelize } = require('sequelize');

const TEMA_TABLE = 'temas';

const TemaSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Tema extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TEMA_TABLE,
      modelName: 'Tema',
      timestamps: false,
    };
  }
}

module.exports = { TEMA_TABLE, TemaSchema, Tema };
