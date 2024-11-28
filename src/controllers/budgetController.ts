import { NextFunction, Request, Response } from "express";
import Budget from "../models/budget.model";
import ErrorResponse from "../utils/errorResponse.utils";

export const setBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, amount, startDate, endDate } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    return next(new ErrorResponse("User not found!", 404));
  }

    // Validate startDate and endDate
    if (!startDate || !endDate) {
      return next(new ErrorResponse("Start date and end date are required!", 400));
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return next(new ErrorResponse("Invalid date format!", 400));
    }
  
    if (start >= end) {
      return next(new ErrorResponse("Start date must be before end date!", 400));
    }

  try {
    const budget = await Budget.findOneAndUpdate(
      { userId, category },
      { amount, startDate: start, endDate: end },
      { new: true, upsert: true }
    ).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ error: false, message: "Budget set successfully", data: budget });
  } catch (error) {
    next(new ErrorResponse("Error setting budget", 400));
  }
};

export const getBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  if (!userId) {
    return next(new ErrorResponse("User not found!", 404));
  }
  const { category, date } = req.query;
  const query: any = { userId };
  if (category) {
    query.category = category;
  }
  if (date) {
    query.date = date;
  }
  try {
    const budgets = await Budget.find(query);
    res.status(200).json({
      error: false,
      message: "Budgets fetched successfully",
      data: budgets,
    });
  } catch (error) {
    return next(new ErrorResponse("Error fetching budgets", 400));
  }
};

export const getBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;
  const id = req.params.id;

  if (!userId) {
    return next(new ErrorResponse("User  not found!", 404));
  }

  try {
    const budget = await Budget.findOne({ _id: id, userId });
    if (!budget) {
      return next(new ErrorResponse("Budget not found!", 404));
    }
    res.status(200).json({
      error: false,
      message: "Budget fetched successfully",
      data: budget,
    });
  } catch (error) {
    return next(new ErrorResponse("Error fetching budget", 400));
  }
};

export const deleteBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;
  const { category, date } = req.query;
  if (!userId) {
    return next(new ErrorResponse("User  not found!", 404));
  }
  const query: any = { userId };
  if (category) {
    query.category = category;
  }
  if (date) {
    query.date = date;
  }
  try {
    const budget = await Budget.findOneAndDelete(query);
    if (!budget) {
      return next(new ErrorResponse("Budget not found!", 404));
    }
    res.status(200).json({
      error: false,
      message: "Budget deleted successfully",
      data: null,
    });
  } catch (error) {
    return next(new ErrorResponse("Error deleting budget", 400));
  }
};

export const deleteAllBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    return next(new ErrorResponse("User  not found!", 404));
  }
  try {
    const result = await Budget.deleteMany({ userId });
    res.status(200).json({
      error: false,
      message: "All budgets deleted successfully",
      data: result,
    });
  } catch (error) {
    return next(new ErrorResponse("Error deleting budgets", 400));
  }
};

// export const deleteBudgets = async (req: Request, res: Response, next: NextFunction) => {
//   const userId = req.user?.id;
//   const { category, date } = req.query;
//   if (!userId) {
//     return next(new ErrorResponse("User  not found!", 404));
//   }
//   const query: any = { userId };
//   if (category) {
//     query.category = category;
//   }
//   if (date) {
//     const parsedDate = new Date(date);
//     if (isNaN(parsedDate.getTime())) {
//       return next(new ErrorResponse("Invalid date format!", 400));
//     }
//     query.date = { $gte: parsedDate }; // Assuming date is the start date for deletion
//   }
//   try {
//     const result = await Budget.deleteMany(query);
//     return res.status(200).json({
//       error: false,
//       message: "Budgets deleted successfully",
//       data: result
//     });
//   } catch (error) {
//     return next(new ErrorResponse('Error deleting budgets', 400));
//   }
// };
