import { Router } from "express";
import { getUserProfile } from "../controller/userProfile.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// @route   GET /api/user/profile
// desc     Get user detail with past comments and forums
// access   Private
router.get('/profile', authenticateToken, getUserProfile);

export default router;
