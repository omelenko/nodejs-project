import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const UserController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: { id: true, username: true, email: true, createdAt: true },
      });
      res.json(users);
    } catch (e) {
      res.status(500).json({ error: "Server error" });
    }
  },

  async create(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: { username, email, password }, // У реальному проекті тут має бути хешування
      });
      res.status(201).json(user);
    } catch (e) {
      res.status(400).json({ error: "User already exists" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await prisma.user.delete({ where: { id: Number(req.params.id) } });
      res.status(204).send();
    } catch (e) {
      res.status(400).json({ error: "Delete failed" });
    }
  },
};
