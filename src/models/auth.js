'use strict';

const bcrypt = require('bcrypt');

const User = (sequelize, DataTypes) => sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      async beforeCreate(user) {
        let encryptedPassword = await bcrypt.hash(user.dataValues.password, 10);
        user.dataValues.password = encryptedPassword;
      }
    }
  }
);

module.exports = User;