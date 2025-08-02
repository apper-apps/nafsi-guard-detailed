import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProgressChart from "@/components/molecules/ProgressChart";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import progressService from "@/services/api/progressService";
import urgeService from "@/services/api/urgeService";

const ProgressPage = () => {
  const [progressData, setProgressData] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [progress, logs] = await Promise.all([
        progressService.getProgressHistory(1),
        urgeService.getAll()
      ]);

      setProgressData(progress);
      setRecentLogs(logs.slice(0, 5)); // Get recent 5 logs
    } catch (err) {
      setError("Failed to load progress data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <Loading type="progress" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <Error message={error} onRetry={loadData} />
        </div>
      </div>
    );
  }

  const getIntensityColor = (intensity) => {
    if (intensity <= 3) return "success";
    if (intensity <= 6) return "warning";
    return "error";
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <ApperIcon name="TrendingUp" size={24} className="text-primary-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Your Progress
          </h1>
          <p className="text-gray-600">
            Track your journey and celebrate improvements
          </p>
        </motion.div>

        {/* Progress Chart */}
        {progressData.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProgressChart data={progressData} />
          </motion.div>
        ) : (
          <Empty
            title="No Progress Data Yet"
            description="Start logging urges to see your progress chart"
            icon="BarChart3"
          />
        )}

        {/* Recent Logs */}
        {recentLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="elevated">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg text-gray-800">
                  Recent Logs
                </h3>
                <ApperIcon name="Clock" size={20} className="text-gray-600" />
              </div>

              <div className="space-y-3">
                {recentLogs.map((log, index) => (
                  <motion.div
                    key={log.Id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant={getIntensityColor(log.intensity)} size="sm">
                          Level {log.intensity}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatTime(log.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        {log.trigger}
                      </p>
                      {log.action && (
                        <p className="text-xs text-success">
                          Action: {log.action}
                        </p>
                      )}
                    </div>
                    <ApperIcon
                      name="Target"
                      size={16}
                      className="text-gray-400 flex-shrink-0"
                    />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Weekly Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="gradient">
            <div className="text-center">
              <h3 className="font-display font-semibold text-lg text-gray-800 mb-3">
                This Week's Insights
              </h3>
              
              {progressData.length >= 7 ? (
                <div className="space-y-2">
                  <p className="text-primary-700 font-medium">
                    You're making great progress! Keep up the excellent work.
                  </p>
                  <p className="text-sm text-gray-600">
                    Remember: every small step counts towards your goal.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-primary-700 font-medium">
                    Continue logging to see weekly insights here
                  </p>
                  <p className="text-sm text-gray-600">
                    Consistency is key to understanding your patterns
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-primary-200">
                <ApperIcon name="Heart" size={20} className="text-primary-600 mx-auto mb-2" />
                <p className="text-xs text-primary-600 font-medium">
                  "And Allah is with the patient ones" - Quran 2:153
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressPage;