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
    it('should return 404 if track is not found', async () => {
      prisma.track.findUnique.mockResolvedValue(null);

      const res = await request(app).get('/api/tracks/999');

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Трек не знайдено');
    });
  });
});
