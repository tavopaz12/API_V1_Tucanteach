const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CursoService {
  constructor() {}
  async create(data) {
    const newCurso = await models.Curso.create(data);
    return newCurso;
  }

  async find() {
    const cursos = await models.Curso.findAll({
      include: [
        {
          association: 'sesiones',
          include: [
            {
              association: 'actividades',
              include: ['temas'],
            },
          ],
        },
      ],
    });
    return cursos;
  }

  async findOne(id) {
    const curso = await models.Curso.findByPk(id, {
      include: ['sesiones'],
    });

    if (!curso) {
      throw boom.notFound('Curso no encontrado');
    }

    return curso;
  }

  async update(id, changes) {
    const curso = await this.findOne(id);

    if (!curso) {
      throw boom.notFound('Curso no encontrado');
    }

    const rta = await curso.update(changes);
    return rta;
  }

  async delete(id) {
    const curso = await this.findOne(id);

    if (!curso) {
      throw boom.notFound('Curso no encontrado');
    }

    const sesiones = await curso.getSesiones();

    for (let sesion of sesiones) {
      const actividades = await sesion.getActividades();

      for (let actividad of actividades) {
        const temas = await actividad.getTemas();

        for (let tema of temas) {
          await tema.destroy();
        }

        await actividad.destroy();
      }

      await sesion.destroy();
    }

    await curso.destroy();
    return { id };
  }
}

module.exports = CursoService;
