import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const QuickLogButton = () => {
  const navigate = useNavigate();

  const handleQuickLog = () => {
    navigate("/log");
  };

  return (
    <motion.div
      className="w-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={handleQuickLog}
        variant="accent"
        size="lg"
        className="w-full text-lg font-semibold py-4 shadow-xl"
      >
        <ApperIcon name="Plus" size={20} className="mr-3" />
        Log an Urge
      </Button>
    </motion.div>
  );
};

export default QuickLogButton;