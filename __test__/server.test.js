'use strict';

const { describe, expect, test, beforeAll, afterAll, it } = require('@jest/globals');
const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);
const { db, users } =require('../src/models');

beforeAll( async () => {
  await db.sync();
})

afterAll( async () => {
  await db.drop();
})

describe('Testing my User Auth CRUD', () => {

  it('Should create a new user on POST /auth/signup', async () => {
    let param = { 
        username: 'Some User',
        password: 'blahblah'
    };

    let response = await request.post('/auth/signup').send(param);
    expect(response.text).toContain('Some User');
  });

  it('Should login on POST /auth/signin', async () => {
    let param = { 
      username: 'Some User',
      password: 'blahblah'
  };

  let response = await request.post('/auth/signin').send(param).set({
    'Authorization':'Basic U29tZSBVc2VyOmJsYWhibGFo'
  });
  expect(response.text).toContain('logged in');
  });

})


