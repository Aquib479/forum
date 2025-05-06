"use client";
import { ProfileContext } from "@/context/profile.context";
import { useContext } from "react";

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("ProfileContext must be used within a ProfileProvider");
  }
  return context;
};
