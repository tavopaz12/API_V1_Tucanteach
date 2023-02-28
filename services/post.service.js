const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class PostService {
  constructor() {}
  async create(data) {
    const newPost = await models.Post.create(data);
    return newPost;
  }

  async find() {
    const posts = await models.Post.findAll({
      include: ['user'],
    });
    return posts;
  }

  async findOne(id) {
    const post = await models.Post.findByPk(id);

    if (!post) {
      throw boom.notFound('Publicacion no encontrada');
    }

    return post;
  }

  async update(id, changes) {
    const post = await this.findOne(id);

    if (!post) {
      throw boom.notFound('Publicacion no encontrada');
    }

    const rta = await post.update(changes);
    return rta;
  }

  async delete(id) {
    const post = await this.findOne(id);

    if (!post) {
      throw boom.notFound('Publicacion no encontrada');
    }

    await post.destroy();
    return { id };
  }
}

module.exports = PostService;
