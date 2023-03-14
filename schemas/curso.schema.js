const Joi = require('joi');
const { config } = require('./../config/config');

const id = Joi.number().integer();
const image = Joi.string();
const title = Joi.string();
const description = Joi.string();
const color = Joi.string();

const setImgUrl = (filename) => {
  const { host, port } = config;
  const imgUrl = `${host}:${port}/public/${filename}`;
  return imgUrl;
};

const createCursoSchema = Joi.object({
  title: title.required(),
  image: image.required(),
  description: description.required(),
  color: color.required(),
});

const updateCursoSchema = Joi.object({
  title,
  image,
  description,
  color,
});

const getCursoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  setImgUrl,
  createCursoSchema,
  updateCursoSchema,
  getCursoSchema,
};
