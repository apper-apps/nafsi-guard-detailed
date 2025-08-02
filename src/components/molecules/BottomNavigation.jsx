import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "home", path: "/", icon: "Home", label: "Home" },
    { id: "log", path: "/log", icon: "Plus", label: "Log Urge" },
    { id: "progress", path: "/progress", icon: "TrendingUp", label: "Progress" },
    { id: "emergency", path: "/emergency", icon: "Shield", label: "Emergency" },
    { id: "settings", path: "/settings", icon: "Settings", label: "Settings" }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isEmergency = item.id === "emergency";

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-h-[60px] relative",
                isActive && !isEmergency && "bg-primary-50",
                isEmergency && "bg-error/10 hover:bg-error/20",
                !isActive && !isEmergency && "hover:bg-gray-100"
              )}
              whileTap={{ scale: 0.95 }}
            >
              {isEmergency && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-error/5"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              <ApperIcon
                name={item.icon}
                size={isEmergency ? 24 : 20}
                className={cn(
                  "mb-1 transition-colors",
                  isActive && !isEmergency && "text-primary-600",
                  isEmergency && "text-error",
                  !isActive && !isEmergency && "text-gray-600"
                )}
              />
              
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive && !isEmergency && "text-primary-600",
                  isEmergency && "text-error font-semibold",
                  !isActive && !isEmergency && "text-gray-600"
                )}
              >
                {item.label}
              </span>

              {isActive && !isEmergency && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;