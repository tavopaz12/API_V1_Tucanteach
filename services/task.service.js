const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class TaskService {
  constructor() {}
  async create(data) {
    const newTask = await models.Task.create(data);
    return newTask;
  }

  async find() {
    const tasks = await models.Task.findAll();
    return tasks;
  }

  async findByUser(userId) {
    const tasks = await models.Task.findByPk(userId);

    if (!tasks) {
      throw boom.notFound('Tarea no encontrada');
    }

    return tasks;
  }

  async findOne(id) {
    const task = await models.Task.findByPk(id);

    if (!task) {
      throw boom.notFound('Tarea no encontrada');
    }

    return task;
  }

  async update(id, changes) {
    const task = await this.findOne(id);

    if (!task) {
      throw boom.notFound('Tarea no encontrada');
    }

    const rta = await task.update(changes);
    return rta;
  }

  async delete(id) {
    const task = await this.findOne(id);

    if (!task) {
      throw boom.notFound('Tarea no encontrada');
    }
    
    await task.destroy();
    return { id };
  }
}

module.exports = TaskService;
