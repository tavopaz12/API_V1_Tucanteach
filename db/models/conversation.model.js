const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const CONVERSATION_TABLE = 'conversations';

const ConversationSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  members: {
    allowNull: false,
    type: DataTypes.ARRAY(Sequelize.STRING),
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

class Conversation extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', onDelete: 'CASCADE' });
  
    this.hasMany(models.Message, {
      as: 'messages',
      foreignKey: 'conversationId',
      onDelete: 'CASCADE',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONVERSATION_TABLE,
      modelName: 'Conversation',
      timestamps: false,
    };
  }
}

module.exports = { CONVERSATION_TABLE, ConversationSchema, Conversation };
