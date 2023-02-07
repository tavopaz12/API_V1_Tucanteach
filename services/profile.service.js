const { models } = require('./../libs/sequelize');

class ProfileService {
  constructor() {}
  async findOne(userName) {
    const user = await models.User.findOne({
      where: { userName },
    });
    return user;
  }
}

module.exports = ProfileService;

