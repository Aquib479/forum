import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { createForum, deleteForum, getAllForums, updateForum } from '../controller/forum.controller';
import { likeForum } from "../controller/likeForum.controller";

const router = Router();

// @route   POST /api/forums
// desc     Create forum
// access   Private
router.post('/', authenticateToken, createForum);

// @route   GET /api/forums
// desc     Get all forums
// access   Public
router.get('/', getAllForums);

// @route   POST /api/forums/:forumId/like
// desc     Create forum
// access   Private
router.post('/:forumId/like', authenticateToken, likeForum);


// @route   PUT /api/forums/:id
// desc     Update forum
// access   Private
router.put('/:id', authenticateToken, updateForum);

// @route   DELETE /api/forums/:id
// desc     Delete forum
// access   Private
router.delete('/:id', authenticateToken, deleteForum);

export default router;
