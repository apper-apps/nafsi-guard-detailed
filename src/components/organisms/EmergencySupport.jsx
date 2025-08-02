import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const EmergencySupport = () => {
  const emergencyActions = [
    {
      id: "prayer",
      title: "Make Wudu & Pray",
      description: "Cleanse your body and soul",
      icon: "Moon",
      color: "primary",
      action: () => {
        toast.success("Excellent choice! Go make wudu and pray 2 rakah.");
      }
    },
    {
      id: "dhikr",
      title: "Dhikr & Istighfar",
      description: "Remember Allah abundantly",
      icon: "Heart",
      color: "success",
      action: () => {
        toast.success("Say 'Astaghfirullah' 100 times. Allah will cleanse your heart.");
      }
    },
    {
      id: "exercise",
      title: "Physical Exercise",
      description: "Channel your energy positively",
      icon: "Zap",
      color: "accent",
      action: () => {
        toast.success("Great! Do 20 push-ups or go for a quick walk.");
      }
    },
    {
      id: "cold",
      title: "Cold Shower",
      description: "Reset your mental state",
      icon: "Droplet",
      color: "info",
      action: () => {
        toast.success("Take a cold shower to reset your mind and body.");
      }
    },
    {
      id: "call",
      title: "Call Someone",
      description: "Connect with a trusted friend",
      icon: "Phone",
      color: "secondary",
      action: () => {
        toast.success("Call a friend, family member, or mentor for support.");
      }
    },
    {
      id: "quran",
      title: "Read Quran",
      description: "Find peace in Allah's words",
      icon: "BookOpen",
      color: "primary",
      action: () => {
        toast.success("Read Surah Al-Fatiha and any other surah you know.");
      }
    }
  ];

  const islamicReminders = [
    {
      text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
      translation: "And whoever fears Allah, He will make for him a way out",
      reference: "Quran 65:2"
    },
    {
      text: "Indeed, with hardship comes ease",
      translation: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      reference: "Quran 94:6"
    },
    {
      text: "Remember Allah much, so that you may be successful",
      translation: "وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ",
      reference: "Quran 62:10"
    }
  ];

  const breathingExercise = () => {
    toast.info("Breathe in for 4 seconds, hold for 7, exhale for 8. Repeat 4 times.");
  };

  return (
    <div className="space-y-6">
      {/* Emergency Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-error/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <ApperIcon name="Shield" size={32} className="text-error" />
        </div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
          Emergency Support
        </h1>
        <p className="text-gray-600">
          You are stronger than this urge. Choose an action below.
        </p>
      </motion.div>

      {/* Quick Breathing Exercise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="warning" className="text-center">
          <h3 className="font-display font-semibold text-lg mb-3 text-amber-900">
            First: Take a Deep Breath
          </h3>
          <Button
            onClick={breathingExercise}
            variant="accent"
            size="lg"
            className="mb-3"
          >
            <ApperIcon name="Wind" size={16} className="mr-2" />
            Start Breathing Exercise
          </Button>
          <p className="text-sm text-amber-800">
            4 seconds in, 7 seconds hold, 8 seconds out
          </p>
        </Card>
      </motion.div>

      {/* Emergency Actions Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {emergencyActions.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card
              variant="elevated"
              hover
              className="text-center h-full cursor-pointer"
              onClick={item.action}
            >
              <div className={cn(
                "w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center",
                item.color === "primary" && "bg-primary-100",
                item.color === "success" && "bg-green-100",
                item.color === "accent" && "bg-amber-100",
                item.color === "info" && "bg-blue-100",
                item.color === "secondary" && "bg-gray-100"
              )}>
                <ApperIcon
                  name={item.icon}
                  size={20}
                  className={cn(
                    item.color === "primary" && "text-primary-600",
                    item.color === "success" && "text-green-600",
                    item.color === "accent" && "text-amber-600",
                    item.color === "info" && "text-blue-600",
                    item.color === "secondary" && "text-gray-600"
                  )}
                />
              </div>
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-gray-600">{item.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Islamic Reminders */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="font-display font-semibold text-lg text-center text-gray-900 mb-4">
          Remember These Words
        </h3>
        
        {islamicReminders.map((reminder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <Card variant="gradient" className="text-center">
              <p className="font-arabic text-lg mb-2 text-primary-800">
                {reminder.text}
              </p>
              <p className="text-gray-700 font-medium mb-1">
                {reminder.translation}
              </p>
              <p className="text-sm text-primary-600 font-medium">
                — {reminder.reference}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EmergencySupport;