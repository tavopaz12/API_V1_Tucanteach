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
    const actividad = await models.Actividad.findByPk(id);
    return actividad;
  }

  async update(id, changes) {
    const actividad = await this.findOne(id);
    const rta = await actividad.update(changes);
    return rta;
  }

  async delete(id) {
    const actividad = await this.findOne(id);
    await actividad.destroy();
    return { id };
  }
}

module.exports = ActividadService;
