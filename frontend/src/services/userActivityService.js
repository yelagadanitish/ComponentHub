import api from "./api";

export const getUserActivity = async () => {
  return await api.get("/api/user-activity");
};

export const addUserActivity = async (userName) => {
  return await api.post("/api/user-activity", {
    userName,
  });
};