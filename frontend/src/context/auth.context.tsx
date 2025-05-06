"use client";

import { loginUser, registerUser } from "@/services/api/auth.service";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface loginData {
  email: string;
  password: string;
}

interface registerData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User | string;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userData: loginData) => void;
  register: (userData: registerData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      setIsAuthenticated(true);
      setUser(token);
    }
  }, []);

  // login user
  async function login(userData: loginData) {
    setLoading(true);
    try {
      const response = await loginUser(userData);
      setLoading(false);
      if (response.success) {
        setUser(response.token);
        if (typeof window !== "undefined") {
          localStorage.setItem("token", response.token);
          localStorage.setItem("userId", response.data.userId);
        }
        setIsAuthenticated(true);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // register user
  async function register(userData: registerData) {
    setLoading(true);
    try {
      const response = await registerUser(userData);
      setLoading(false);
      if (response.success) router.push("/auth/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // logout user
  async function logout() {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    setUser("");
    setIsAuthenticated(false);
    router.push("/auth/login");
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
