"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { Forum } from "@/types";
import {
  addForum,
  getForums,
  updateForum,
  deleteForum,
  LikeForum,
} from "@/services/api/forum.service";

interface addForumData {
  title: string;
  description: string;
  tags: any;
}

interface ForumContextType {
  forums: Forum[];
  filteredForums: Forum[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addNewForum: (data: addForumData) => void;
  getAllForums: () => void;
  updateOneForum: (forumId: string, data: Partial<addForumData>) => void;
  deleteOneForum: (forumId: string) => void;
  likeForum: (forumId: string) => void;
}

export const ForumContext = createContext<ForumContextType | undefined>(
  undefined
);

interface ForumProviderProps {
  children: ReactNode;
}

export const ForumProvider = ({ children }: ForumProviderProps) => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const addNewForum = async (data: addForumData) => {
    try {
      const response = await addForum(data);
      setForums(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllForums = async () => {
    try {
      const response = await getForums();
      setForums(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOneForum = async (
    forumId: string,
    data: Partial<addForumData>
  ) => {
    try {
      const response = await updateForum(forumId, data);
      setForums(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOneForum = async (forumId: string) => {
    try {
      await deleteForum(forumId);
      getAllForums();
    } catch (error) {
      console.log(error);
    }
  };

  const likeForum = async (forumId: string) => {
    try {
      await LikeForum(forumId);
      getAllForums();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredForums = forums.filter((forum) =>
    forum.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllForums();
  }, []);

  return (
    <ForumContext.Provider
      value={{
        forums,
        filteredForums,
        searchTerm,
        setSearchTerm,
        addNewForum,
        getAllForums,
        updateOneForum,
        deleteOneForum,
        likeForum,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};
