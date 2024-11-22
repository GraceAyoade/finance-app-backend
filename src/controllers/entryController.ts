import { Request, Response } from "express";
import Entry from "../models/entry.model";

export const logEntry = async (req: Request, res: Response) => {
  const { type, date, amount, category, description } = req.body;
  const userId = req.user.id;

  try {
    const entry = await Entry.create({
      userId,
      type,
      date,
      amount,
      category,
      description,
    });
    res.status(201).json({ message: "Entry logged successfully", entry });
  } catch (err) {
    res.status(400).json({ message: "Error logging entry", error: err });
  }
};

export const getEntries = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const entries = await Entry.find({ userId }).sort({ date: -1 });
    res.status(200).json({ message: "Entries fetched successfully", entries });
  } catch (err) {
    res.status(500).json({ message: "Error fetching entries", error: err });
  }
};

export const editEntry = async (req: Request, res: Response): Promise<any> => {
  const { entryId } = req.params;
  const { type, date, amount, category, description } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      entryId,
      { type, date, amount, category, description },
      { new: true }
    );

    if (!updatedEntry)
      return res.status(404).json({ message: "Entry not found" });
    res
      .status(200)
      .json({ message: "Entry updated successfully", updatedEntry });
  } catch (err) {
    res.status(500).json({ message: "Error updating entry", error: err });
  }
};

export const deleteEntry = async (req: Request, res: Response): Promise<any> => {
  const { entryId } = req.params;

  try {
    const deletedEntry = await Entry.findByIdAndDelete(entryId);

    if (!deletedEntry)
      return res.status(404).json({ message: "Entry not found" });
    res
      .status(200)
      .json({ message: "Entry deleted successfully", deletedEntry });
  } catch (err) {
    res.status(500).json({ message: "Error deleting entry", error: err });
  }
};

// Edit/Delete handlers follow a similar pattern...
