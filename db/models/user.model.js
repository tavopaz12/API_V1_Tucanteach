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
    unique: true,
  },

  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'online',
  },
  about: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue:
      '¡Hola! Soy [tu nombre], [tu edad] años. En mi tiempo libre, me gusta [tus hobbies o actividades favoritas], lo que me ayuda a desconectar y relajarme. Me considero una persona [cualidades positivas que te describen], y creo que [tus valores personales].',
  },
  tokens: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  interest: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [
      'Leer',
      'Escuchar música',
      'Jugar fútbol',
      'Jugar videojuegos',
    ],
  },
  materiasFavoritas: {
    allowNull: false,
    type: DataTypes.STRING,
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ['Español', 'Matemáticas', 'Geografía'],
  },

  followers: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  followings: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
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

  avatar: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'https://tavopaz12.ml/public/avatar-default.png',
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
  static associate(models) {
    this.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    this.hasMany(models.Conversation, {
      as: 'conversations',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }

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
