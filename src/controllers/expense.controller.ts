import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Expense from "../models/expenses.models";
import ErrorResponse from "../utils/errorResponse.utils";

export const logExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return next(new ErrorResponse("income unavailable!", 404));
    }
    const { description, amount, date } = req.body;
    let newIncome = new Expense({
      description,
      amount,
      date,
      userId: user?._id,
    });
    await newIncome.save();
    res.status(201).json({
      error: false,
      message: "Income saved successfully",
      data: newIncome,
    });
  } catch (error) {
    next(error);
  }
};

export const listExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { date, category, amount } = req.query;
    const query: any = {};
    // Query based on filter parameters
    if (date) {
      query.createdAt = { $gte: Date };
    }
    if (category) {
      query.category = category;
    }
    if (amount) {
      query.amount = { $gte: amount };
    }
    const expenses = await Expense.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      error: false,
      message: "expenses fetched successfully",
      data: expenses,
    });
    if (!expenses) {
      return next(new ErrorResponse("No expenses found!", 404));
    }
  } catch (error) {
    next(error);
  }
};

export const editExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const edit = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(200)
      .json({
        error: false,
        message: "expense updated successfully!",
        data: edit,
      });
    if (!edit) {
      return next(new ErrorResponse("No expense found for update!", 404));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const expenseList = await Expense.findById(id);
    if (!expenseList) {
      return next(new ErrorResponse("expense not found!", 404));
    }
    await Expense.deleteOne({ _id: id });
    res
      .status(200)
      .json({ error: false, message: "Expense deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
    console.log(error);
  }
};
