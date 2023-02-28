const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class TaskService {
  constructor() {}
  async create(data) {
    const newTask = await models.Task.create(data);
    return newTask;
  }
}

module.exports = TaskService;
