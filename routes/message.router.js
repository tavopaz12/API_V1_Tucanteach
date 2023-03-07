const express = require('express');

const MessageService = require('../services/message.service');
const validatorHandler = require('../middlewares/validator.handler');
const { models } = require('./../libs/sequelize');

const upload = require('./../libs/storage');
const { config } = require('./../config/config');

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

router.get('/:conversationId', async (req, res, next) => {
  try {
    const message = await service.find({
      where: {
        conversationId: req.params.conversationId,
      },
      order: [['id', 'ASC']],
    });
    res.json(message);
  } catch (error) {
    next(error);
  }
});

router.post('/', upload.single('img'), async (req, res, next) => {
  try {
    const body = req.body;
    const img = getUrl(req);

    const newMessage = await service.create({ ...body, img });
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

router.delete('/delete-messages/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.deleteWithConversationId(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

const getUrl = (req) => {
  if (req.file) {
    const img = req.file;
    const filename = img.filename;

    return `${config.hostProd}/public/${filename}`;
  }
};

module.exports = router;
