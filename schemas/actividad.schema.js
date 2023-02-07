const Joi = require('joi');

const id = Joi.number().integer();
const image = Joi.string();
const title = Joi.string();
const objective = Joi.string();

const createActividadSchema = Joi.object({
  title: title.required(),
  image: image.required(),
  objective: objective.required(),
});

const updateActividadSchema = Joi.object({
  title,
  image,
  objective,
});

const getActividadSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createActividadSchema,
  updateActividadSchema,
  getActividadSchema,
};
