import { Request, Response } from 'express';
import Budget from '../models/budget.model';

export const setBudget = async (req: Request, res: Response) => {
  const { category, amount } = req.body;
  const userId = req.user.id;

  try {
    const budget = await Budget.findOneAndUpdate(
      { userId, category },
      { amount },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Budget set successfully', budget });
  } catch (err) {
    res.status(500).json({ message: 'Error setting budget', error: err });
  }
};

export const getBudgets = async (req: Request, res: Response) => {
    const userId = req.user.id;
  
    try {
      const budgets = await Budget.find({ userId });
      res.status(200).json({ message: 'Budgets fetched successfully', budgets });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching budgets', error: err });
    }
  };
  
