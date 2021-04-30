'use strict';
const dbData = require('../seed_data.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Slots', dbData.data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Slots', null, {});
  },
};
