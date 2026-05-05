import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const PlaylistController = {
  async getAll(req: Request, res: Response) {
    try {
      const playlists = await prisma.playlist.findMany({
        include: { creator: true, tracks: { include: { track: true } } },
      });
      res.json(playlists);
    } catch (e) {
      res.status(500).json({ error: "Server error" });
    }
  },

  async create(req: Request, res: Response) {
    const { name, creatorId } = req.body;
    try {
      const playlist = await prisma.playlist.create({
        data: { name, creatorId: Number(creatorId) },
      });
      res.status(201).json(playlist);
    } catch (e) {
      res.status(400).json({ error: "Invalid creator ID" });
    }
  },

  // Додавання треку в плейлист
  async addTrack(req: Request, res: Response) {
    const { playlistId, trackId } = req.body;
    try {
      const link = await prisma.playlistTrack.create({
        data: { playlistId: Number(playlistId), trackId: Number(trackId) },
      });
      res.json(link);
    } catch (e) {
      res.status(400).json({ error: "Already in playlist" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await prisma.playlist.delete({ where: { id: Number(req.params.id) } });
      res.status(204).send();
    } catch (e) {
      res.status(400).json({ error: "Delete failed" });
    }
  },
};
