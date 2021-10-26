'use strict';

const app = require('./src/server.js');
const port = process.env.PORT || 3000;
const { db } = require('./src/models');

db.sync().then(() => {
  app.start(port);
}).catch(e => {
  console.error('Could not start server', e.message);
});