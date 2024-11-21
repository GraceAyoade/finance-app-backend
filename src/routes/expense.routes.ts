import express from "express";
import {
  deleteExpense,
  editExpense,
  listExpenses,
  logExpense,
} from "../controllers/expense.controller";

const expenseRoute = express.Router();

expenseRoute.post("/", logExpense);
expenseRoute.get("/:id", listExpenses);
expenseRoute.put("/:id", editExpense);
expenseRoute.delete("/:id", deleteExpense);

export default expenseRoute;