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

  it('should filter albums by search', async () => {
    prisma.album.findMany.mockResolvedValue([{ id: 1, title: 'After Hours' }]);
    const res = await request(app).get('/api/albums?search=after');
    expect(res.statusCode).toBe(200);
  });

  it('should return 500 on getAll error', async () => {
    prisma.album.findMany.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).get('/api/albums');
    expect(res.statusCode).toBe(500);
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

  it('should return 404 if year segment is missing in URL', async () => {
    const res = await request(app).get('/api/albums/filter/');
    expect(res.statusCode).toBe(404);
  });

  it('should return 400 if year param is absent (direct controller call)', async () => {
    const albumController = require('../controllers/albumController');
    const req = { params: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await albumController.getByYear(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Вкажіть рік для фільтрації',
    });
  });

  it('should return 500 on getByYear error', async () => {
    prisma.album.findMany.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).get('/api/albums/filter/1995');
    expect(res.statusCode).toBe(500);
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

  it('should return 500 on getById error', async () => {
    prisma.album.findUnique.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).get('/api/albums/1');
    expect(res.statusCode).toBe(500);
  });

  it('should create an album', async () => {
    prisma.album.create.mockResolvedValue({ id: 1, title: 'New Album' });
    const res = await request(app)
      .post('/api/albums')
      .send({ title: 'New Album', artistIds: [1, 2] });
    expect(res.statusCode).toBe(201);
  });

  it('should return 400 on create error', async () => {
    prisma.album.create.mockRejectedValue(new Error('Validation error'));
    const res = await request(app)
      .post('/api/albums')
      .send({ title: 'New Album', artistIds: [1, 2] });
    expect(res.statusCode).toBe(400);
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

  it('should return 500 on delete error', async () => {
    prisma.album.findUnique.mockResolvedValue({ id: 1 });
    prisma.album.delete.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).delete('/api/albums/1');
    expect(res.statusCode).toBe(500);
  });
});
