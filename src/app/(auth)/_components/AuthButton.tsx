import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "google";
  isLoading?: boolean;
  loadingText?: string;
}

export default function AuthButton({
  children,
  className,
  variant = "default",
  isLoading = false,
  loadingText,
  ...props
}: AuthButtonProps) {
  const baseStyles = "w-full h-16 rounded-full font-bold";

  const variantStyles = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    google: "bg-white hover:bg-gray-50 text-black border border-gray-300",
  };

  return (
    <Button
      className={cn(baseStyles, variantStyles[variant], className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
}
