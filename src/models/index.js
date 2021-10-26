'use strict';

require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./auth.js');

let DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, options);

const UserTable = UserModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: UserTable,
};