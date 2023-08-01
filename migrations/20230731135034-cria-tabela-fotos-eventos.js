'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hi_fotos_pasta', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      descricao_foto: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      url_arquivo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pasta: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'hi_pasta_fotos', key: 'id' },
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hi_fotos_pasta');
  },
};
