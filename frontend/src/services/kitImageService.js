import api from "./api";

export const uploadKitImage = async (image) => {

  const formData = new FormData();

  formData.append("image", image);

  const response = await api.post(
    "/kit-images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.imageUrl;
};