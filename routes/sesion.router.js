const express = require('express');

const SesionService = require('../services/sesion.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  createSesionSchema,
  updateSesionSchema,
  getSesionSchema,
} = require('../schemas/sesion.schema');

const router = express.Router();
const service = new SesionService();

const upload = require('./../libs/storage');
const { config } = require('./../config/config');

router.get('/', async (req, res, next) => {
  try {
    const sesions = await service.find();
    res.json(sesions);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getSesionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const sesion = await service.findOne(id);
      res.json(sesion);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const body = req.body;
    const image = getUrl(req);

    const newSesion = await service.create({ ...body, image });
    res.status(201).json(newSesion);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getSesionSchema, 'params'),
  validatorHandler(updateSesionSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const image = getUrl(req);

      const sesion = await service.update(id, { ...body, image });
      res.json(sesion);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getSesionSchema, 'params'),
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

const getUrl = (req) => {
  if (req.file) {
    const img = req.file;
    const filename = img.filename;

    return `${config.host}:${config.port}/public/${filename}`;
  }
};

module.exports = router;
