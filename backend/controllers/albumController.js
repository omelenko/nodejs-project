const prisma = require('../prismaClient');

// Отримати всі альбоми разом із їхніми авторами (артистами)
exports.getAll = async (req, res) => {
  try {
    const { search } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const albums = await prisma.album.findMany({
      where: whereClause,
      include: {
        artists: {
          include: { artist: true },
        },
      },
    });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Отримати конкретний альбом з усім списком його треків
exports.getById = async (req, res) => {
  try {
    const album = await prisma.album.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        tracks: true,
        artists: { include: { artist: true } },
      },
    });
    if (!album) return res.status(404).json({ message: 'Альбом не знайдено' });
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Створити альбом
exports.create = async (req, res) => {
  try {
    const { title, coverUrl, releaseYear, artistIds } = req.body;

    const newAlbum = await prisma.album.create({
      data: {
        title,
        coverUrl,
        releaseYear,
        artists: {
          create: artistIds.map((id) => ({
            artist: { connect: { id: parseInt(id) } },
          })),
        },
      },
    });
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Видалити альбом
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // 1. Спочатку перевіряємо, чи існує такий альбом
    const album = await prisma.album.findUnique({
      where: { id: id },
    });

    if (!album) {
      return res.status(404).json({
        message: 'Альбом із таким ID не знайдено або він уже видалений',
      });
    }

    // 2. Якщо існує — видаляємо
    await prisma.album.delete({
      where: { id: id },
    });

    res.status(204).send(); // Успішно видалено (без тіла відповіді)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByYear = async (req, res) => {
  const { year } = req.params;

  try {
    if (!year) {
      return res.status(400).json({ error: 'Вкажіть рік для фільтрації' });
    }

    const yearInt = parseInt(year);
    if (isNaN(yearInt)) {
      return res.status(400).json({ error: 'Рік має бути числом' });
    }

    const albums = await prisma.album.findMany({
      where: {
        releaseYear: {
          equals: yearInt,
        },
      },
      include: {
        artists: { include: { artist: true } },
        tracks: true,
      },
    });

    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
