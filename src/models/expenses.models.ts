import mongoose, { Schema, Types } from "mongoose";
import { IExpense } from "../types/types";

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
const Expense = mongoose.model<IExpense>("Expense", expensesSchema);
export default Expense;
  