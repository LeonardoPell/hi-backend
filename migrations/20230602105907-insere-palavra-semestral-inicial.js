'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('hi_palavra_semestral', [
      {
        id: 1,
        palavra: 'esperança',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
