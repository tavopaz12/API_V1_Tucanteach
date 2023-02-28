const Joi = require('joi');

const id = Joi.number().integer();
const image = Joi.string();
const title = Joi.string();
const objective = Joi.string();
const cursoId = Joi.number().integer();

const createSesionSchema = Joi.object({
  title: title.required(),
  image: image.required(),
  objective: objective.required(),
  cursoId: cursoId.required(),
});

const updateSesionSchema = Joi.object({
  title,
  image,
  objective,
  cursoId,
});

const getSesionSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSesionSchema, updateSesionSchema, getSesionSchema };
