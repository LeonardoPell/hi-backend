'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hi_presenca_reuniao', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id_reuniao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hi_reunioes',
          key: 'id',
        },
      },
      usuarios_presentes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
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
    await queryInterface.dropTable('hi_presenca_reuniao');
  },
};
