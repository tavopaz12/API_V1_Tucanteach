const { Model, DataTypes, Sequelize } = require('sequelize');

const { CURSO_TABLE } = require('./curso.model');

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
  cursoId: {
    field: 'curso_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CURSO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Sesion extends Model {
  static associate(models) {
    this.belongsTo(models.Curso, { as: 'curso', onDelete: 'CASCADE' });
  
    this.hasMany(models.Actividad, {
      as: 'actividades',
      foreignKey: 'sesionId',
      onDelete: 'CASCADE',
    });
  }

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
