import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const DailyMotivation = ({ content, source, category }) => {
  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case "quran": return "BookOpen";
      case "hadith": return "Scroll";
      case "dua": return "Heart";
      default: return "Star";
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case "quran": return "text-green-600";
      case "hadith": return "text-blue-600";
      case "dua": return "text-purple-600";
      default: return "text-primary-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="gradient" className="relative overflow-hidden">
        <div className="islamic-pattern absolute inset-0 opacity-20" />
        
        <div className="relative z-10">
          <div className="flex items-start space-x-4">
            <motion.div
              className={cn(
                "flex-shrink-0 p-3 rounded-xl",
                "bg-white/50 backdrop-blur-sm shadow-lg"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ApperIcon
                name={getCategoryIcon(category)}
                size={24}
                className={getCategoryColor(category)}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="mb-3">
                <span className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                  "bg-white/60 backdrop-blur-sm",
                  getCategoryColor(category)
                )}>
                  Daily {category || "Motivation"}
                </span>
              </div>

              <blockquote className="text-gray-800 font-medium leading-relaxed mb-4 text-base">
                "{content}"
              </blockquote>

              {source && (
                <cite className="text-sm text-primary-700 font-medium not-italic">
                  — {source}
                </cite>
              )}
            </div>
          </div>

          <motion.div
            className="absolute top-4 right-4 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <ApperIcon name="Star" size={32} className="text-accent-500" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DailyMotivation;