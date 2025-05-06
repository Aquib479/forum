import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./routes/auth.route";
import userProfileRoutes from "./routes/userProfile";
import forumRoutes from "./routes/forum.route";
import commentRoutes from './routes/comment.route';

// setup .env file configuration
dotenv.config();

// define app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userProfileRoutes);
app.use("/api/forums", forumRoutes);
app.use("/api/forums", commentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
