import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled = false,
  loading = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl focus:ring-primary-500 transform hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md focus:ring-primary-500",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-lg hover:shadow-xl focus:ring-accent-500 transform hover:scale-[1.02] active:scale-[0.98]",
    success: "bg-gradient-to-r from-success to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-success focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]",
    danger: "bg-gradient-to-r from-error to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-error focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]",
    ghost: "hover:bg-gray-100 text-gray-700 hover:text-gray-900 focus:ring-gray-500",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500 transform hover:scale-[1.02] active:scale-[0.98]"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[52px]",
    xl: "px-10 py-5 text-xl min-h-[60px]"
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;