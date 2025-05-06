"use client";

import {
  getForumComments,
  addComment,
  deleteComment,
} from "@/services/api/comment.service";
import { Comment } from "@/types";
import { createContext, ReactNode, useState } from "react";

interface addCommonData {
  content: string;
}

interface CommentContextType {
  getAllComments: (forumId: string) => void;
  allComments: Comment[];
  loading: boolean;
  addNewComment: (forumId: string, data: addCommonData) => void;
  deleteOneComment: (forumId: string, commentId: string) => void;
}

export const CommentContext = createContext<CommentContextType | undefined>(
  undefined
);

interface CommentProviderProps {
  children: ReactNode;
}

export const CommentProvider = ({ children }: CommentProviderProps) => {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // get all coments
  const getAllComments = async (forumId: string) => {
    setLoading(true);
    try {
      const response = await getForumComments(forumId);
      setAllComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to add comment:", error);
      setLoading(false);
    }
  };

  // add new comments
  const addNewComment = async (forumId: string, data: addCommonData) => {
    setLoading(true);
    try {
      await addComment(forumId, data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to add comment:", error);
      setLoading(false);
    }
  };

  // delete the comment
  const deleteOneComment = async (forumId: string, commentId: string) => {
    setLoading(true);
    try {
      await deleteComment(forumId, commentId);
      setLoading(false);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      setLoading(false);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        getAllComments,
        allComments,
        loading,
        addNewComment,
        deleteOneComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
