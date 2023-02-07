const { User, UserSchema } = require('./user.model');
const { Task, TaskSchema } = require('./task.model');
const { Curso, CursoSchema } = require('./curso.model');
const { Sesion, SesionSchema } = require('./sesion.model');
const { Actividad, ActividadSchema } = require('./actividad.model');
const { Tema, TemaSchema } = require('./tema.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
  Curso.init(CursoSchema, Curso.config(sequelize));
  Sesion.init(SesionSchema, Sesion.config(sequelize));
  Actividad.init(ActividadSchema, Actividad.config(sequelize));
  Tema.init(TemaSchema, Tema.config(sequelize));
}

module.exports = setupModels;
