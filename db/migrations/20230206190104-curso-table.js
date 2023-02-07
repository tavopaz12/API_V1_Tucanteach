'use strict';

const { CursoSchema, CURSO_TABLE } = require('./../models/curso.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CURSO_TABLE, CursoSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CURSO_TABLE);
  },
};
