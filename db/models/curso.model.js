const { Model, DataTypes, Sequelize } = require('sequelize');

const CURSO_TABLE = 'cursos';

const CursoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Curso extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: CURSO_TABLE,
      modelName: 'Curso',
      timestamps: false,
    };
  }
}

module.exports = { CURSO_TABLE, CursoSchema, Curso };
