import mongoose, { Schema } from "mongoose";
import { IReport } from "../types/types";

const reportSchema = new Schema<IReport>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    totalIncome: {
      type: Number,
    },
    totalExpenses: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    categoryBreakdown: {
      // type: ICategoryBreakdown[]
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model<IReport>("Report", reportSchema);
export default Report;
