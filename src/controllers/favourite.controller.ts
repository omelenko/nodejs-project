import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const FavouriteController = {
  // Отримати всі "улюблені" конкретного користувача
  async getByUser(req: Request, res: Response) {
    try {
      const favs = await prisma.favourite.findMany({
        where: { userId: Number(req.params.userId) },
        include: { track: true },
      });
      res.json(favs);
    } catch (e) {
      res.status(500).json({ error: "Server error" });
    }
  },

  async add(req: Request, res: Response) {
    const { userId, trackId } = req.body;
    try {
      const fav = await prisma.favourite.create({
        data: { userId: Number(userId), trackId: Number(trackId) },
      });
      res.status(201).json(fav);
    } catch (e) {
      res.status(400).json({ error: "Already favorited" });
    }
  },

  async remove(req: Request, res: Response) {
    const { userId, trackId } = req.body;
    try {
      await prisma.favourite.delete({
        where: {
          userId_trackId: { userId: Number(userId), trackId: Number(trackId) },
        },
      });
      res.status(204).send();
    } catch (e) {
      res.status(400).json({ error: "Not found in favorites" });
    }
  },
};
