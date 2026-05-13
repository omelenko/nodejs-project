const prisma = require('../prismaClient');

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

exports.getByGenre = async (req, res) => {
  const { genre } = req.query; // Отримуємо жанр з query-параметрів (?genre=Rock)

  try {
    if (!genre) {
      return res
        .status(400)
        .json({ error: 'Будь ласка, вкажіть жанр у параметрах запиту' });
    }

    const tracks = await prisma.track.findMany({
      where: {
        genre: {
          equals: genre,
          mode: 'insensitive', // Це дозволить знаходити "rock", "Rock" і "ROCK"
        },
      },
      include: {
        artists: { include: { artist: true } }, // Щоб бачити, хто виконує трек
        album: true, // Щоб бачити, з якого це альбому
      },
    });

    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
