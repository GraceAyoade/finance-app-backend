import mongoose, { Schema, Types } from "mongoose";
import { IExpense, IIncome } from "../types/types";

export const incomeSchema = new Schema<IIncome>(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export const Income = mongoose.model<IIncome>("income", incomeSchema);

export const expensesSchema = new Schema<IExpense>(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export const Expense = mongoose.model<IExpense>("Expense", expensesSchema);
