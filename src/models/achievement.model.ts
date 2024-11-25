import mongoose, { Schema, Types } from "mongoose";
import { IAchievement } from "../types/types";

const AchievementSchema = new Schema<IAchievement>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    dateEarned: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Achievement = mongoose.model<IAchievement>("Achievement", AchievementSchema);
export default Achievement;
