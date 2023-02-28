const Joi = require('joi');

const id = Joi.number().integer();
const members = Joi.string();
const userId = Joi.string();

const createConversationSchema = Joi.object({
  members: members.required(),
  userId: userId.required(),
});

const updateConversationSchema = Joi.object({
  members,
  userId,
});

const getConversationSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createConversationSchema,
  updateConversationSchema,
  getConversationSchema,
};
