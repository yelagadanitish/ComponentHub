import api from "./api";

export const getComponents = async () => {
  return await api.get("/api/components");
};

export const addComponent = async (componentData) => {
  return await api.post("/api/components", componentData);
};