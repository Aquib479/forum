import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/async.middleware";
import ErrorResponse from "../utils/errorResponse";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();
const Jwt_secret = process.env.JWT_SECRET as string;

// @route POST /api/auth/register
// desc register new user
// access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      // Check for previous existence
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser)
        return next(new ErrorResponse("User already exist's", 400));

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      // send Token Response
      sendTokenResponse(user, 200, res);
    } catch (error: any) {
      return next(new ErrorResponse("Failed to register user", 404));
    }
  }
);

// @route POST /api/login/login
// @desc Login user
// access Public
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // validate email & password
    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide correct an email and password", 400)
      );
    }

    // check for user existence in database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return next(new ErrorResponse("Invalid credentials", 400));

    // compare user password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return next(new ErrorResponse("Invalid credentials", 400));

    sendTokenResponse(user, 200, res);
  }
);

// get token and send response
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = jwt.sign({ userId: user.id }, Jwt_secret, { expiresIn: "30d" });
  res.status(statusCode).json({
    success: true,
    token,
    data: { userId: user.id },
  });
};
