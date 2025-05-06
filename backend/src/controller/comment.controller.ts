import { PrismaClient } from "../../generated/prisma";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/async.middleware";
import ErrorResponse from "../utils/errorResponse";
import { sendNewCommentNotification } from "../utils/nodemailer";

const prisma = new PrismaClient();

// @route   GET /api/forums/:forumId/comments
// desc     Get all comments
// access   Public
export const getComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { forumId } = req.params;

    if (!forumId) {
      return res
        .status(400)
        .json({ success: false, message: "Forum ID is required" });
    }

    const allComments = await prisma.comment.findMany({
      where: {
        forumId: forumId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: allComments,
    });
  }
);

// @route   POST /api/forums/:forumId/comments
// desc     Create comment
// access   Private
export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { forumId } = req.params;
  const { content } = req.body;

  // create comment
  const comment = await prisma.comment.create({
    data: { content, userId, forumId },
  });

  // Fetch forum creator's emai
  const forum = await prisma.forum.findUnique({
    where: { id: forumId },
    include: {
      user: true,
    },
  });

  // Optional: Don’t send email to self
  if (forum && forum.user.id !== userId) {
    await sendNewCommentNotification(forum.user.email, forum.title, "comment");
  }

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// @route   POST /api/forums/:forumId/comments/:commentId
// desc     Delete comment
// access   Private
export const deleteComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.userId;
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment || comment.userId !== userId)
      return next(new ErrorResponse("Forbidden", 403));

    await prisma.comment.delete({ where: { id: commentId } });
    res.status(204).json({
      success: true,
      message: "Comment deleted successfully",
    });
  }
);
