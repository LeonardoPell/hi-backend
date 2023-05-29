'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hi_usuarios', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      cim: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      codigo_obreiro: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      rg: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      iniciacao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      criado_em: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      atualizado_em: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hi_usuarios');
  },
};
