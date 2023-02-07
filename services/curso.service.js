const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CursoService {
  constructor() {}
  async create(data) {
    const newCurso = await models.Curso.create(data);
    return newCurso;
  }

  async find() {
    const cursos = await models.Curso.findAll();
    return cursos;
  }

  async findOne(id) {
    const curso = await models.Curso.findByPk(id);
    return curso;
  }

  async update(id, changes) {
    const curso = await this.findOne(id);
    const rta = await curso.update(changes);
    return rta;
  }

  async delete(id) {
    const curso = await this.findOne(id);
    await curso.destroy();
    return { id };
  }
}

module.exports = CursoService;
