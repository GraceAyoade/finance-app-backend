import { NextFunction, Request, Response } from "express";
import Entry from "../models/entry.model";
import ErrorResponse from "../utils/errorResponse.utils";
import { Types } from "mongoose";

export const getCategorySpending = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = new Types.ObjectId(req.user.id);
  if (!userId) {
    return next(new ErrorResponse("User  not found!", 404));
  }
  try {
    const categorySpending = await Entry.aggregate([
      { $match: { userId, type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);
    res.status(200).json({
      message: "Category spending fetched successfully",
      data: categorySpending,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching category spending", error: err });
  }
};

export const getMonthlyCashFlow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = new Types.ObjectId(req.user.id);
  if (!userId) {
    return next(new ErrorResponse("User  not found!", 404));
  }
  try {
    const monthlyIncome = await Entry.aggregate([
      { $match: { userId, type: "income" } },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$date" } },
            category: "$category",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } }, // Sort by month ascending
    ]);
    const monthlyExpenses = await Entry.aggregate([
      { $match: { userId, type: "expense" } },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$date" } },
            category: "$category",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } }, // Sort by month ascending
    ]);

    // Create a map to store the totals for each month and category
    const cashFlow: any = {};
    // Process monthly income
    monthlyIncome.forEach((entry) => {
      const month = entry._id.month;
      const category = entry._id.category;
      if (!cashFlow[month]) {
        cashFlow[month] = {};
      }
      cashFlow[month][category] = { income: entry.total || 0, expense: 0 };
    });
    // Process monthly expenses
    monthlyExpenses.forEach((entry) => {
      const month = entry._id.month;
      const category = entry._id.category;
      if (!cashFlow[month]) {
        cashFlow[month] = {};
      }
      if (!cashFlow[month][category]) {
        cashFlow[month][category] = { income: 0, expense: 0 };
      }
      cashFlow[month][category].expense = entry.total || 0;
    });

    // Convert the cash flow object into an array for response
    const cashFlowArray = Object.keys(cashFlow).map((month) => ({
      month,
      categories: cashFlow[month],
    }));
    res.status(200).json({
      message: "Monthly cash flow fetched successfully",
      data: cashFlowArray,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching monthly cash flow", error: err });
  }
};

export const getSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = new Types.ObjectId(req.user.id);
  if (!userId) {
    return next(new ErrorResponse("User not found!", 404));
  }
  try {
    const totalIncome = await Entry.aggregate([
      { $match: { userId, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);
    if (totalIncome.length > 0) {
    } else {
      console.log("No income entries found.");
    }
    const totalExpense = await Entry.aggregate([
      { $match: { userId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log("SumExpense", totalExpense);
    const balance =
      (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0);

    res.status(200).json({
      message: "Summary fetched successfully",
      data: {
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        balance,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching summary", error: err });
  }
};

export const getExpenseBreakdown = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  if (!userId) {
    return next(new ErrorResponse("User  not found!", 404));
  }
  try {
    // Aggregate total expenses by category
    const categoryExpenses = await Entry.aggregate([
      { $match: { userId, type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }, // Sort by total spending in descending order
    ]);

    // Calculate total expenses for percentage calculation
    const totalExpenses = categoryExpenses.reduce(
      (sum, entry) => sum + entry.total,
      0
    );

    // Map to include percentage breakdown
    const breakdown = categoryExpenses.map((entry) => ({
      category: entry._id,
      total: entry.total,
      percentage:
        totalExpenses > 0
          ? ((entry.total / totalExpenses) * 100).toFixed(2)
          : 0, // Calculate percentage
    }));

    res.status(200).json({
      message: "Expense breakdown fetched successfully",
      data: breakdown,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching expense breakdown", error: err });
  }
};

// export const getCashFlow = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const userId = new Types.ObjectId(req.user.id);
//   if (!userId) {
//     return next(new ErrorResponse("User  not found!", 404));
//   }
  
//   try {
//     const monthlyData = await Entry.aggregate([
//       { $match: { userId } },
//       {
//         $group: {
//           _id: {
//             month: { $dateToString: { format: "%Y-%m", date: "$date" } },
//             type: "$type" // Group by type (income or expense)
//           },
//           total: { $sum: "$amount" },
//         },
//       },
//       { $sort: { "_id.month": 1 } }, // Sort by month ascending
//     ]);

//     // Create a map to store the totals for each month
//     const cashFlow: any = {};

//     // Process the aggregated results
//     monthlyData.forEach((entry) => {
//       const month = entry._id.month;
//       const type = entry._id.type; // 'income' or 'expense'
//       if (!cashFlow[month]) {
//         cashFlow[month] = { income: 0, expense: 0 };
//       }
//       if (type === "income") {
//         cashFlow[month].income += entry.total;
//       } else if (type === "expense") {
//         cashFlow[month].expense += entry.total;
//       }
//     });

//     // Convert the cash flow object into an array for response
//     const cashFlowArray = Object.keys(cashFlow).map((month) => ({
//       month,
//       income: cashFlow[month].income,
//       expense: cashFlow[month].expense,
//       balance: cashFlow[month].income - cashFlow[month].expense, // Calculate balance
//     }));

//     res.status(200).json({
//       message: "Monthly cash flow fetched successfully",
//       data: cashFlowArray,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error fetching monthly cash flow", error: err });
//   }
// };

export const getCashFlow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = new Types.ObjectId(req.user.id);
  if (!userId) {
    return next(new ErrorResponse("User  not found!", 404));
  }
  try {
    const monthlyData = await Entry.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$date" } },
            type: "$type" 
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } }, 
    ]);

    const cashFlow: any = {};

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Initialize cash flow for the last 6 months including the current month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-indexed

    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth - i + 12) % 12; // Wrap around for previous months
      const yearOffset = Math.floor((currentMonth - i) / 12);
      const monthKey = `${currentYear - yearOffset}-${(monthIndex + 1).toString().padStart(2, '0')}`;
      cashFlow[monthKey] = { income: 0, expense: 0 };
    }

    monthlyData.forEach((entry) => {
      const month = entry._id.month;
      const type = entry._id.type; 
      if (type === "income") {
        cashFlow[month].income += entry.total;
      } else if (type === "expense") {
        cashFlow[month].expense += entry.total;
      }
    });

    // Convert the cash flow object into an array for response
    const cashFlowArray = Object.keys(cashFlow).map((month) => {
      return {
        month: monthNames[parseInt(month.split('-')[1], 10) - 1],
        income: cashFlow[month].income,
        expense: cashFlow[month].expense,
      };
    });

    res.status(200).json({
      message: "Monthly cash flow fetched successfully",
      data: cashFlowArray,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching monthly cash flow", error: err });
  }
};