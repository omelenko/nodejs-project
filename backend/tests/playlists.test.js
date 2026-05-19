const request = require('supertest');
const app = require('./testApp');
const prisma = require('../prismaClient');
const jwt = require('jsonwebtoken');

describe('Playlists API', () => {
  let mockToken;
  beforeAll(() => {
    mockToken = jwt.sign({ userId: 10 }, 'test_secret_key');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a playlist by ID', async () => {
    prisma.playlist.findUnique.mockResolvedValue({ id: 1, name: 'Chill' });
    const res = await request(app).get('/api/playlists/1');
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 if playlist not found', async () => {
    prisma.playlist.findUnique.mockResolvedValue(null);
    const res = await request(app).get('/api/playlists/99');
    expect(res.statusCode).toBe(404);
  });

  it('should return 500 on getById error', async () => {
    prisma.playlist.findUnique.mockRejectedValue(new Error('DB Error'));
    const res = await request(app).get('/api/playlists/1');
    expect(res.statusCode).toBe(500);
  });

  it('should return 401 if token is missing on create', async () => {
    const res = await request(app)
      .post('/api/playlists')
      .send({ name: 'My Playlist' });
    expect(res.statusCode).toBe(401);
  });

  it('should create playlist if token is valid', async () => {
    prisma.playlist.create.mockResolvedValue({
      id: 5,
      name: 'My Playlist',
      creatorId: 10,
    });
    const res = await request(app)
      .post('/api/playlists')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ name: 'My Playlist' });
    expect(res.statusCode).toBe(201);
  });

  it('should return 400 on create error', async () => {
    prisma.playlist.create.mockRejectedValue(new Error('Validation error'));
    const res = await request(app)
      .post('/api/playlists')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ name: 'My Playlist' });
    expect(res.statusCode).toBe(400);
  });

  it('should delete playlist', async () => {
    prisma.playlist.delete.mockResolvedValue({});
    const res = await request(app).delete('/api/playlists/1');
    expect(res.statusCode).toBe(204);
  });

  it('should return 400 on delete error', async () => {
    prisma.playlist.delete.mockRejectedValue(new Error('Delete error'));
    const res = await request(app).delete('/api/playlists/1');
    expect(res.statusCode).toBe(400);
  });

  it('should add track to playlist', async () => {
    prisma.playlistTrack.create.mockResolvedValue({
      playlistId: 1,
      trackId: 100,
    });
    const res = await request(app)
      .post('/api/playlists/1/tracks')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ trackId: 100 });
    expect(res.statusCode).toBe(201);
  });

  it('should return 400 on addTrack error', async () => {
    prisma.playlistTrack.create.mockRejectedValue(new Error('Validation error'));
    const res = await request(app)
      .post('/api/playlists/1/tracks')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ trackId: 100 });
    expect(res.statusCode).toBe(400);
  });

  it('should remove track from playlist', async () => {
    prisma.playlistTrack.delete.mockResolvedValue({});
    const res = await request(app).delete('/api/playlists/1/tracks/100');
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 on removeTrack error', async () => {
    prisma.playlistTrack.delete.mockRejectedValue(new Error('Record not found'));
    const res = await request(app).delete('/api/playlists/1/tracks/100');
    expect(res.statusCode).toBe(404);
  });
});
