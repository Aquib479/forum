import { Router } from "express";
import { registerUser, loginUser } from "../controller/auth.controller";

const router = Router();

// @route POST /api/auth/register
// desc register new user
// access Public
router.post('/register', registerUser);

// @route POST /api/auth/login
// desc Login user
// access Public
router.post("/login", loginUser);

export default router;