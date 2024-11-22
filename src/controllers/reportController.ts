import { Request, Response } from "express";
import Entry from "../models/entry.model";

export const getSummary = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const totalIncome = await Entry.aggregate([
      { $match: { userId, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Entry.aggregate([
      { $match: { userId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

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
