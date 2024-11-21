import express from "express";
import cors from "cors";
import authRoutes from "../routes/auth.routes"
import errorHandler from "../middleware/error.mw";
import incomeRoutes from "../routes/income.routes";
import expenseRoutes from "../routes/expense.routes";
import incomeCategoryRoutes from "../routes/categories.routes.ts/incomeCat.routes";

// creating express app
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Defining routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/incomecategories", incomeCategoryRoutes)

app.use(errorHandler)

export default app;
