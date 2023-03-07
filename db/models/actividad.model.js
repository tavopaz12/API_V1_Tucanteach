const { Model, DataTypes, Sequelize } = require('sequelize');

const { SESION_TABLE } = require('./sesion.model');

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
  sesionId: {
    field: 'sesion_id',
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: SESION_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Actividad extends Model {
  static associate(models) {
    this.belongsTo(models.Sesion, { as: 'sesion', onDelete: 'CASCADE' });

    this.hasMany(models.Tema, {
      as: 'temas',
      foreignKey: 'actividadId',
      onDelete: 'CASCADE',
    });
  }

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
