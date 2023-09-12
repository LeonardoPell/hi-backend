'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hi_ata_reuniao', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reuniao: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'hi_reunioes', key: 'id' },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hi_ata_reuniao');
  },
};
