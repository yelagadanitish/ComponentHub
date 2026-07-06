import api from "./api";

export const getUserActivity = async () => {
  return await api.get("/user-activity");
};

export const addUserActivity = async (userName) => {
  return await api.post("/user-activity", {
    userName,
  });
};