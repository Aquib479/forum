"use client";

import React, { useEffect, useState } from "react";
import LoginPage from "../app/auth/login/page";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
}
