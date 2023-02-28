const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ActividadService {
  constructor() {}
  async create(data) {
    const newActiidad = await models.Actividad.create(data);
    return newActiidad;
  }

  async find() {
    const actividades = await models.Actividad.findAll();
    return actividades;
  }

  async findOne(id) {
    const actividad = await models.Actividad.findByPk(id, {
      include: ['temas'],
    });

    if (!actividad) {
      throw boom.notFound('Actividad no encontrada');
    }

    return actividad;
  }

  async update(id, changes) {
    const actividad = await this.findOne(id);

    if (!actividad) {
      throw boom.notFound('Actividad no encontrada');
    }

    const rta = await actividad.update(changes);
    return rta;
  }

  async delete(id) {
    const actividad = await this.findOne(id);

    if (!actividad) {
      throw boom.notFound('Actividad no encontrada');
    }

    const temas = await actividad.getTemas();

    for (let tema of temas) {
      await tema.destroy();
    }

    await actividad.destroy();

    return { id };
  }
}

module.exports = ActividadService;
