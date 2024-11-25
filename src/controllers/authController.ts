import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { generateToken } from "../utils/jwtUtils";
import User from "../models/user.model";
import userMapper from "../mappers/userMapper";
import ErrorResponse from "../utils/errorResponse.utils";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password, nationality } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      nationality,
    });
    if (!user) {
      return next(new ErrorResponse("Error registering user", 404));
    }
    res.status(201).json({
      error: false,
      message: "User registered successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req: Request, res: Response, next:NextFunction) :Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user){
      return next(new ErrorResponse('User not found!', 404))
    } 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return next(new ErrorResponse('invalid credentials', 404))
    }
    const token = generateToken(user._id);
    res.status(200).json({ error: false, message: "Login successful", data: {authToken: token, user: userMapper(user) }});
  } catch (error) {
   next(new ErrorResponse ("Error logging in!", 404))
  }
}; 
