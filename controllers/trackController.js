const prisma = require("../prismaClient");

exports.getAll = async (req, res) => {
  try {
    const tracks = await prisma.track.findMany({
      include: {
        artists: { include: { artist: true } }, // Завантажуємо виконавців треку
      },
    });
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Створення треку із синхронним прив'язуванням до артиста (через ArtistTrack)
exports.create = async (req, res) => {
  try {
    const { title, genre, duration, fileUrl, albumId, artistIds } = req.body;

    const track = await prisma.track.create({
      data: {
        title,
        genre,
        duration,
        fileUrl,
        albumId: albumId ? parseInt(albumId) : null,
        // Створюємо записи в проміжній таблиці ArtistTrack автоматично
        artists: {
          create: artistIds.map((id) => ({ artistId: parseInt(id) })),
        },
      },
    });
    res.status(201).json(track);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
