import express, { Request, Response } from "express";
import Menu from "../models/menu";

const router = express.Router();

// POST: Save menu
router.post("/", async (req: Request, res: Response) => {
  try {
    const newMenu = new Menu(req.body);
    const saved = await newMenu.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to save menu" });
  }
});

// GET: Fetch menu
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      res.status(404).json({ error: "Menu not found" });
      return;
    }
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

export default router;
