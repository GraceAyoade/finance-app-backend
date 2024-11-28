import express from "express";
import {
  getCashFlow,
  getCategorySpending,
  getExpenseBreakdown,
  getMonthlyCashFlow,
  getSummary,
} from "../controllers/reportController";
import authMiddleware from "../middleware/auth.mw";

const reportRouter = express.Router();

reportRouter.use(authMiddleware);
reportRouter.get("/", getCategorySpending);
reportRouter.get("/summary", getSummary);
reportRouter.get("/monthly-flow", getMonthlyCashFlow);
reportRouter.get("/cash-flow", getCashFlow)
reportRouter.get("/expense-breakdown", getExpenseBreakdown);

export default reportRouter;
