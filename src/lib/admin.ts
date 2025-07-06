import api from "./api";

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const getAllReports = async () => {
  const res = await api.get("/admin/reports");
  return res.data;
};

export const assignTaskToWorker = async (reportId: number, workerId: number) => {
  const res = await api.post("/admin/assign", { reportId, workerId });
  return res.data;
};
