const express = require('express');

const CursoService = require('../services/curso.service');
const validatorHandler = require('../middlewares/validator.handler');

const upload = require('./../libs/storage');
const { config } = require('./../config/config');

const {
  createCursoSchema,
  setImgUrl,
  updateCursoSchema,
  getCursoSchema,
} = require('../schemas/curso.schema');

const router = express.Router();
const service = new CursoService();

router.get('/', async (req, res, next) => {
  try {
    const cursos = await service.find();
    res.json(cursos);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCursoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const curso = await service.findOne(id);
      res.json(curso);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const body = req.body;
    const image = getUrl(req);

    const newCurso = await service.create({ ...body, image });
    res.status(201).json(newCurso);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getCursoSchema, 'params'),
  validatorHandler(updateCursoSchema, 'body'),
  upload.single('image'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const image = getUrl(req);

      const curso = await service.update(id, { ...body, image });
      res.json(curso);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCursoSchema, 'params'),
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
