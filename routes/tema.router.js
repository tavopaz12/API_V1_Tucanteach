const express = require('express');

const TemaService = require('../services/tema.service');
const validatorHandler = require('../middlewares/validator.handler');
const upload = require('./../libs/storage');

const {
  createTemaSchema,
  updateTemaSchema,
  getTemaSchema,
} = require('../schemas/tema.schema');

const router = express.Router();
const service = new TemaService();

router.get('/', async (req, res, next) => {
  try {
    const temas = await service.find();
    res.json(temas);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getTemaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const tema = await service.findOne(id);
      res.json(tema);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createTemaSchema), async (req, res, next) => {
  try {
    const body = req.body;
    const newTema = await service.create(body);
    res.status(201).json(newTema);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getTemaSchema, 'params'),
  validatorHandler(updateTemaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const tema = await service.update(id, body);
      res.json(tema);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getTemaSchema, 'params'),
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
