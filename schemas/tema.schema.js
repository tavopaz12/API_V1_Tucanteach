const Joi = require('joi');

const id = Joi.number().integer();
const type = Joi.string();
const title = Joi.string();
const content = Joi.string();

const createTemaSchema = Joi.object({
  title: title.required(),
  type: type.required(),
  content: content.required(),
});

const updateTemaSchema = Joi.object({
  title,
  type,
  content,
});

const getTemaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createTemaSchema, updateTemaSchema, getTemaSchema };
