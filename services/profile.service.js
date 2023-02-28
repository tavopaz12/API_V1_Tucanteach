const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class ProfileService {
  constructor() {}
  async findOne(userName) {
    const user = await models.User.findOne({
      where: { userName },
    });

    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }

    return user;
  }
}

module.exports = ProfileService;
