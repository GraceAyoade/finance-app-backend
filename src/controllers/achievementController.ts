import { Request, Response } from "express";
import Achievement from "../models/achievement.model";

export const addAchievement = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = req.user.id;

  try {
    const achievement = await Achievement.create({ userId, title });
    res
      .status(201)
      .json({ message: "Achievement added successfully", achievement });
  } catch (err) {
    res.status(500).json({ message: "Error adding achievement", error: err });
  }
};

export const getAchievements = async (req: Request, res: Response) => {
    const userId = req.user.id;
  
    try {
      const achievements = await Achievement.find({ userId });
      res.status(200).json({ message: 'Achievements fetched successfully', achievements });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching achievements', error: err });
    }
  };
  