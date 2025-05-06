// type User
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  forums: Forum[];
  comments: Comment[];
  forumLikes: ForumLike[];
  createdAt: Date;
};

// type forum
export type Forum = {
  id: string;
  title: string;
  description: string;
  tags?: any;
  createdAt: Date;
  userId: string;
  author: {
    id: string;
    name: string;
  };
  comments: Comment[];
  forumLikes: ForumLike[];
  likeCount: number;
  likedUserIds: string[];
};

// type comment
export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  forumId: string;
  user: User;
  forum: Forum;
};

// type forum like
export type ForumLike = {
  id: string;
  userId: string;
  forumId: string;
  createdAt: Date;
  user: User;
  forum: Forum;
};
