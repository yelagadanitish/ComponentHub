import api from "./api";

export const getComponents = async () => {
  return await api.get("/components");
};

export const addComponent = async (componentData) => {
  return await api.post("/components", componentData);
};