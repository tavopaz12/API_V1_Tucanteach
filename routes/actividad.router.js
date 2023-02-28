const express = require('express');

const ActividadService = require('../services/actividad.service');
const validatorHandler = require('../middlewares/validator.handler');
const upload = require('./../libs/storage');
const { config } = require('./../config/config');

const {
  createActividadSchema,
  updateActividadSchema,
  getActividadSchema,
} = require('../schemas/actividad.schema');

const router = express.Router();
const service = new ActividadService();

router.get('/', async (req, res, next) => {
  try {
    const actividades = await service.find();
    res.json(actividades);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getActividadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const actividad = await service.findOne(id);
      res.json(actividad);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const body = req.body;
    const image = getUrl(req);

    const newActividad = await service.create({ ...body, image });
    res.status(201).json(newActividad);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getActividadSchema, 'params'),
  validatorHandler(updateActividadSchema, 'body'),
  upload.single('image'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const image = getUrl(req);

      const actividad = await service.update(id, { ...body, image });
      res.json(actividad);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getActividadSchema, 'params'),
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

    return `${config.hostProd}/public/${filename}`;
  }
};

module.exports = router;
