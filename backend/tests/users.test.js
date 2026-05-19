const request = require('supertest');
const app = require('./testApp');
const prisma = require('../prismaClient');
const jwt = require('jsonwebtoken');

describe('Users API', () => {
  let token;
  beforeAll(() => {
    token = jwt.sign({ userId: 1 }, 'test_secret_key');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    prisma.user.findMany.mockResolvedValue([{ id: 1, username: 'test' }]);
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
  });

  it('should create a user manually', async () => {
    prisma.user.create.mockResolvedValue({ id: 2, username: 'new' });
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'new', email: 'a@a.com', password: '123' });
    expect(res.statusCode).toBe(201);
  });

  it('should get current user profile (/me)', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1, username: 'test' });
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 for /me if user not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });

  it('should remove favorite track', async () => {
    prisma.favourite.deleteMany.mockResolvedValue({ count: 1 });
    const res = await request(app)
      .delete('/api/users/1/favorites')
      .send({ trackId: 5 });
    expect(res.statusCode).toBe(204);
  });

  it('should handle errors in catch blocks', async () => {
    prisma.user.findMany.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(500);
  });
});
