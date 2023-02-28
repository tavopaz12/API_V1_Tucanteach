'use strict';

const { ConversationSchema, CONVERSATION_TABLE } = require('./../models/conversation.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CONVERSATION_TABLE, ConversationSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CONVERSATION_TABLE);
  },
};
