import api from "./api";

export const getRecentActivity = async () => {
  return await api.get("/api/activity/recent");
};