const express = require('express');

const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

const upload = require('./../libs/storageAvatar');
const { config } = require('./../config/config');

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const body = req.body;
    const image = getUrl(req);

    const newUser = await service.create({ ...body, image });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  upload.single('image'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const image = getUrl(req);
      const user = await service.update(id, { ...body, image });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
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
