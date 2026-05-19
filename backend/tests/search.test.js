// tests/search.test.js
const request = require('supertest');
const app = require('./testApp');
const prisma = require('../prismaClient');

describe('Search API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return combined results for global search', async () => {
    prisma.track.findMany.mockResolvedValue([{ id: 1, title: 'Rock Track' }]);
    prisma.album.findMany.mockResolvedValue([{ id: 1, title: 'Rock Album' }]);
    prisma.artist.findMany.mockResolvedValue([
      { id: 1, stageName: 'Rock Star' },
    ]);

    const res = await request(app).get('/api/search?query=rock');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('tracks');
    expect(res.body).toHaveProperty('albums');
    expect(res.body).toHaveProperty('artists');
    expect(res.body.tracks[0].title).toBe('Rock Track');
  });
});
