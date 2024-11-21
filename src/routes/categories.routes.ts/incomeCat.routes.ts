import express from "express";
import { createIncomeCategory } from "../../controllers/categories/incomeCat.controllers";

const incomeCategoryRoutes = express.Router()

incomeCategoryRoutes.post("/createcategory", createIncomeCategory)

export default incomeCategoryRoutes;