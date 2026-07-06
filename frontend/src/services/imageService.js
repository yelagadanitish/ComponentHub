import api from "./api";

export const uploadImage = async (componentName, image) => {

  const formData = new FormData();

  formData.append("componentName", componentName);
  formData.append("image", image);

  return await api.post("/api/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

};

export const getImage = async (componentName) => {
  return await api.get(`/api/image/${componentName}`);
};