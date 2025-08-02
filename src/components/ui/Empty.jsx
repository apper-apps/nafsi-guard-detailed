import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No data found",
  description = "There's nothing here yet",
  action,
  actionLabel = "Get Started",
  icon = "Package"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-primary-50 rounded-full p-6 mb-6">
        <ApperIcon 
          name={icon} 
          size={48} 
          className="text-primary-600" 
        />
      </div>
      
      <h3 className="font-display font-semibold text-xl text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
        {description}
      </p>
      
      {action && (
        <Button 
          onClick={action}
          variant="primary"
          size="lg"
          className="min-w-[140px]"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;