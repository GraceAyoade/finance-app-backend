import mongoose, { Schema, Types } from "mongoose";
import {IIncome } from "../types/types";
import IncomeCategory from "./categories/incomeCat.models";

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
    category: {
      type: Types.ObjectId,
      ref: IncomeCategory
    },
  },
  { timestamps: true }
);
const Income = mongoose.model<IIncome>("income", incomeSchema);
export default Income;

