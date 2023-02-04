const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'student',
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  userName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'user_name',
  },

  nivelSchool: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nivel_school',
  },
  nameSchool: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'name_school',
  },
  gradeSchool: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'grade_school',
  },
  ubicacionSchool: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'ubicacion_school',
  },

  cellPhone: {
    allowNull: false,
    type: DataTypes.BIGINT,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
