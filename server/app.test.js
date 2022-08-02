const request = require('supertest');
const app = require('./app');

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    var response = await request(app).get("/reviews");
    expect(response.body).toEqual({test: 'Test'});
    expect(response.statusCode).toBe(200);
  });
});