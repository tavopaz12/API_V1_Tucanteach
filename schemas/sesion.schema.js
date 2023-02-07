const Joi = require('joi');

const id = Joi.number().integer();
const image = Joi.string();
const title = Joi.string();
const objective = Joi.string();

const createSesionSchema = Joi.object({
  title: title.required(),
  image: image.required(),
  objective: objective.required(),
});

const updateSesionSchema = Joi.object({
  title,
  image,
  objective,
});

const getSesionSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSesionSchema, updateSesionSchema, getSesionSchema };
