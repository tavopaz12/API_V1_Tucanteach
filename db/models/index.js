const { User, UserSchema } = require('./user.model');
const { Task, TaskSchema } = require('./task.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
}

module.exports = setupModels;
