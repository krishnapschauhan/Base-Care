import api from "./api";

export const submitReport = async (data: {
  description: string;
  location: string;
}) => {
  const res = await api.post("/reports", data);
  return res.data;
};

export const getMyReports = async () => {
  const res = await api.get("/reports");
  return res.data;
};
