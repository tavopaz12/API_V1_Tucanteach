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
    return tasks;
  }

  async findOne(id) {
    const task = await models.Task.findByPk(id);
    return task;
  }

  async update(id, changes) {
    const task = await this.findOne(id);
    const rta = await task.update(changes);
    return rta;
  }

  async delete(id) {
    const task = await this.findOne(id);
    await task.destroy();
    return { id };
  }
}

module.exports = TaskService;
