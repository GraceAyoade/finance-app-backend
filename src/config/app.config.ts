import express from "express";
import cors from "cors";
import authRouter from "../routes/auth.routes";
import entryRouter from "../routes/entry.routes";
import budgetRouter from "../routes/budget.routes";
import reportRouter from "../routes/report.routes";
import achievementRouter from "../routes/achievement.routes";
import errorHandler from "../middleware/error-handler.mw";

// creating express app
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/auth", authRouter);
app.use("/api/entries", entryRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/reports", reportRouter);
app.use("/api/achievements", achievementRouter);

app.use(errorHandler);

export default app;
