'use strict';

const { SesionSchema, SESION_TABLE } = require('../models/sesion.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(SESION_TABLE, SesionSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(SESION_TABLE);
  },
};
