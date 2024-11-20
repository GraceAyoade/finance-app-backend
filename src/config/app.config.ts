import express from "express";
import cors from "cors";
import authRoutes from "../routes/auth.routes"
import errorHandler from "../middleware/error.mw";

// creating express app
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Defining routes
app.use("/api/auth", authRoutes);


app.use(errorHandler)

export default app;
