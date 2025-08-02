import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const TodaysProgress = ({ 
  urgeCount = 0, 
  cleanDay = true, 
  prayersMissed = 0,
  lastUrgeTime = null 
}) => {
  const getProgressMessage = () => {
    if (cleanDay && urgeCount === 0) {
      return "Perfect day so far! Keep it up!";
    }
    if (urgeCount > 0 && cleanDay) {
      return "Urges handled well today!";
    }
    return "Every moment is a new chance to start fresh";
  };

  const getProgressColor = () => {
    if (cleanDay && urgeCount === 0) return "success";
    if (urgeCount > 0 && urgeCount <= 3) return "warning";
    return "error";
  };

  return (
    <Card variant="elevated" className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg text-gray-800">
          Today's Progress
        </h3>
        <Badge variant={getProgressColor()}>
          {cleanDay ? "Clean Day" : "Recovery Day"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div
          className="text-center p-4 bg-gray-50 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center mb-2">
            <ApperIcon name="Target" size={20} className="text-primary-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">{urgeCount}</span>
          </div>
          <p className="text-sm text-gray-600 font-medium">Urges Logged</p>
        </motion.div>

        <motion.div
          className="text-center p-4 bg-gray-50 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center mb-2">
            <ApperIcon name="Moon" size={20} className="text-purple-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">{5 - prayersMissed}</span>
          </div>
          <p className="text-sm text-gray-600 font-medium">Prayers Done</p>
        </motion.div>
      </div>

      <motion.div
        className="bg-primary-50 rounded-xl p-4 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-primary-700 font-medium text-sm">
          {getProgressMessage()}
        </p>
        
        {lastUrgeTime && (
          <p className="text-xs text-gray-500 mt-2">
            Last urge: {new Date(lastUrgeTime).toLocaleTimeString()}
          </p>
        )}
      </motion.div>

      <motion.div
        className="absolute top-4 right-4 opacity-20"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <ApperIcon name="Heart" size={24} className="text-primary-600" />
      </motion.div>
    </Card>
  );
};

export default TodaysProgress;