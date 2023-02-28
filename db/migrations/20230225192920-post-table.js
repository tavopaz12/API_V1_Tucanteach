'use strict';

const { PostSchema, POST_TABLE } = require('./../models/post.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(POST_TABLE, PostSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(POST_TABLE);
  },
};
