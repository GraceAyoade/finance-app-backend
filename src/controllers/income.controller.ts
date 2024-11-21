import { Request, Response, NextFunction, query } from "express";

import User from "../models/user.model";
import Income from "../models/income.model";
import ErrorResponse from "../utils/errorResponse.utils";

export const logIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    const { description, amount, date } = req.body;
    let newIncome = new Income({
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
    if(!newIncome){
      return next(new ErrorResponse("Failed to save income", 500));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const listIncomes = async (
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
      query.category = { $gte: category };
    }
    if (amount) {
      query.amount = { $gte: amount };
    }
    const incomes = await Income.find(query).sort({ createdAt: -1 });
    res
      .status(200)
      .json({
        error: false,
        message: "Incomes retrieved successfully!",
        data: incomes,
      });
    if (!incomes) {
      return next(new ErrorResponse("not found!", 500));
    }
  } catch (error) {
    next();
  }
};

export const editIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const edit = await Income.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({error: false, message:"Income updated successfully", data:edit});
    if(!id){
      return next(new ErrorResponse("cannot edit this field!", 500));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const incomeList = await Income.findById(id);
    if (!incomeList) {
      return next(new ErrorResponse("Note not found!", 400));
    }
    await Income.deleteOne({ _id: id });
    res
      .status(200)
      .json({
        error: false,
        message: "income successfully deleted",
        data: null,
      });
  } catch (error) {
    res.status(500).json({ message: "server error" });
    console.log(error);
  }
};
