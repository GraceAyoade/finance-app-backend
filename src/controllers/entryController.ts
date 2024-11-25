import { Request, Response, NextFunction } from "express";
import Entry from "../models/entry.model";
import ErrorResponse from "../utils/errorResponse.utils";

export const logEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  if (!userId) {
    return next(
      new ErrorResponse("cannot log entry! User ID is missing.", 404)
    );
  }
  const { type, date, amount, category, description } = req.body;
  if (!type || !date || !amount || !category || !description) {
    return next(new ErrorResponse("All fields are required!", 400));
  }
    
  try {
    const entry = await Entry.create({
      userId,
      type,
      date,
      amount,
      category,
      description,
    });
    res.status(201).json({
      error: false,
      message: "Entry logged successfully",
      data: entry,
    });
  } catch (error) {
    next(error);
  }
};

export const getEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    return next(new ErrorResponse("User ID is required!", 400));
  }
  try {
    const entries = await Entry.find({ userId }).sort({ date: -1 });
    if (!entries.length) {
      return next(new ErrorResponse("No entries found!", 404));
    }
    res.status(200).json({
      error: false,
      message: "Entries fetched successfully",
      data: entries,
    });
  } catch (error) {
    next(error);
  }
};

export const getEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;
  const { entryId } = req.params;
  if (!userId) {
    return next(new ErrorResponse("User  ID is required!", 400));
  }
  try {
    const entry = await Entry.findOne({ _id: entryId, userId });
    if (!entry) {
      return next(new ErrorResponse("Entry not found!", 404));
    }
    res.status(200).json({
      error: false,
      message: "Entry fetched successfully",
      data: entry,
    });
  } catch (error) {
    next(error);
  }
};

export const editEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { entryId } = req.params;
  const { type, date, amount, category, description } = req.body;
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      entryId,
      { type, date, amount, category, description },
      { new: true }
    );
    if (!updatedEntry) {
      return next(new ErrorResponse("Entry not found!", 404));
    }
    res.status(200).json({
      error: false,
      message: "Entry updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    next(new ErrorResponse("Entry not found!", 404));
  }
};

export const deleteEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { entryId } = req.params;
  try {
    const deletedEntry = await Entry.findByIdAndDelete(entryId);
    if (!deletedEntry) return next(new ErrorResponse("Entry not found!", 404));
    res
      .status(200)
      .json({
        error: false,
        message: "Entry deleted successfully",
        data: null,
      });
  } catch (error) {
    next(new ErrorResponse("Error deleting entry!", 500));
  }
};

export const deleteEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  try {
    const deletedEntries = await Entry.deleteMany({ userId });
    if (deletedEntries.deletedCount === 0)
      return next(new ErrorResponse("No entries found for this user!", 404));
    res
      .status(200)
      .json({
        error: false,
        message: "All entries deleted successfully",
        data: null,
      });
  } catch (error) {
    next(new ErrorResponse("Error deleting entries!", 500));
  }
};
