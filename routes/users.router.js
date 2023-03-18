const express = require('express');

const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const { Sequelize } = require('sequelize');

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
      const avatar = getUrl(req) || body.avatar;
      const user = await service.update(id, { ...body, avatar });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/friends/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);

    const followings = user.dataValues.followings;
    const followers = user.dataValues.followers;

    console.log(followers);

    const friends = await Promise.all(
      followings.map((friendId) => {
        return service.findOne(friendId);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { id, userName, avatar } = friend;
      friendList.push({ id, userName, avatar });
    });

    console.log(friendList);

    res.json(friendList);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/unfollow', async (req, res) => {
  if (req.body.id !== req.params.id) {
    try {
      const user = await service.findOne(req.params.id);

      if (user.dataValues.followings.includes(req.body.id)) {
        await service.update(req.params.id, {
          followings: Sequelize.fn(
            'array_remove',
            Sequelize.col('followings'),
            req.body.id
          ),
        });

        await service.update(req.body.id, {
          followers: Sequelize.fn(
            'array_remove',
            Sequelize.col('followers'),
            req.params.id
          ),
        });

        res.json('El usuario se ha dejado de seguir');
      } else {
        res.status(403).json('No sigues a este usuario');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('No puedes dejar de seguirte');
  }
});

router.patch('/:id/follow', async (req, res, next) => {
  if (req.body.id !== req.params.id) {
    try {
      const user = await service.findOne(req.params.id);
      if (!user.dataValues.followings.includes(req.body.id)) {
        await service.update(req.params.id, {
          followings: Sequelize.fn(
            'array_append',
            Sequelize.col('followings'),
            req.body.id
          ),
        });

        await service.update(req.body.id, {
          followers: Sequelize.fn(
            'array_append',
            Sequelize.col('followers'),
            req.params.id
          ),
        });
        res.json('Usuario seguido');
      } else {
        res.status(403).json('Tu ya sigues a este usuario');
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).json('No puedes seguirte a ti mismo');
  }
});

router.patch('/:id/interest', async (req, res, next) => {
  try {
    const user = await service.findOne(req.params.id);

    if (!user.interest.includes(req.body.interest)) {
      await service.update(req.params.id, {
        interest: Sequelize.fn(
          'array_append',
          Sequelize.col('interest'),
          req.body.interest
        ),
      });
      res.status(200).json('Interest Agregado');
    } else {
      await service.update(req.params.id, {
        interest: Sequelize.fn(
          'array_remove',
          Sequelize.col('interest'),
          req.body.interest
        ),
      });
      res.status(200).json('Interes quitado');
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/materias', async (req, res, next) => {
  try {
    const user = await service.findOne(req.params.id);

    if (!user.materiasFavoritas.includes(req.body.materia)) {
      await service.update(req.params.id, {
        materiasFavoritas: Sequelize.fn(
          'array_append',
          Sequelize.col('materiasFavoritas'),
          req.body.materia
        ),
      });
      res.status(200).json('Nueva materia agregada');
    } else {
      await service.update(req.params.id, {
        materiasFavoritas: Sequelize.fn(
          'array_remove',
          Sequelize.col('materiasFavoritas'),
          req.body.materia
        ),
      });
      res.status(200).json('Materia quitada');
    }
  } catch (error) {
    next(error);
  }
});

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
