import api from "./api";

export const loginUser = async (username, password) => {

  return await api.post("/user/login", {
    username,
    password,
  });

};