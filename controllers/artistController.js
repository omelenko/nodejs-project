const prisma = require("../prismaClient");

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
    const { stageName, firstName, lastName, bio, country } = req.body;
    const artist = await prisma.artist.create({
      data: { stageName, firstName, lastName, bio, country },
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
