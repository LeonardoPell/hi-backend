'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('hi_usuarios', 'nivel_obreiro', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'hi_nivel_obreiro', key: 'id' },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('hi_usuarios', 'nivel_obreiro');
  },
};
