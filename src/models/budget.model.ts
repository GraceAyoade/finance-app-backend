import mongoose, { Schema } from "mongoose";
import { IBudget } from "../types/types";

export const budgetSchema = new Schema<IBudget>(
  {
    category: {
      type: String,
      default: "savings",
      enum: ["savings", "transportation", "food", "miscellaneous"],
    },
    spent: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.model<IBudget>("Budget", budgetSchema);
export default Budget;
