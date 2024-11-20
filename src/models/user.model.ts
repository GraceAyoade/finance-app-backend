import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";

export const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
    phonenumber: {
      type: String,
      required: false,
    },
    nationality: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
