import { PrismaClient } from "../../generated/prisma";
import { Request, Response } from "express";
import asyncHandler from "../middleware/async.middleware";
import { sendNewCommentNotification } from "../utils/nodemailer";

const prisma = new PrismaClient();

// @route   POST /api/forums/:forumId/like
// desc     Create forum
// access   Private
export const likeForum = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { forumId } = req.params;

    const forum = await prisma.forum.findUnique({
        where: { id: forumId },
        include: { user: true }
    });

    if (!forum) {
        return res.status(404).json({ success: false, message: "Forum not found" });
    }

    await prisma.forumLike.upsert({
        where: {
            userId_forumId: {
                userId,
                forumId
            }
        },
        update: {},
        create: {
            userId,
            forumId
        }
    });

    // Optional: Don’t send email to self
    if (forum && forum.user.id !== userId) {
        await sendNewCommentNotification(forum.user.email, forum.title, 'like');
    }

    res.status(200).json({
        success: true,
        message: "Liked"
    });
});
