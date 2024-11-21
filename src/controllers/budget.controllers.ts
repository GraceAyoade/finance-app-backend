import { Request, Response, NextFunction } from "express";
import Budget from "../models/budget.model";
import ErrorResponse from "../utils/errorResponse.utils";

export const createBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, description, limit, percentage } = req.body;
  if (!category || !description || !limit || !percentage) {
    return next(new ErrorResponse("Important data missing", 400));
  }
  try {
    const budget = await Budget.create({
      category,
      description,
      limit,
      percentage,
    });
    const newBudget = await budget.save();
    res.status(201).json({
      error: false,
      message: "Budget successfully created!",
      data: newBudget,
    });
  } catch (error) {
    next(error);
  }
};

export const getBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const budgets = await Budget.find({}).populate("category");
    res
      .status(200)
      .json({
        error: false,
        message: "Budgets retrieved successfully!",
        data: budgets,
      });
    if (!budgets) {
      return new ErrorResponse("Internal Server Error!", 500);
    }
  } catch (error) {
    next(error);
  }
};
