const express = require('express');

const PostService = require('../services/post.service');
const validatorHandler = require('../middlewares/validator.handler');
const { Sequelize } = require('sequelize');

const upload = require('./../libs/storage');
const { config } = require('./../config/config');

const {
  getPostSchema,
} = require('../schemas/post.schema');

const router = express.Router();
const service = new PostService();

router.get('/', async (req, res, next) => {
  try {
    const posts = await service.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getPostSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await service.findOne(id);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', upload.array('img'), async (req, res, next) => {
  try {
    const body = req.body;
    const urls = req.files.map((file) => getUrl(req, file));
    const img = urls.join(', ');

    const newPost = await service.create({ ...body, img });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:id',
  validatorHandler(getPostSchema, 'params'),
  upload.array('img'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const urls = req.files.map((file) => getUrl(req, file));
      const img = urls.join(', ');

      const post = await service.update(id, { ...body, img });
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id/like', async (req, res, next) => {
  try {
    const post = await service.findOne(req.params.id);

    if (!post.likes.includes(req.body.id)) {
      await service.update(req.params.id, {
        likes: Sequelize.fn(
          'array_append',
          Sequelize.col('likes'),
          req.body.id
        ),
      });
      res.status(200).json('Like agregado');
    } else {
      await service.update(req.params.id, {
        likes: Sequelize.fn(
          'array_remove',
          Sequelize.col('likes'),
          req.body.id
        ),
      });
      res.status(200).json('Like quitado');
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/comment', async (req, res, next) => {
  try {
    const obj = {
      id: req.body.id,
      text: req.body.text,
      userName: req.body.userName,
      date: req.body.date,
    };

    const jsonString = JSON.stringify(obj);

    if (!req.body.text && !req.body.text) {
      res.status(403).json('El comentario no puede estar vacio');
    } else {
      await service.update(req.params.id, {
        comments: Sequelize.fn(
          'array_append',
          Sequelize.col('comments'),
          jsonString
        ),
      });
      res.status(200).json('Comentario agregado');
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/comment/remove', async (req, res, next) => {
  try {
    const post = await service.findOne(req.params.id);

    if (!req.body.id && !req.body.id) {
      res.status(403).json('El comentario no puede estar vacio');
    } else {
      const commentIndex = post.comments.findIndex(
        (comment) => comment.id === req.body.id
      );

      if (commentIndex !== -1) {
        post.comments.splice(commentIndex, 1);

        await service.update(req.params.id, {
          comments: post.comments,
        });

        res.status(200).json('Comentario removido');
      } else {
        res.status(404).json('Comentario no encontrado');
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  validatorHandler(getPostSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json(`Publicacion ${id} eliminada`);
    } catch (error) {
      next(error);
    }
  }
);

const getUrl = (req, files) => {
  const baseUrl = `${config.hostProd}:`;

  console.log(files);

  if (Array.isArray(files)) {
    return files.map((file) => {
      const filePath = `/public/${file.filename}`;
      return baseUrl + filePath;
    });
  } else if (files) {
    const filePath = `/public/${files.filename}`;
    return [baseUrl + filePath];
  } else {
    return [];
  }
};

module.exports = router;
