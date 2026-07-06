import api from "./api";

export const createKit = (data) =>
  api.post("/api/kits", data);

export const getAllKits = () =>
  api.get("/api/kits");

export const getKit = (id) =>
  api.get(`/api/kits/${id}`);

export const updateKit = (id, data) =>
  api.put(`/api/kits/${id}`, data);

export const deleteKit = (id) =>
  api.delete(`/api/kits/${id}`);
