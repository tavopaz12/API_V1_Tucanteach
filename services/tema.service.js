const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class TemaService {
  constructor() {}
  async create(data) {
    const newTema = await models.Tema.create(data);
    return newTema;
  }

  async find() {
    const temas = await models.Tema.findAll({
      include: ['actividades'],
    });
    return temas;
  }

  async findOne(id) {
    const tema = await models.Tema.findByPk(id);

    if (!tema) {
      throw boom.notFound('Tema no encontrado');
    }

    return tema;
  }

  async update(id, changes) {
    const tema = await this.findOne(id);

    if (!tema) {
      throw boom.notFound('Tema no encontrado');
    }

    const rta = await tema.update(changes);
    return rta;
  }

  async delete(id) {
    const tema = await this.findOne(id);

    if (!tema) {
      throw boom.notFound('Tema no encontrado');
    }

    await tema.destroy();
    return { id };
  }
}

module.exports = TemaService;
