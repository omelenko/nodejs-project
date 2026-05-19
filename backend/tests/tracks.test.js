const request = require('supertest');
const app = require('./testApp');
const prisma = require('../prismaClient');

describe('Tracks API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/tracks', () => {
    it('should return list of all tracks', async () => {
      const mockTracks = [
        {
          id: 1,
          title: 'Track 1',
          genre: 'Pop',
          duration: 200,
          fileUrl: 'url1',
          albumId: null,
          artists: [],
        },
        {
          id: 2,
          title: 'Track 2',
          genre: 'Rock',
          duration: 240,
          fileUrl: 'url2',
          albumId: null,
          artists: [],
        },
      ];

      prisma.track.findMany.mockResolvedValue(mockTracks);

      const res = await request(app).get('/api/tracks');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(200 ? mockTracks.length : 2);
      expect(res.body[0].title).toBe('Track 1');
    });

    it('should pass search queries to prisma clause', async () => {
      prisma.track.findMany.mockResolvedValue([]);

      await request(app).get('/api/tracks?search=synth&genre=electronic');

      expect(prisma.track.findMany).toHaveBeenCalledWith({
        where: {
          title: { contains: 'synth', mode: 'insensitive' },
          genre: { contains: 'electronic', mode: 'insensitive' },
        },
        include: { artists: { include: { artist: true } } },
      });
    });
  });

  describe('GET /api/tracks/:id', () => {
    it('should return track by ID', async () => {
      prisma.track.findUnique.mockResolvedValue({ id: 1, title: 'Track 1' });

      const res = await request(app).get('/api/tracks/1');

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Track 1');
    });

    it('should return 404 if track is not found', async () => {
      prisma.track.findUnique.mockResolvedValue(null);

      const res = await request(app).get('/api/tracks/999');

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Трек не знайдено');
    });

    it('should return 500 on database error', async () => {
      prisma.track.findUnique.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/api/tracks/1');

      expect(res.statusCode).toBe(500);
    });
  });

  describe('POST /api/tracks', () => {
    it('should create a track with artists', async () => {
      prisma.track.create.mockResolvedValue({
        id: 1,
        title: 'New Track',
        genre: 'Pop',
        duration: '3:30',
        fileUrl: 'http://example.com/track.mp3',
      });

      const res = await request(app)
        .post('/api/tracks')
        .send({
          title: 'New Track',
          genre: 'Pop',
          duration: '3:30',
          fileUrl: 'http://example.com/track.mp3',
          artistIds: [1, 2],
        });

      expect(res.statusCode).toBe(201);
    });

    it('should create a track without albumId', async () => {
      prisma.track.create.mockResolvedValue({
        id: 1,
        title: 'Single Track',
        genre: 'Rock',
        duration: '4:00',
        fileUrl: 'http://example.com/single.mp3',
      });

      const res = await request(app)
        .post('/api/tracks')
        .send({
          title: 'Single Track',
          genre: 'Rock',
          duration: '4:00',
          fileUrl: 'http://example.com/single.mp3',
          artistIds: [1],
        });

      expect(res.statusCode).toBe(201);
    });

    it('should create a track with albumId', async () => {
      prisma.track.create.mockResolvedValue({
        id: 2,
        title: 'Album Track',
        genre: 'Pop',
        duration: '3:00',
        fileUrl: 'http://example.com/album-track.mp3',
        albumId: 5,
      });

      const res = await request(app)
        .post('/api/tracks')
        .send({
          title: 'Album Track',
          genre: 'Pop',
          duration: '3:00',
          fileUrl: 'http://example.com/album-track.mp3',
          albumId: 5,
          artistIds: [1],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.albumId).toBe(5);
    });

    it('should return 400 on create error', async () => {
      prisma.track.create.mockRejectedValue(new Error('Validation error'));

      const res = await request(app)
        .post('/api/tracks')
        .send({
          title: 'Invalid Track',
          genre: 'Pop',
          duration: '3:30',
          fileUrl: 'http://example.com/track.mp3',
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('DELETE /api/tracks/:id', () => {
    it('should delete a track', async () => {
      prisma.track.delete.mockResolvedValue({});

      const res = await request(app).delete('/api/tracks/1');

      expect(res.statusCode).toBe(204);
    });

    it('should return 400 on delete error', async () => {
      prisma.track.delete.mockRejectedValue(new Error('Delete error'));

      const res = await request(app).delete('/api/tracks/1');

      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/tracks error handling', () => {
    it('should return 500 on database error', async () => {
      prisma.track.findMany.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/api/tracks');

      expect(res.statusCode).toBe(500);
    });
  });
});
