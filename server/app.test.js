const db = require('../db/mongo');
const request = require('supertest');
const app = require('./app');

describe('Test the root path', () => {

  test('It should respond to GET method', async () => {
    var response = await request(app).get('/reviews?product_id=70701');
    expect(response.body.length).not.toEqual(0);
    expect(response.statusCode).toBe(200);
  });
});