const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class MessageService {
  constructor() {}
  async create(data) {
    const newMessage = await models.Message.create(data);
    return newMessage;
  }

  async find() {
    const messages = await models.Message.findAll({
      include: ['conversation'],
    });

    return messages;
  }

  async findOne(id) {
    const message = await models.Message.findByPk(id);

    if (!message) {
      throw boom.notFound('Mensaje no encontrado');
    }

    return message;
  }

  async update(id, changes) {
    const message = await this.findOne(id);

    if (!message) {
      throw boom.notFound('Mensaje no encontrado');
    }

    const rta = await message.update(changes);
    return rta;
  }

  async delete(id) {
    const message = await this.findOne(id);

    if (!message) {
      throw boom.notFound('Mensaje no encontrado');
    }

    await message.destroy();
    return { id };
  }
}

module.exports = MessageService;
