const prisma = require('../prismaClient');

// Отримати всі треки з фільтрацією за жанром
exports.getAll = async (req, res) => {
  try {
    const {search, genre} = req.query;

    const whereClause = {};

    if (search) {
      whereClause.title = {
        contains: search,
        mode: 'insensitive'
      };
    }

    if (genre) {
      whereClause.genre = {
        contains: genre,
        mode: 'insensitive'
      };
    }

    const tracks = await prisma.track.findMany({
      where: whereClause,
      include: {
        artists: { include: { artist: true } } // показує авторів треку
      }
    });
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const track = await prisma.track.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!track) return res.status(404).json({ message: "Трек не знайдено" });
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, genre, duration, fileUrl, albumId, artistIds } = req.body;
    // artistIds — це масив ID артистів, які брали участь у записі, наприклад [1, 3]

    const newTrack = await prisma.track.create({
      data: {
        title, genre, duration, fileUrl,
        albumId: albumId ? parseInt(albumId) : null,
        // Магія Prisma для зв'язку багато-до-багатьох (ArtistTrack)
        artists: artistIds ? {
          create: artistIds.map(id => ({
            artist: { connect: { id: parseInt(id) } }
          }))
        } : null
      }
    });
    res.status(201).json(newTrack);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.track.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


