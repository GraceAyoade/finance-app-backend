import express from "express";
import { setBudget, getBudgets } from "../controllers/budgetController";
import authMiddleware from "../middleware/auth.mw";

const budgetRouter = express.Router();

budgetRouter.use(authMiddleware);
budgetRouter.post("/", setBudget);
budgetRouter.get("/", getBudgets);

export default budgetRouter;
