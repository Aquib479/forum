"use client";

import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }
  return context;
};
