const { Model, DataTypes, Sequelize } = require('sequelize');

const { ACTIVIDAD_TABLE } = require('./actividad.model');

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
  actividadId: {
    field: 'actividad_id',
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: ACTIVIDAD_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Tema extends Model {
  static associate(models) {
    this.belongsTo(models.Actividad, { as: 'actividad', onDelete: 'CASCADE' });
  }
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
