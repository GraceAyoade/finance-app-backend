import mongoose, { Schema, Types } from "mongoose";
import { IBudget } from "../types/types";

export const budgetSchema = new Schema<IBudget>(
  {
    category: {
      type: Types.ObjectId,
      ref: "BudgetCategory",
      required: true,
    },
    description: {
      type: String,
    },
    spent: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.model<IBudget>("Budget", budgetSchema);
export default Budget;
