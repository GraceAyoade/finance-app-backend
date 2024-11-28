import { ObjectId, Types } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  nationality?: string;
  address?: string;
  achievements?: string;
}

export interface IEntry extends Document {
  userId: ObjectId;
  type: string;
  date: Date;
  amount: number;
  category: string;
  description: string;
  createdAt: Date;
  default: string;
}

export interface IBudget extends Document {
  userId: ObjectId;
  category: string;
  amount: number;
  date: Date;
  startDate: Date;
  endDate: Date;
}

export interface IAchievement extends Document {
  userId: ObjectId;
  title: string;
  dateEarned: Date;
}
