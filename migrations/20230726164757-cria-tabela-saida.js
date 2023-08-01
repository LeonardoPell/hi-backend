'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hi_financeiro_saida', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data_pagamento: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ano_mes_pagamento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hi_financeiro_saida');
  },
};
