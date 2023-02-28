'use strict';

const { MessageSchema, MESSAGE_TABLE } = require('./../models/message.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(MESSAGE_TABLE, MessageSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(MESSAGE_TABLE);
  },
};
