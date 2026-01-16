import api from "./api";

export const getAssignedTask = async (workerId: number) => {
  const res = await api.get(`/worker/task/${workerId}`);
  return res.data;
};

export const completeTask = async (reportId: number) => {
  const res = await api.patch(`/worker/complete/${reportId}`);
  return res.data;
};
