import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Slider = forwardRef(({ 
  className, 
  label,
  min = 0,
  max = 10,
  step = 1,
  value,
  onChange,
  ...props 
}, ref) => {
  const inputId = props.id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-3"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-primary-500/20",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600",
            "[&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:hover:bg-primary-700 [&::-webkit-slider-thumb]:transition-colors",
            "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
            "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-600 [&::-moz-range-thumb]:border-0",
            "[&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer",
            className
          )}
          {...props}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{min}</span>
          <span className="font-medium text-primary-600">{value}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;