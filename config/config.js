require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'postgres',
    logging: true,
    migrationStorageTableName: 'sequelize_meta',
  },
  production: {
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'postgres',
    logging: true,
    migrationStorageTableName: 'sequelize_meta',
  },
};
