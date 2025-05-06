import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new ErrorResponse("Not authorized to access", 401));
  }

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    (req as any).user = decode;
    next();
  } catch (error) {
    return next(new ErrorResponse("Invalid token", 403));
  }
};
