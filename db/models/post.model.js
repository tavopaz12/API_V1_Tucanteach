const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const POST_TABLE = 'posts';

const PostSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  img: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  likes: {
    allowNull: false,
    type: DataTypes.ARRAY(Sequelize.STRING),
    defaultValue: [],
  },
  comments: {
    allowNull: true,
    type: DataTypes.ARRAY(Sequelize.JSONB),
    defaultValue: [],
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Post extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', onDelete: 'CASCADE' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: 'Post',
      timestamps: false,
    };
  }
}

module.exports = { POST_TABLE, PostSchema, Post };
