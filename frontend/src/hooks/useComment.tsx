"use client";

import { CommentContext } from "@/context/comment.context";
import { useContext } from "react";

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("commentContext must be used within a CommentProvider");
  }
  return context;
};
