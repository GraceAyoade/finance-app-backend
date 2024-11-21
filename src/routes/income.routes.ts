import express from "express";
import { deleteIncome, editIncome, listIncomes, logIncome } from "../controllers/income.controller";

const incomeRoute = express.Router();

incomeRoute.post("/", logIncome);
incomeRoute.get("/:id", listIncomes);
incomeRoute.put("/:id", editIncome);
incomeRoute.delete("/;id", deleteIncome);

export default incomeRoute;