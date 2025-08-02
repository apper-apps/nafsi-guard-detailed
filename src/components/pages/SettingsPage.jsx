import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    name: "Brother",
    prayerReminders: true,
    motivationNotifications: true,
    weeklyReports: true,
    accountabilityPartner: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleResetStreak = () => {
    if (window.confirm("Are you sure you want to reset your streak? This action cannot be undone.")) {
      toast.info("Streak reset. Remember, every day is a new opportunity!");
    }
  };

  const settingItems = [
    {
      id: "prayers",
      title: "Prayer Reminders",
      description: "Get notified for prayer times",
      icon: "Bell",
      type: "toggle",
      value: settings.prayerReminders,
      onChange: (value) => handleSettingChange("prayerReminders", value)
    },
    {
      id: "motivation",
      title: "Daily Motivation",
      description: "Receive Islamic quotes and reminders",
      icon: "Heart",
      type: "toggle",
      value: settings.motivationNotifications,
      onChange: (value) => handleSettingChange("motivationNotifications", value)
    },
    {
      id: "reports",
      title: "Weekly Reports",
      description: "Get progress summaries via email",
      icon: "FileText",
      type: "toggle",
      value: settings.weeklyReports,
      onChange: (value) => handleSettingChange("weeklyReports", value)
    }
  ];

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
            <ApperIcon name="Settings" size={24} className="text-primary-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Customize your experience
          </p>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="elevated">
            <div className="flex items-center mb-4">
              <ApperIcon name="User" size={20} className="text-primary-600 mr-3" />
              <h3 className="font-display font-semibold text-lg text-gray-800">
                Profile
              </h3>
            </div>
            
            <Input
              label="Display Name"
              value={settings.name}
              onChange={(e) => handleSettingChange("name", e.target.value)}
              placeholder="Enter your name"
            />
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="elevated">
            <div className="flex items-center mb-4">
              <ApperIcon name="Bell" size={20} className="text-primary-600 mr-3" />
              <h3 className="font-display font-semibold text-lg text-gray-800">
                Notifications
              </h3>
            </div>
            
            <div className="space-y-4">
              {settingItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <ApperIcon name={item.icon} size={16} className="text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => item.onChange(!item.value)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      item.value ? "bg-primary-600" : "bg-gray-300"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 rounded-full bg-white transition-transform",
                        item.value ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Accountability Partner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="elevated">
            <div className="flex items-center mb-4">
              <ApperIcon name="Users" size={20} className="text-primary-600 mr-3" />
              <h3 className="font-display font-semibold text-lg text-gray-800">
                Accountability
              </h3>
            </div>
            
            <Input
              label="Partner's Email (Optional)"
              type="email"
              value={settings.accountabilityPartner}
              onChange={(e) => handleSettingChange("accountabilityPartner", e.target.value)}
              placeholder="friend@example.com"
            />
            
            <p className="text-sm text-gray-600 mt-2">
              Your accountability partner will receive weekly progress updates
            </p>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="error">
            <div className="flex items-center mb-4">
              <ApperIcon name="AlertTriangle" size={20} className="text-error mr-3" />
              <h3 className="font-display font-semibold text-lg text-error">
                Danger Zone
              </h3>
            </div>
            
            <p className="text-sm text-red-800 mb-4">
              This action will reset your streak counter to zero. Only use this if you had a relapse.
            </p>
            
            <Button
              onClick={handleResetStreak}
              variant="danger"
              size="sm"
            >
              <ApperIcon name="RotateCcw" size={16} className="mr-2" />
              Reset Streak
            </Button>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleSave}
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
          >
            <ApperIcon name="Save" size={16} className="mr-2" />
            Save Settings
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;