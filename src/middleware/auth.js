'use strict';

const { users } = require('../models');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

module.exports = async function (req, res, next) {
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  console.log(username, password)
  try {
    const user = await users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      next();
    }
    else {
      next('Invalid User');
    }
  } catch(err) {next('Invalid Login');}
};