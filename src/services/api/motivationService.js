import motivationData from "@/services/mockData/dailyMotivation.json";

const motivationService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...motivationData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const motivation = motivationData.find(m => m.Id === parseInt(id));
    if (!motivation) {
      throw new Error("Motivation not found");
    }
    return { ...motivation };
  },

  async getTodaysMotivation() {
    await new Promise(resolve => setTimeout(resolve, 200));
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % motivationData.length;
    
    return {
      ...motivationData[index],
      dateShown: today.toISOString()
    };
  },

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return motivationData.filter(m => m.category.toLowerCase() === category.toLowerCase());
  },

  async create(motivationItem) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...motivationData.map(m => m.Id), 0);
    const newMotivation = {
      Id: maxId + 1,
      ...motivationItem,
      dateShown: new Date().toISOString()
    };
    return { ...newMotivation };
  },

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const motivationIndex = motivationData.findIndex(m => m.Id === parseInt(id));
    if (motivationIndex === -1) {
      throw new Error("Motivation not found");
    }
    
    const updatedMotivation = {
      ...motivationData[motivationIndex],
      ...updateData
    };
    return { ...updatedMotivation };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const motivationIndex = motivationData.findIndex(m => m.Id === parseInt(id));
    if (motivationIndex === -1) {
      throw new Error("Motivation not found");
    }
    return { success: true };
  }
};

export default motivationService;