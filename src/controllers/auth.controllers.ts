import { Request, Response, NextFunction } from "express";
import bcrypt, { genSalt } from "bcrypt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.utils";

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let { username, email, password } = req.body;
    const salt = await genSalt(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password, username });
    await newUser.save();
    // const datawithoutpw = (newUser as  Document).toObject();
    // delete datawithoutpw.password;
    // delete datawithoutpw.email;
    res.status(201).json({
      error: false,
      message: "User created successfully",
    });
    return;
  } catch (error) {
    console.log(error);
    next(error)
  }
};
export default registerUser;

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, username } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("User not found!", 500));
    }
    const isPassword = bcrypt.compare(password, user.password);
    if (!isPassword) {
      return next(new ErrorResponse("Invalid password!", 500));
    }
    // Generate JWT token and return response
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.send({ error: false, message: "logged in successfully", data:{authtoken: token, email, username} });
  } catch (error) {
    next(error);
  }
};
