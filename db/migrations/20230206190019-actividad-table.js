'use strict';

const { ActividadSchema, ACTIVIDAD_TABLE } = require('./../models/actividad.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ACTIVIDAD_TABLE, ActividadSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ACTIVIDAD_TABLE);
  },
};
