import mongoose, {Schema} from "mongoose";
import { IAchievement, IStreak } from "../types/types";

const achievementSchema = new Schema<IAchievement>({
    name:{
        type: String
    },
    description: {
        type: String
    },
    earned: {
        type: Boolean
    },
    dateEarned: {
        type: Number
    }
})
export const Achievement = mongoose.model<IAchievement>("Achievement", achievementSchema);

export const streakSchema = new Schema<IStreak>({
    currentStreak: {
        type: Number
    },
    longestStreak: {
        type: Number
    },
    lastUpdated: {
        type: Number
    }
})

export const Streak = mongoose.model<IStreak>("Streak", streakSchema);