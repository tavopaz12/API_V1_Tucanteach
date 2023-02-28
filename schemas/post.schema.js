const Joi = require('joi');

const id = Joi.string();
const description = Joi.string();
const img = Joi.string();
const likes = Joi.string();
const comments = Joi.string();
const userId = Joi.string();

const createPostSchema = Joi.object({
  id: id.required(),
  description: description.required(),
  comments: comments.required(),
  img: img.required(),
  likes: likes.required(),
  userId: userId.required(),
});

const updatePostSchema = Joi.object({
  description,
  comments,
  img,
  likes,
  userId,
});

const getPostSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPostSchema, updatePostSchema, getPostSchema };
