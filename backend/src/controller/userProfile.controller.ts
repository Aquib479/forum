import { PrismaClient } from "../../generated/prisma";
import { Request, Response } from "express";
import asyncHandler from "../middleware/async.middleware";

const prisma = new PrismaClient();

// @route   GET /api/user/profile
// desc     Get user detail with past comments and forums
// access   Private
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        forums: true,
        comments: true,
      },
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);
