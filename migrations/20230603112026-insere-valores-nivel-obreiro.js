'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('hi_nivel_obreiro', [
      {
        id: 1,
        descricao: 'Veneravel Mestre',
      },
      {
        id: 2,
        descricao: '1º Vigilante',
      },
      {
        id: 3,
        descricao: '2º Vigilante',
      },
      {
        id: 4,
        descricao: 'Orador',
      },
      {
        id: 5,
        descricao: 'Secretario',
      },
      {
        id: 6,
        descricao: 'Tesoureiro',
      },
      {
        id: 7,
        descricao: 'Chanceler',
      },
      {
        id: 8,
        descricao: 'Mestre de Cerimonias',
      },
      {
        id: 9,
        descricao: 'Dep. Estadual',
      },
      {
        id: 10,
        descricao: 'Dep. Federal',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
