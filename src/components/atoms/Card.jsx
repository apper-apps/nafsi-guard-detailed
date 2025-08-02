import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children, 
  variant = "default",
  hover = false,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    elevated: "bg-white shadow-lg border border-gray-100",
    glass: "glass-effect shadow-xl",
    gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100 shadow-lg",
    success: "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg",
    warning: "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-lg",
    error: "bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 shadow-lg"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl p-6 transition-all duration-200",
        variants[variant],
        hover && "hover:shadow-xl hover:scale-[1.02] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;