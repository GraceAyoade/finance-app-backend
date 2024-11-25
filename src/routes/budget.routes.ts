import express from "express";
import {
  setBudget,
  getBudgets,
  deleteBudget,
} from "../controllers/budgetController";
import authMiddleware from "../middleware/auth.mw";
import { getBudget, deleteAllBudgets } from "./../controllers/budgetController";

const budgetRouter = express.Router();

budgetRouter.use(authMiddleware);
budgetRouter.post("/", setBudget);
budgetRouter.get("/", getBudgets);
budgetRouter.get("/:id", getBudget);
budgetRouter.delete("/:id", deleteBudget);
budgetRouter.delete("/", deleteAllBudgets);

export default budgetRouter;
