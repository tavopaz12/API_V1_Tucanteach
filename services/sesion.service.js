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
    const sesion = await models.Sesion.findByPk(id, {
      include: ['actividades'],
    });

    if (!sesion) {
      throw boom.notFound('Sesión no encontrada');
    }

    return sesion;
  }

  async update(id, changes) {
    const sesion = await this.findOne(id);

    if (!sesion) {
      throw boom.notFound('Sesión no encontrada');
    }

    const rta = await sesion.update(changes);
    return rta;
  }

  async delete(id) {
    const sesion = await this.findOne(id);

    if (!sesion) {
      throw boom.notFound('Sesión no encontrada');
    }

    const actividades = await sesion.getActividades();

    for (let actividad of actividades) {
      const temas = await actividad.getTemas();

      for (let tema of temas) {
        await tema.destroy();
      }

      await actividad.destroy();
    }

    await sesion.destroy();

    return { id };
  }
}

module.exports = SesionService;
