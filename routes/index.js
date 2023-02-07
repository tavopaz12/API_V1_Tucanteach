const express = require('express');

const usersRouter = require('./users.router');
const tasksRouter = require('./tasks.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const cursoRouter = require('./curso.router');
const sesionRouter = require('./sesion.router');
const actividadRouter = require('./actividad.router');
const temaRouter = require('./tema.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/tasks', tasksRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
  router.use('/cursos', cursoRouter);
  router.use('/sesiones', sesionRouter);
  router.use('/actividades', actividadRouter);
  router.use('/temas', temaRouter);
}

module.exports = routerApi;
