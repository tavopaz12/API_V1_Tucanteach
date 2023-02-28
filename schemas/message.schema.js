const Joi = require('joi');

const id = Joi.number().integer();
const sender = Joi.string();
const text = Joi.string();
const conversationId = Joi.string();

const createMessageSchema = Joi.object({
  sender: sender.required(),
  text: text.required(),
  conversationId: conversationId.required(),
});

const updateMessageSchema = Joi.object({
  sender,
  text,
  conversationId,
});

const getMessageSchema = Joi.object({
  id: id.required(),
});

module.exports = { createMessageSchema, updateMessageSchema, getMessageSchema };
