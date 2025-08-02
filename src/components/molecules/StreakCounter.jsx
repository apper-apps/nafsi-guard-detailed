import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const StreakCounter = ({ streakDays = 0, lastCleanDate = null }) => {
  const getStreakMessage = (days) => {
    if (days === 0) return "Start your journey today";
    if (days === 1) return "Great start! Keep going";
    if (days < 7) return "Building momentum";
    if (days < 30) return "Strong progress!";
    if (days < 100) return "Excellent dedication!";
    return "Mashallah! Incredible discipline!";
  };

  const getFlameSize = (days) => {
    if (days < 7) return 48;
    if (days < 30) return 56;
    if (days < 100) return 64;
    return 72;
  };

  const getFlameColor = (days) => {
    if (days === 0) return "text-gray-400";
    if (days < 7) return "text-orange-500";
    if (days < 30) return "text-amber-500";
    if (days < 100) return "text-yellow-500";
    return "text-accent-500";
  };

  return (
    <Card variant="gradient" className="text-center relative overflow-hidden">
      <div className="islamic-pattern absolute inset-0 opacity-30" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg text-gray-800">
            Clean Streak
          </h3>
          <ApperIcon name="Award" size={24} className="text-primary-600" />
        </div>

        <motion.div
          className="flex items-center justify-center mb-4"
          animate={streakDays > 0 ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={cn("streak-flame", getFlameColor(streakDays))}>
            <ApperIcon 
              name={streakDays > 0 ? "Flame" : "Circle"} 
              size={getFlameSize(streakDays)} 
            />
          </div>
        </motion.div>

        <div className="text-center mb-4">
          <motion.div
            className="text-4xl font-display font-bold gradient-text mb-2"
            key={streakDays}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {streakDays}
          </motion.div>
          <p className="text-gray-600 font-medium">
            {streakDays === 1 ? "Day" : "Days"}
          </p>
        </div>

        <motion.p
          className="text-sm text-primary-700 font-medium"
          key={getStreakMessage(streakDays)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getStreakMessage(streakDays)}
        </motion.p>

        {lastCleanDate && streakDays > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            Since {new Date(lastCleanDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </Card>
  );
};

export default StreakCounter;