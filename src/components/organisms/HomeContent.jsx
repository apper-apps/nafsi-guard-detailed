import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StreakCounter from "@/components/molecules/StreakCounter";
import DailyMotivation from "@/components/molecules/DailyMotivation";
import QuickLogButton from "@/components/molecules/QuickLogButton";
import TodaysProgress from "@/components/molecules/TodaysProgress";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import userService from "@/services/api/userService";
import motivationService from "@/services/api/motivationService";
import progressService from "@/services/api/progressService";

const HomeContent = () => {
  const [user, setUser] = useState(null);
  const [motivation, setMotivation] = useState(null);
  const [todayProgress, setTodayProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [userData, motivationData, progressData] = await Promise.all([
        userService.getById(1), // Default user
        motivationService.getTodaysMotivation(),
        progressService.getTodayProgress(1)
      ]);

      setUser(userData);
      setMotivation(motivationData);
      setTodayProgress(progressData);
    } catch (err) {
      setError("Failed to load data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Loading type="streak" />
        <Loading type="motivation" />
        <Loading type="default" />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Greeting Section */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
          Assalamu Alaikum, {user?.name || "Brother"}
        </h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString("en-US", { 
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          })}
        </p>
      </motion.div>

      {/* Streak Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <StreakCounter
          streakDays={user?.streakDays || 0}
          lastCleanDate={user?.lastCleanDate}
        />
      </motion.div>

      {/* Quick Log Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <QuickLogButton />
      </motion.div>

      {/* Today's Progress */}
      {todayProgress && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TodaysProgress
            urgeCount={todayProgress.urgeCount}
            cleanDay={todayProgress.cleanDay}
            prayersMissed={todayProgress.prayersMissed}
            lastUrgeTime={todayProgress.lastUrgeTime}
          />
        </motion.div>
      )}

      {/* Daily Motivation */}
      {motivation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <DailyMotivation
            content={motivation.content}
            source={motivation.source}
            category={motivation.category}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default HomeContent;