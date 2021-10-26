'use strict';

const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./routes/auth'));

module.exports = {
  app,
  start: function(port) { app.listen(port, ()=>console.log('The Server is running')); },
};