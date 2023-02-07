const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class TemaService {
  constructor() {}
  async create(data) {
    const newTema = await models.Tema.create(data);
    return newTema;
  }

  async find() {
    const temas = await models.Tema.findAll();
    return temas;
  }

  async findOne(id) {
    const tema = await models.Tema.findByPk(id);
    return tema;
  }

  async update(id, changes) {
    const tema = await this.findOne(id);
    const rta = await tema.update(changes);
    return rta;
  }

  async delete(id) {
    const tema = await this.findOne(id);
    await tema.destroy();
    return { id };
  }
}

module.exports = TemaService;
