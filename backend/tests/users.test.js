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

  it('should return 400 on create error', async () => {
    prisma.user.create.mockRejectedValue(new Error('Validation error'));
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'new', email: 'a@a.com', password: '123' });
    expect(res.statusCode).toBe(400);
  });

  it('should get user by ID', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'test',
      playlists: [],
    });
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 if user not found by ID', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 on getById error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(500);
  });

  it('should get current user profile (/me)', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'test',
      artistProfile: null,
    });
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it('should return 401 for /me if not authorized', async () => {
    const noUserToken = jwt.sign({}, 'test_secret_key');
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${noUserToken}`);
    expect(res.statusCode).toBe(401);
  });

  it('should return 403 for /me if token is invalid', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', 'Bearer invalid.token.here');
    expect(res.statusCode).toBe(403);
  });

  it('should return 404 for /me if user not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 on /me error', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(500);
  });

  it('should add favorite track', async () => {
    prisma.favourite.create.mockResolvedValue({
      id: 1,
      userId: 1,
      trackId: 5,
    });
    const res = await request(app)
      .post('/api/users/1/favorites')
      .send({ trackId: 5 });
    expect(res.statusCode).toBe(201);
  });

  it('should return 400 on addFavorite error', async () => {
    prisma.favourite.create.mockRejectedValue(new Error('DB Error'));
    const res = await request(app)
      .post('/api/users/1/favorites')
      .send({ trackId: 5 });
    expect(res.statusCode).toBe(400);
  });

  it('should remove favorite track', async () => {
    prisma.favourite.deleteMany.mockResolvedValue({ count: 1 });
    const res = await request(app)
      .delete('/api/users/1/favorites')
      .send({ trackId: 5 });
    expect(res.statusCode).toBe(204);
  });

  it('should return 400 on removeFavorite error', async () => {
    prisma.favourite.deleteMany.mockRejectedValue(new Error('DB Error'));
    const res = await request(app)
      .delete('/api/users/1/favorites')
      .send({ trackId: 5 });
    expect(res.statusCode).toBe(400);
  });

  it('should handle errors in catch blocks', async () => {
    prisma.user.findMany.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(500);
  });
});
