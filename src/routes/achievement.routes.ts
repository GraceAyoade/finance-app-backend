import express from "express";
import {
  addAchievement,
  getAchievements,
} from "../controllers/achievementController";
import authMiddleware from "../middleware/auth.mw";

const achievementRouter = express.Router();

achievementRouter.use(authMiddleware);
achievementRouter.post("/", addAchievement);
achievementRouter.get("/", getAchievements);

export default achievementRouter;
