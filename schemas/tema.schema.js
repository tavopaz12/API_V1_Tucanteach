const Joi = require('joi');

const id = Joi.number().integer();
const type = Joi.string();
const title = Joi.string();
const content = Joi.string();
const actividadId = Joi.string();

const createTemaSchema = Joi.object({
  title: title.required(),
  type: type.required(),
  content: content.required(),
  actividadId: actividadId.required(),
});

const updateTemaSchema = Joi.object({
  title,
  type,
  content,
  actividadId,
});

const getTemaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createTemaSchema, updateTemaSchema, getTemaSchema };
