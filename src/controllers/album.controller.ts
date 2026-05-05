import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const AlbumController = {
  async getAll(req: Request, res: Response) {
    try {
      const albums = await prisma.album.findMany({
        include: { artists: { include: { artist: true } }, tracks: true },
      });
      res.json(albums);
    } catch (e) {
      res.status(500).json({ error: "Server error" });
    }
  },

  async create(req: Request, res: Response) {
    const { title, coverUrl, releaseYear, artistIds } = req.body;
    try {
      const album = await prisma.album.create({
        data: {
          title,
          coverUrl,
          releaseYear,
          artists: {
            create: artistIds.map((id: number) => ({ artistId: id })),
          },
        },
      });
      res.status(201).json(album);
    } catch (e) {
      res.status(400).json({ error: "Check artist IDs" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await prisma.album.delete({ where: { id: Number(req.params.id) } });
      res.status(204).send();
    } catch (e) {
      res.status(400).json({ error: "Delete failed" });
    }
  },
};
