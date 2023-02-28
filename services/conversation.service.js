const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ConversationService {
  constructor() {}

  async findOne(id) {
    const conversation = await models.Conversation.findByPk(id, {
      include: ['messages'],
    });

    if (!conversation) {
      throw boom.notFound('Conversacion no encontrada');
    }

    return conversation;
  }

  async create(data) {
    const newConversation = await models.Conversation.create(data);
    return newConversation;
  }

  async findConversation(id) {
    const conversation = await models.Conversation.findAll({
      include: ['messages'],
      where: {
        members: {
          [Op.contains]: [id],
        },
      },
    });

    if (!conversation) {
      throw boom.notFound('Conversacion no encontrada');
    }

    return conversation;
  }

  async findConversationIncludesTwoUser(firstId, secondId) {
    const conversation = await models.Conversation.findAll({
      include: ['messages'],
      where: {
        [Op.and]: [
          { members: { [Op.contains]: [firstId] } },
          { members: { [Op.contains]: [secondId] } },
        ],
      },
    });

    if (!conversation) {
      throw boom.notFound('Conversacion no encontrada');
    }

    return conversation;
  }

  async delete(id) {
    const conversation = await this.findOne(id);

    if (!conversation) {
      throw boom.notFound('Conversacion no encontrada');
    }

    const messages = await conversation.getMessages();

    for (let message of messages) {
      await message.destroy();
    }

    await conversation.destroy();
    return { id };
  }
}

module.exports = ConversationService;
