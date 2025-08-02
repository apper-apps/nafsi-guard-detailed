import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UrgeLogForm from "@/components/molecules/UrgeLogForm";
import ApperIcon from "@/components/ApperIcon";

const LogPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Navigate back to home after successful log
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <ApperIcon name="Target" size={24} className="text-primary-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Log Your Urge
          </h1>
          <p className="text-gray-600">
            Acknowledging urges is the first step to overcoming them
          </p>
        </motion.div>

        {/* Log Form */}
        <UrgeLogForm onSuccess={handleSuccess} />

        {/* Encouragement Note */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-success/10 rounded-xl p-4">
            <ApperIcon name="Heart" size={20} className="text-success mx-auto mb-2" />
            <p className="text-sm text-success font-medium">
              Every urge you log is a step towards better self-control.
              <br />
              Allah sees your effort and will reward your struggle.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LogPage;