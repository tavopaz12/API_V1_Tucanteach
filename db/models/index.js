const { User, UserSchema } = require('./user.model');
const { Task, TaskSchema } = require('./task.model');
const { Curso, CursoSchema } = require('./curso.model');
const { Sesion, SesionSchema } = require('./sesion.model');
const { Actividad, ActividadSchema } = require('./actividad.model');
const { Tema, TemaSchema } = require('./tema.model');
const { Conversation, ConversationSchema } = require('./conversation.model');
const { Post, PostSchema } = require('./post.model');
const { Message, MessageSchema } = require('./message.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
  Curso.init(CursoSchema, Curso.config(sequelize));
  Sesion.init(SesionSchema, Sesion.config(sequelize));
  Actividad.init(ActividadSchema, Actividad.config(sequelize));
  Tema.init(TemaSchema, Tema.config(sequelize));
  Conversation.init(ConversationSchema, Conversation.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  Message.init(MessageSchema, Message.config(sequelize));

  User.associate(sequelize.models);
  Post.associate(sequelize.models);
  Conversation.associate(sequelize.models);
  Message.associate(sequelize.models);

  Curso.associate(sequelize.models);
  Sesion.associate(sequelize.models);
  Actividad.associate(sequelize.models);
  Tema.associate(sequelize.models);
}

module.exports = setupModels;
