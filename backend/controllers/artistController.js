const prisma = require('../prismaClient');

exports.getAll = async (req, res) => {
  try {
    const { search } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.stageName = {
        contains: search,
        mode: 'insensitive'
      };
    }

    const artists = await prisma.artist.findMany(
        {
          where: whereClause,
        }
    );
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Створення профілю артиста для поточного User
exports.create = async (req, res) => {
  try {
    const { stageName, firstName, lastName, bio, country, avatarUrl, bannerUrl } = req.body;
    const userId = req.user.id;

    const newArtist = await prisma.artist.create({
      data: {
        stageName, firstName, lastName, bio, country, avatarUrl, bannerUrl,
        userId: userId
      }
    });
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(400).json({ error: "Цей псевдонім (stageName) вже зайнятий або у вас вже є профіль артиста" });
  }
};

// Отримання публічного профілю артиста з його треками та альбомами
exports.getById = async (req, res) => {
  try {
    const artist = await prisma.artist.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        tracks: { include: { track: true } }, // через проміжну таблицю ArtistTrack
        albums: { include: { album: true } }  // через проміжну таблицю ArtistAlbum
      }
    });

    if (!artist) return res.status(404).json({ message: "Артиста не знайдено" });
    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.artist.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
