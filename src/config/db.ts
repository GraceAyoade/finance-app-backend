import mongoose from "mongoose";
import colors from "colors";

// connecting to Database
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log(colors.cyan.bold.underline("MongoDB connected successfully"));
  } catch (error) {
    console.log(colors.red.bold.underline("Error! connection failed!"));
  }
};

export default connectDB;
