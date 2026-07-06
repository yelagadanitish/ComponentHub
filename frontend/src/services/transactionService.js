import api from "./api";

export const getTransactions = async () => {
  return await api.get("/api/transaction");
};