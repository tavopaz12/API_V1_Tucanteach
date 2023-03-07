const express = require('express');

const ConversationService = require('../services/conversation.service');
const validatorHandler = require('../middlewares/validator.handler');

const upload = require('./../libs/storage');

const { models } = require('../libs/sequelize');

const {
  updateConversationSchema,
  getConversationSchema,
} = require('../schemas/conversation.schema');

const router = express.Router();

const service = new ConversationService();

router.get(
  '/:id',
  validatorHandler(getConversationSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const conversation = await service.findConversation(id);

      res.json(conversation);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
  try {
    const { firstUserId } = req.params;
    const { secondUserId } = req.params;
    const conversation = await service.findConversationIncludesTwoUser(
      firstUserId,
      secondUserId
    );
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const saveConversation = await service.create({
      ...body,
      members: [req.body.senderId, req.body.receiverId],
    });
    res.json(saveConversation);
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:id',
  validatorHandler(getConversationSchema, 'params'),
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
