import { Request, Response, NextFunction } from "express";
import IncomeCategory from "../../models/categories/incomeCat.models";
import Income from "../../models/income.model";
import ErrorResponse from "../../utils/errorResponse.utils";

export const createIncomeCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await Income.findById(req.body._id);
    if (!user) {
      return next(new ErrorResponse("User unable to create category!", 404));
    }
    const { title, description } = req.body;
    let newIncomeCategory = new IncomeCategory({
      title,
      description,
      userId: user?._id,
    });
    await newIncomeCategory.save();
    res.status(201).json({
      error: false,
      message: "New Income Category saved successfully!",
      data: newIncomeCategory,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getIncomeCategories = async()=>{

}

export const getIncomeCategory = async (req: Request, res: Response, next: NextFunction) => {}
export const updateIncomeCategory = async()=>{

}

export const deleteIncomeCategories = async()=>{

}
export const deleteIncomeCategory= async()=>{

}
