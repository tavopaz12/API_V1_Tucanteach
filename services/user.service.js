const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findByEmail(email) {
    const users = await models.User.findOne({
      where: { email },
    });

    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['posts', 'conversations'],
    });

    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);

    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }

    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);

    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }

    const posts = await user.getPosts();
    const conversations = await user.getConversations();

    for (let post of posts) {
      await post.destroy();
    }

    for (let conversation of conversations) {
      const messages = await conversation.getMessages();

      for (let message of messages) {
        await message.destroy();
      }

      await conversation.destroy();
    }

    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
