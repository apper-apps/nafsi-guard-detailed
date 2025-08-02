import React from "react";
import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "streak") {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="h-20 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded-lg w-16 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (type === "motivation") {
    return (
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "progress") {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="h-6 bg-gray-200 rounded-lg w-40 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-2 bg-gray-200 rounded-full flex-1 mx-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary-600 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;