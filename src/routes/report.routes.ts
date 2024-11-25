import express from "express";
import { getCategorySpending, getExpenseBreakdown, getMonthlyCashFlow, getSummary } from "../controllers/reportController";
import authMiddleware from "../middleware/auth.mw";

const reportRouter = express.Router();

reportRouter.use(authMiddleware);
reportRouter.get("/category-spending", getCategorySpending);
reportRouter.get("/monthly-cashflow", getMonthlyCashFlow);
reportRouter.get("/summary", getSummary);
reportRouter.get("/expense-breakdown", getExpenseBreakdown);

export default reportRouter;
