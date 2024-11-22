import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function authMiddleware(req: Request, res: Response, next: NextFunction): any {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid Token" });
  }
}

export default authMiddleware;
