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

const uploadAvatar = require('./../libs/storageAvatar');

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

router.post('/', uploadAvatar.single('avatar'), async (req, res, next) => {
  try {
    const body = req.body;
    const avatar = getUrl(req);

    const newUser = await service.create({ ...body, avatar });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  uploadAvatar.single('avatar'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const avatar = getUrl(req);
      const user = await service.update(id, { ...body, avatar });
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

    return `${config.hostProd}/public/${filename}`;
  }
};

module.exports = router;
