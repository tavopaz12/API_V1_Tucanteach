'use strict';

const { TemaSchema, TEMA_TABLE } = require('../models/tema.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(TEMA_TABLE, TemaSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(TEMA_TABLE);
  },
};
