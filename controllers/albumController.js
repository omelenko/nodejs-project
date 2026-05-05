const prisma = require("../prismaClient");

// Отримати всі альбоми разом із їхніми авторами (артистами)
exports.getAll = async (req, res) => {
  try {
    const albums = await prisma.album.findMany({
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
    if (!album) return res.status(404).json({ message: "Альбом не знайдено" });
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Створити альбом
exports.create = async (req, res) => {
  try {
    const { title, coverUrl, releaseYear } = req.body;
    const album = await prisma.album.create({
      data: { title, coverUrl, releaseYear },
    });
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
