const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class SesionService {
  constructor() {}
  async create(data) {
    const newSesion = await models.Sesion.create(data);
    return newSesion;
  }

  async find() {
    const sesions = await models.Sesion.findAll();
    return sesions;
  }

  async findOne(id) {
    const sesion = await models.Sesion.findByPk(id);
    return sesion;
  }

  async update(id, changes) {
    const sesion = await this.findOne(id);
    const rta = await sesion.update(changes);
    return rta;
  }

  async delete(id) {
    const sesion = await this.findOne(id);
    await sesion.destroy();
    return { id };
  }
}

module.exports = SesionService;
