import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRouter from './routes/auth.routes';
import cors from 'cors';
import entryRouter from './routes/entry.routes';
import budgetRouter from './routes/budget.routes';
import reportRouter from './routes/report.routes';
import achievementRouter from './routes/achievement.routes';

dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use('/api/auth', authRouter);
app.use('/api/entries', entryRouter);
app.use('/api/budgets', budgetRouter);
app.use('/api/reports', reportRouter);
app.use('/api/achievements', achievementRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
