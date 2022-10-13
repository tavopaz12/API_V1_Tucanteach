const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string();
const edad = Joi.number().integer();
const escuela = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  edad: edad.required(),
  escuela: escuela.required(),
  email: email.required(),
  password: password.required()
});

const updateUserSchema = Joi.object({
  name: name,
  lastname: lastName,
  edad: edad,
  escuela: escuela,
  email: email,
  password: password
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
