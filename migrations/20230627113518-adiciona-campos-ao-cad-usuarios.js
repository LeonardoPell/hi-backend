'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('hi_usuarios', 'elevacao', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'exaltacao', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'ime', {
        type: Sequelize.STRING(150),
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'grau', {
        type: Sequelize.STRING(150),
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'endereco_comercial', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'telefone_comercial', {
        type: Sequelize.STRING(50),
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'endereco_residencial', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'telefone_residencial', {
        type: Sequelize.STRING(50),
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'nome_pai', {
        type: Sequelize.STRING(150),
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'nome_mae', {
        type: Sequelize.STRING(150),
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'nome_esposa', {
        type: Sequelize.STRING(150),
        allowNull: true,
      }),
      queryInterface.addColumn('hi_usuarios', 'filhos', {
        type: Sequelize.ARRAY(Sequelize.STRING(150)),
        allowNull: true,
      }),
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
