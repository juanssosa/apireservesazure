//import request from 'supertest'
//import app from '../routes/client-routes.js'
const request = require('supertest');
const app = require('../routes/client-routes.js');

describe('Client API Tests', () => {
    test('It should get a client list', async () => {
    const response = await request(app.routes).get('/api/clients');
    expect(response.statusCode).toBe(200);
  });

  test('It should create a new client', async () => {
    const newClient = { id: '359', firstName: 'Ema', lastName: 'Perez', phone: '1234567890' };
    const response = await request(app.routes)
      .post('/api/client')
      .send(newClient);

    //expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Client saved!');
  });
});
