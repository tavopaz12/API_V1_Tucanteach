const Joi = require('joi');

const id = Joi.string();

const name = Joi.string();
const lastName = Joi.string();
const userName = Joi.string();

const status = Joi.string();
const about = Joi.string();
const tokens = Joi.number();
const interest = Joi.string();
const materiasFavoritas = Joi.string();

const nivelSchool = Joi.string();
const nameSchool = Joi.string();
const gradeSchool = Joi.string();
const ubicacionSchool = Joi.string();

const avatar = Joi.string();

const cellPhone = Joi.string();
const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'mx'] },
  })
  .messages({ 'string.email': 'Ingresa un email valido' });
const password = Joi.string().min(8).messages({
  'string.min': `La contraseña debe de tener {#limit} caracteres como minimo`,
});

const createUserSchema = Joi.object({
  id: id.required().messages({ 'any.required': 'El id es requerido' }),

  name: name.required().messages({ 'any.required': 'El nombre es requerido' }),
  lastName: lastName
    .required()
    .messages({ 'any.required': 'El apellido es requerido' }),
  userName: userName.required(),

  status,
  about,
  tokens,
  interest,
  materiasFavoritas,
  avatar,

  nivelSchool: nivelSchool
    .required()
    .messages({ 'any.required': 'El tipo de educacion es requerido' }),
  nameSchool: nameSchool
    .required()
    .messages({ 'any.required': 'El nombre de la escuela es requerido' }),
  gradeSchool: gradeSchool
    .required()
    .messages({ 'any.required': 'El grado escolar es requerido' }),
  ubicacionSchool: ubicacionSchool
    .required()
    .messages({ 'any.required': 'La ubicacion es requerida' }),

  cellPhone: cellPhone
    .required()
    .messages({ 'any.required': 'El telefono es requerido' }),
  email: email
    .required()
    .messages({ 'any.required': 'El correo es requerido' }),
  password: password
    .required()
    .messages({ 'any.required': 'La contraseña es requerida' }),
});

const updateUserSchema = Joi.object({
  id,

  userName,
  name,
  lastName,

  status,
  about,
  tokens,
  interest,
  materiasFavoritas,

  nivelSchool,
  nameSchool,
  gradeSchool,
  ubicacionSchool,

  cellPhone,
  email,

  avatar,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
