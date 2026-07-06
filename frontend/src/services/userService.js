import api from "./api";

export const loginUser = async (username, password) => {

  return await api.post("/api/user/login", {
    username,
    password,
  });

};

