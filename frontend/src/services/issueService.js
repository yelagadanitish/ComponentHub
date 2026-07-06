import api from "./api";

export const issueComponents = async (data) => {
  return await api.post("/issue", data);
};