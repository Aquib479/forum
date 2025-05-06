"use client";
import { ForumContext } from "@/context/forum.context";
import { useContext } from "react";

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error("useForumContext must be used within a ForumProvider");
  }
  return context;
};
