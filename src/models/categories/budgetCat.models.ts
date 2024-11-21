import mongoose, { Schema } from "mongoose";
import { IBudgetCategory } from "../../types/types";

export const budgetCategorySchema = new Schema<IBudgetCategory>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const BudgetCategory = mongoose.model<IBudgetCategory>(
  "BudgetCategory",
  budgetCategorySchema
);
export default BudgetCategory;
