const request = require('supertest');
const app = require('./testApp');
const prisma = require('../prismaClient');
const jwt = require('jsonwebtoken');

describe('Artists API', () => {
  let token;
  beforeAll(() => {
    // Додали id: 1, щоб твій artistController.js міг успішно прочитати req.user.id
    token = jwt.sign({ id: 1, userId: 1 }, 'test_secret_key');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all artists and search by name', async () => {
    prisma.artist.findMany.mockResolvedValue([{ id: 1, stageName: 'Eminem' }]);
    const res = await request(app).get('/api/artists?search=Eminem');
    expect(res.statusCode).toBe(200);
    expect(prisma.artist.findMany).toHaveBeenCalledWith({
      where: { stageName: { contains: 'Eminem', mode: 'insensitive' } },
    });
  });

  it('should return 500 on getAll error', async () => {
    prisma.artist.findMany.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).get('/api/artists');
    expect(res.statusCode).toBe(500);
  });

  it('should create an artist profile', async () => {
    prisma.artist.create.mockResolvedValue({ id: 1, stageName: 'Eminem' });
    const res = await request(app)
      .post('/api/artists')
      .set('Authorization', `Bearer ${token}`)
      .send({ stageName: 'Eminem' });
    expect(res.statusCode).toBe(201);
  });

  it('should return 400 on create error', async () => {
    prisma.artist.create.mockRejectedValue(new Error('Duplicate stageName'));
    const res = await request(app)
      .post('/api/artists')
      .set('Authorization', `Bearer ${token}`)
      .send({ stageName: 'Eminem' });
    expect(res.statusCode).toBe(400);
  });

  it('should get artist by ID', async () => {
    prisma.artist.findUnique.mockResolvedValue({ id: 1, stageName: 'Eminem' });
    const res = await request(app).get('/api/artists/1');
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 if artist not found by ID', async () => {
    prisma.artist.findUnique.mockResolvedValue(null);
    const res = await request(app).get('/api/artists/99');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 on getById error', async () => {
    prisma.artist.findUnique.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).get('/api/artists/1');
    expect(res.statusCode).toBe(500);
  });

  it('should delete artist', async () => {
    prisma.artist.delete.mockResolvedValue({});
    const res = await request(app).delete('/api/artists/1');
    expect(res.statusCode).toBe(204);
  });

  it('should return 400 on delete error', async () => {
    prisma.artist.delete.mockRejectedValue(new Error('Delete error'));
    const res = await request(app).delete('/api/artists/1');
    expect(res.statusCode).toBe(400);
  });
});
