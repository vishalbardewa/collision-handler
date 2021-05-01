'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
      },
      start_time: {
        type: Sequelize.TIME
      },
      end_time: {
        type: Sequelize.TIME
      },
      weekdays: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Slots');
  }
};