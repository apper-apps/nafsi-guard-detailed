import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Slider from "@/components/atoms/Slider";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import urgeService from "@/services/api/urgeService";
import { cn } from "@/lib/utils";

const UrgeLogForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    intensity: 5,
    trigger: "",
    action: "",
    note: ""
  });
  const [loading, setLoading] = useState(false);

  const triggerOptions = [
    "Boredom", "Stress", "Loneliness", "Social Media", 
    "Internet Browsing", "Late Night", "Tiredness", "Other"
  ];

  const actionOptions = [
    "Prayer/Dhikr", "Exercise", "Read Quran", "Call Friend",
    "Take Shower", "Go Outside", "Deep Breathing", "Other"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newLog = {
        timestamp: new Date().toISOString(),
        intensity: parseInt(formData.intensity),
        trigger: formData.trigger,
        action: formData.action,
        note: formData.note
      };

      await urgeService.create(newLog);
      toast.success("Urge logged successfully! Stay strong!");
      
      // Reset form
      setFormData({
        intensity: 5,
        trigger: "",
        action: "",
        note: ""
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to log urge. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="elevated">
        <div className="flex items-center mb-6">
          <ApperIcon name="Target" size={24} className="text-primary-600 mr-3" />
          <h2 className="font-display font-semibold text-xl text-gray-900">
            Log Your Urge
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Slider
            label="Intensity Level (1-10)"
            min={1}
            max={10}
            value={formData.intensity}
            onChange={(value) => handleInputChange("intensity", value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What triggered this urge?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {triggerOptions.map((trigger) => (
                <motion.button
                  key={trigger}
                  type="button"
                  onClick={() => handleInputChange("trigger", trigger)}
                  className={cn(
                    "p-3 text-sm rounded-xl border transition-all duration-200",
                    formData.trigger === trigger
                      ? "bg-primary-600 text-white border-primary-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary-300"
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  {trigger}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What action did you take (or plan to take)?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {actionOptions.map((action) => (
                <motion.button
                  key={action}
                  type="button"
                  onClick={() => handleInputChange("action", action)}
                  className={cn(
                    "p-3 text-sm rounded-xl border transition-all duration-200",
                    formData.action === action
                      ? "bg-success text-white border-success"
                      : "bg-white text-gray-700 border-gray-200 hover:border-success/30"
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </div>

          <Input
            label="Additional Notes (Optional)"
            type="text"
            placeholder="How are you feeling? Any insights?"
            value={formData.note}
            onChange={(e) => handleInputChange("note", e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
          >
            <ApperIcon name="Check" size={16} className="mr-2" />
            Log Urge
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default UrgeLogForm;