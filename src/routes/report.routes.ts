import express from "express";
import { getSummary } from "../controllers/reportController";
import authMiddleware from "../middleware/auth.mw";

const reportRouter = express.Router();

reportRouter.use(authMiddleware);
reportRouter.get("/summary", getSummary);

export default reportRouter;
