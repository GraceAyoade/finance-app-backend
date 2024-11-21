import mongoose, { Schema } from "mongoose";
import { IIncomeCategory } from "../../types/types";

export const incomeCategorySchema = new Schema({
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
  )

  const IncomeCategory = mongoose.model<IIncomeCategory>("IncomeCategory", incomeCategorySchema);
  export default IncomeCategory;