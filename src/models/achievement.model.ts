import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    dateEarned: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Achievement = mongoose.model("Achievement", AchievementSchema);
export default Achievement;
