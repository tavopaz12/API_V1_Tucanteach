const express = require('express');

const MessageService = require('../services/message.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  createMessageSchema,
  updateMessageSchema,
  getMessageSchema,
} = require('../schemas/message.schema');

const router = express.Router();
const service = new MessageService();

router.get('/', async (req, res, next) => {
  try {
    const messages = await service.find();
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getMessageSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await service.findOne(id);
      res.json(message);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newMessage = await service.create(body);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getMessageSchema, 'params'),
  validatorHandler(updateMessageSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const message = await service.update(id, body);
      res.json(message);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getMessageSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
