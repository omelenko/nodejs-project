const prisma = require("../prismaClient");

exports.create = async (req, res) => {
  try {
    const { name, creatorId } = req.body;
    const playlist = await prisma.playlist.create({
      data: { name, creatorId: parseInt(creatorId) },
    });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Додавання треку в плейлист (Реалізація логіки таблиці PlaylistTrack)
exports.addTrack = async (req, res) => {
  try {
    const playlistId = parseInt(req.params.id);
    const { trackId } = req.body;

    const playlistTrack = await prisma.playlistTrack.create({
      data: { playlistId, trackId: parseInt(trackId) },
    });
    res
      .status(201)
      .json({ message: "Трек додано до плейлиста", playlistTrack });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
