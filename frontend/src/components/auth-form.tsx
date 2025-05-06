import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface FormProps {
  title: string;
  description: string;
  formBody: React.ReactNode;
  className?: string;
}

export function AuthForm({
  title,
  description,
  formBody,
  className,
}: FormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{formBody}</CardContent>
      </Card>
    </div>
  );
}
