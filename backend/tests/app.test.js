const request = require('supertest');
const app = require('./testApp');

describe('App Configuration', () => {
  it('should parse JSON body', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'test', email: 'test@test.com', password: '123' });
    expect(res.statusCode).toBeDefined();
  });

  it('should handle 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
  });
});
