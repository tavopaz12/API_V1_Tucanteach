const { Model, DataTypes, Sequelize } = require('sequelize');

const { CONVERSATION_TABLE } = require('./conversation.model');

const MESSAGE_TABLE = 'messages';

const MessageSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  sender: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  text: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  img: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  conversationId: {
    field: 'conversation_id',
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: '',
    references: {
      model: CONVERSATION_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Message extends Model {
  static associate(models) {
    this.belongsTo(models.Conversation, {
      as: 'conversation',
      onDelete: 'CASCADE',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MESSAGE_TABLE,
      modelName: 'Message',
      timestamps: false,
    };
  }
}

module.exports = { MESSAGE_TABLE, MessageSchema, Message };
