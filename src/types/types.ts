import { ObjectId } from "mongoose";

export interface IUser extends Document {
  fullname?: string;
  email: string;
  password: string;
  username?: string;
  phonenumber?: string;
  nationality?: string;
  address?: string;
  // _id?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIncome extends Document {
  user: ObjectId;
  amount: number;
  description?: string;
  category?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIncomeCategory extends Document {
  title: string;
  description: string;
}

export interface IExpense extends Document {
  user: ObjectId;
  amount: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBudget extends Document {
  category: ObjectId;
  limit: number;
  description: string;
  spent: number;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBudgetCategory extends Document {
  title: string;
  description: string;
}

export interface IReport extends Document {
  user: ObjectId;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryBreakdown: [];
  createdAt: Date;
  updatedAt: Date;
}

// interface for Gamification
export interface IAchievement extends Document {
  name: string;
  description: string;
  earned: boolean;
  dateEarned?: Date;
}

export interface IStreak extends Document {
  currentStreak: number;
  longestStreak: number;
  lastUpdated?: Date;
}
