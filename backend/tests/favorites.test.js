const request = require('supertest');
const app = require('./testApp');
const prisma = require('../prismaClient');
const jwt = require('jsonwebtoken');

describe('Favorites API', () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ id: 1 }, 'test_secret_key');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should like a track', async () => {
    prisma.favourite.create.mockResolvedValue({
      id: 1,
      userId: 1,
      trackId: 1,
    });

    const res = await request(app)
      .post('/api/users/1/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ trackId: 1 });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Трек додано в улюблені');
  });

  it('should return 400 when track already liked', async () => {
    prisma.favourite.create.mockRejectedValue(new Error('Unique constraint'));

    const res = await request(app)
      .post('/api/users/1/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ trackId: 1 });

    expect(res.statusCode).toBe(400);
  });

  it('should remove favorite track', async () => {
    prisma.favourite.deleteMany.mockResolvedValue({ count: 1 });

    const res = await request(app)
      .delete('/api/users/1/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ trackId: 1 });

    expect(res.statusCode).toBe(204);
  });

  it('should handle errors in likeTrack', async () => {
    prisma.favourite.create.mockRejectedValue(new Error('DB Error'));

    const res = await request(app)
      .post('/api/users/1/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({ trackId: 1 });

    expect(res.statusCode).toBe(400);
  });
});
