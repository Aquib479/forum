"use client";
import { profileDetail } from "@/services/api/user.service";
import React, { createContext, useEffect, useState } from "react";

interface ProfileContextProps {
  userDetail: any;
  userDetails: () => void;
}
export const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

interface ProfileProviderProps {
  children: React.ReactNode;
}
export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [userDetail, setUserDetail] = useState([]);

  // get user detail
  async function userDetails() {
    try {
      const response = await profileDetail();
      setUserDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    userDetails();
  }, []);
  return (
    <ProfileContext.Provider value={{ userDetail, userDetails }}>
      {children}
    </ProfileContext.Provider>
  );
};
