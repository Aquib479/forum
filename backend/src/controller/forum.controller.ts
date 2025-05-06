import { PrismaClient } from "../../generated/prisma";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/async.middleware";
import ErrorResponse from "../utils/errorResponse";

const prisma = new PrismaClient();

// @route   POST /api/forums
// desc     Create forum
// access   Private
export const createForum = asyncHandler(async (req: Request, res: Response) => {
  // Get the id of loggedIn user
  const userId = (req as any).user.userId;

  const { title, description, tags } = req.body;

  // create forum
  const forum = await prisma.forum.create({
    data: { title, description, tags, userId },
  });
  res.status(201).json({
    success: true,
    data: forum,
  });
});

// @route   GET /api/forums
// desc     Get all forum
// access   Public
export const getAllForums = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const forums = await prisma.forum.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, email: true, name: true },
          },
          comments: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              user: {
                select: { id: true, email: true, name: true },
              },
            },
          },
          forumLikes: {
            select: { userId: true },
          },
          _count: {
            select: { forumLikes: true },
          },
        },
      });

      const formatted = forums.map((forum: any) => ({
        id: forum.id,
        title: forum.title,
        description: forum.description,
        tags: forum.tags,
        createdAt: forum.createdAt,
        author: forum.user,
        likeCount: forum._count.forumLikes,
        likedUserIds: forum.forumLikes.map((like: any) => like.userId),
        comments: forum.comments.map((comment: any) => ({
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          user: comment.user,
        })),
      }));

      res.status(200).json({ success: true, data: formatted });
    } catch (err) {
      return next(new ErrorResponse("Failed to fetch forums", 404));
    }
  }
);

// @route   PUT /api/forums/:id
// desc     Update forum
// access   Private
export const updateForum = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const forum = await prisma.forum.findUnique({ where: { id } });
    if (!forum || forum.userId !== userId)
      return next(new ErrorResponse("Forbidden", 403));

    const udpated = await prisma.forum.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json({
      success: true,
      data: udpated,
    });
  }
);

// @route   DELETE /api/forums/:id
// desc     Delete forum
// access   Private
export const deleteForum = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    const forum = await prisma.forum.findUnique({ where: { id } });
    if (!forum || forum.userId !== userId)
      return next(new ErrorResponse("Forbidden", 403));

    await prisma.forum.delete({ where: { id } });
    res.status(204).json({
      success: true,
      message: "Forum deleted successfully",
    });
  }
);
