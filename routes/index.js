const express = require('express');

const usersRouter = require('./users.router');
const tasksRouter = require('./tasks.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/tasks', tasksRouter);
}

module.exports = routerApi;
