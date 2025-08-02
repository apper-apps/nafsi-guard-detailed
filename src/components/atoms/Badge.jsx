import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "md",
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-900 border-gray-200",
    primary: "bg-primary-100 text-primary-900 border-primary-200",
    secondary: "bg-secondary-100 text-secondary-900 border-secondary-200",
    success: "bg-green-100 text-green-900 border-green-200",
    warning: "bg-amber-100 text-amber-900 border-amber-200",
    error: "bg-red-100 text-red-900 border-red-200",
    info: "bg-blue-100 text-blue-900 border-blue-200"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;