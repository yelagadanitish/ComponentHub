import api from "./api";

export const createKit = (data) =>
  api.post("/kits", data);

export const getAllKits = () =>
  api.get("/kits");

export const getKit = (id) =>
  api.get(`/kits/${id}`);

export const updateKit = (id, data) =>
  api.put(`/kits/${id}`, data);

export const deleteKit = (id) =>
  api.delete(`/kits/${id}`);