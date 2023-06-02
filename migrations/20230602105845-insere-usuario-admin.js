'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('hi_usuarios', [
      {
        id: 1,
        nome: 'Usuario Admin',
        email: 'admin-hiram1414@gmail.com',
        cim: '123456',
        codigo_obreiro: 'ADM-123',
        telefone: '31333333333',
        cpf: '11111111111',
        rg: '1111111111',
        senha: '$2b$10$fQWcwf7lOGnLu10tXGJRdeBtoV5NCDH/9Cr2v7LAw4s/FuxrOVfPi',
        nascimento: '1990-01-01',
        iniciacao: '1990-01-01',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
  }
};
