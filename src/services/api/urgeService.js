import urgeData from "@/services/mockData/urgeLogs.json";

const urgeService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...urgeData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const urge = urgeData.find(u => u.Id === parseInt(id));
    if (!urge) {
      throw new Error("Urge log not found");
    }
    return { ...urge };
  },

  async create(urgeLogData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...urgeData.map(u => u.Id), 0);
    const newUrgeLog = {
      Id: maxId + 1,
      userId: "1",
      ...urgeLogData
    };
    urgeData.unshift(newUrgeLog); // Add to beginning for latest first
    return { ...newUrgeLog };
  },

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const urgeIndex = urgeData.findIndex(u => u.Id === parseInt(id));
    if (urgeIndex === -1) {
      throw new Error("Urge log not found");
    }
    
    const updatedUrge = {
      ...urgeData[urgeIndex],
      ...updateData
    };
    return { ...updatedUrge };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const urgeIndex = urgeData.findIndex(u => u.Id === parseInt(id));
    if (urgeIndex === -1) {
      throw new Error("Urge log not found");
    }
    return { success: true };
  },

  async getByDateRange(startDate, endDate) {
    await new Promise(resolve => setTimeout(resolve, 350));
    return urgeData.filter(urge => {
      const urgeDate = new Date(urge.timestamp);
      return urgeDate >= new Date(startDate) && urgeDate <= new Date(endDate);
    });
  },

  async getTodaysUrges() {
    await new Promise(resolve => setTimeout(resolve, 250));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return urgeData.filter(urge => {
      const urgeDate = new Date(urge.timestamp);
      return urgeDate >= today && urgeDate < tomorrow;
    });
  }
};

export default urgeService;