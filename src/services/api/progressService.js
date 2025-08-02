import progressData from "@/services/mockData/progress.json";
import urgeService from "./urgeService";

const progressService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...progressData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const progress = progressData.find(p => p.Id === parseInt(id));
    if (!progress) {
      throw new Error("Progress not found");
    }
    return { ...progress };
  },

  async getProgressHistory(userId, days = 14) {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    // Generate last 14 days of progress data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days - 1));

    const history = [];
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      
      // Find existing progress or create default
      const existingProgress = progressData.find(p => 
        p.userId === userId.toString() && p.date === dateStr
      );

      if (existingProgress) {
        history.push({ ...existingProgress });
      } else {
        // Generate realistic mock data
        const urgeCount = Math.floor(Math.random() * 4); // 0-3 urges per day
        const cleanDay = urgeCount === 0;
        const prayersMissed = Math.floor(Math.random() * 2); // 0-1 prayers missed
        
        history.push({
          userId: userId.toString(),
          date: dateStr,
          urgeCount,
          cleanDay,
          prayersMissed
        });
      }
    }

    return history.sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  async getTodayProgress(userId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const today = new Date().toISOString().split("T")[0];
    const todayProgress = progressData.find(p => 
      p.userId === userId.toString() && p.date === today
    );

    if (todayProgress) {
      return { ...todayProgress };
    }

    // Get today's urges to calculate progress
    try {
      const todayUrges = await urgeService.getTodaysUrges();
      const urgeCount = todayUrges.length;
      const cleanDay = urgeCount === 0;
      const lastUrgeTime = todayUrges.length > 0 ? todayUrges[0].timestamp : null;

      return {
        userId: userId.toString(),
        date: today,
        urgeCount,
        cleanDay,
        prayersMissed: 0, // Default
        lastUrgeTime
      };
    } catch (error) {
      // Return default if urge service fails
      return {
        userId: userId.toString(),
        date: today,
        urgeCount: 0,
        cleanDay: true,
        prayersMissed: 0,
        lastUrgeTime: null
      };
    }
  },

  async create(progressItem) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...progressData.map(p => p.Id), 0);
    const newProgress = {
      Id: maxId + 1,
      ...progressItem
    };
    return { ...newProgress };
  },

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const progressIndex = progressData.findIndex(p => p.Id === parseInt(id));
    if (progressIndex === -1) {
      throw new Error("Progress not found");
    }
    
    const updatedProgress = {
      ...progressData[progressIndex],
      ...updateData
    };
    return { ...updatedProgress };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const progressIndex = progressData.findIndex(p => p.Id === parseInt(id));
    if (progressIndex === -1) {
      throw new Error("Progress not found");
    }
    return { success: true };
  }
};

export default progressService;