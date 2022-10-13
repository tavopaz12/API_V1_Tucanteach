const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().min(3).max(100);

const createTaskSchema = Joi.object({
  title: title.required()
});

const updateTaskSchema = Joi.object({
  title: title.required(),
});

const getTaskSchema = Joi.object({
  id: id.required(),
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema }
