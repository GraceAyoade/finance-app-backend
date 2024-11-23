import mongoose from "mongoose";
import { IUser } from "../types/types";

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nationality: {type: String},
    address: {type: String},
    achievements: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
