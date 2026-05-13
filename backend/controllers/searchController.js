const prisma = require('../prismaClient');
exports.globalSearch = async (req, res) => {
  const { query } = req.query;
  try {
    const [tracks, albums, artists] = await Promise.all([
      prisma.track.findMany({
        where: { title: { contains: query, mode: 'insensitive' } },
        take: 5,
      }),
      prisma.album.findMany({
        where: { title: { contains: query, mode: 'insensitive' } },
        take: 5,
      }),
      prisma.artist.findMany({
        where: { stageName: { contains: query, mode: 'insensitive' } },
        take: 5,
      }),
    ]);

    res.json({ tracks, albums, artists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
