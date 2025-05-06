import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controller/comment.controller";

const router = Router();

// @route   GET /api/forums/:forumId/comments
// desc     get all comments
// access   Public
router.get("/:forumId/comments", getComments);

// @route   POST /api/forums/:forumId/comments
// desc     Create comment
// access   Private
router.post("/:forumId/comments", authenticateToken, addComment);

// @route   POST /api/forums/:forumId/comments/:commentId
// desc     Delete comment
// access   Private
router.delete(
  "/:forumId/comments/:commentId",
  authenticateToken,
  deleteComment
);

export default router;
