import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(400).json({
      error: true,
      message: "Please provide token, authorization denied",
      daat: null,
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
      userId: string;
    };
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: true, message: "invalid token", data: null });
  }
};

export default authMiddleware;