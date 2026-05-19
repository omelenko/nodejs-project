const request = require('supertest');
const app = require('./testApp');
const prisma = require('../prismaClient');

describe('Albums API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all albums', async () => {
    prisma.album.findMany.mockResolvedValue([{ id: 1, title: 'After Hours' }]);
    const res = await request(app).get('/api/albums');
    expect(res.statusCode).toBe(200);
  });

  it('should filter albums by year', async () => {
    prisma.album.findMany.mockResolvedValue([{ id: 2 }]);
    const res = await request(app).get('/api/albums/filter/1995');
    expect(res.statusCode).toBe(200);
  });

  it('should return 400 if year is invalid', async () => {
    const res = await request(app).get('/api/albums/filter/abc');
    expect(res.statusCode).toBe(400);
  });

  it('should get album by ID', async () => {
    prisma.album.findUnique.mockResolvedValue({ id: 1 });
    const res = await request(app).get('/api/albums/1');
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 if album not found by ID', async () => {
    prisma.album.findUnique.mockResolvedValue(null);
    const res = await request(app).get('/api/albums/999');
    expect(res.statusCode).toBe(404);
  });

  it('should create an album', async () => {
    prisma.album.create.mockResolvedValue({ id: 1, title: 'New Album' });
    const res = await request(app)
      .post('/api/albums')
      .send({ title: 'New Album', artistIds: [1, 2] });
    expect(res.statusCode).toBe(201);
  });

  it('should delete an album', async () => {
    prisma.album.findUnique.mockResolvedValue({ id: 1 });
    prisma.album.delete.mockResolvedValue({});
    const res = await request(app).delete('/api/albums/1');
    expect(res.statusCode).toBe(204);
  });

  it('should return 404 on delete if album does not exist', async () => {
    prisma.album.findUnique.mockResolvedValue(null);
    const res = await request(app).delete('/api/albums/99');
    expect(res.statusCode).toBe(404);
  });
});
