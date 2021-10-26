'use strict';

const { users } = require('../models');
const express = require('express');
const router = express.Router();


router.post('/signup', async (req, res) => {
  try {
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log(req.body, '-------------------')
    const record = await users.create({
      username: req.body.username,
      password: req.body.password
    });
    res.status(201).json(record);
  } catch (e) { res.status(403).send("Error Creating User"); }
});

router.post('/signin', require('../middleware/auth.js'), (req, res) => {

  res.status(200).send('logged in');

});

module.exports = router;