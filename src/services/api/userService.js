import userData from "@/services/mockData/users.json";

const userService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...userData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const user = userData.find(u => u.Id === parseInt(id));
    if (!user) {
      throw new Error("User not found");
    }
    return { ...user };
  },

  async create(userData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...userData.map(u => u.Id), 0);
    const newUser = {
      Id: maxId + 1,
      ...userData,
      joinDate: new Date().toISOString(),
      streakDays: 0,
      totalUrges: 0
    };
    return { ...newUser };
  },

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const userIndex = userData.findIndex(u => u.Id === parseInt(id));
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    const updatedUser = {
      ...userData[userIndex],
      ...updateData
    };
    return { ...updatedUser };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const userIndex = userData.findIndex(u => u.Id === parseInt(id));
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    return { success: true };
  }
};

export default userService;