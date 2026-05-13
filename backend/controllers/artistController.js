const prisma = require('../prismaClient');

exports.getAll = async (req, res) => {
  try {
    const artists = await prisma.artist.findMany();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    // Додаємо userId до списку полів, які ми чекаємо від клієнта
    const { stageName, firstName, lastName, bio, country, userId } = req.body;

    const artist = await prisma.artist.create({
      data: {
        stageName,
        firstName,
        lastName,
        bio,
        country,
        // Обов'язково вказуємо зв'язок з користувачем
        userId: parseInt(userId),
      },
    });
    res.status(201).json(artist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Прив'язати артиста до альбому (Реалізація логіки таблиці ArtistAlbum)
exports.attachToAlbum = async (req, res) => {
  try {
    const { artistId, albumId } = req.body;
    const relation = await prisma.artistAlbum.create({
      data: { artistId: parseInt(artistId), albumId: parseInt(albumId) },
    });
    res.status(201).json(relation);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
