import axiosInstance from "./axios";

export const createColumn = async (title: string, dashboardId: number) => {
  const response = await axiosInstance.post(`/columns`, {
    title,
    dashboardId,
  });
  return response.data;
};

export const updateColumn = async (columnId: number, title: string) => {
  const response = await axiosInstance.put(`/columns/${columnId}`, {
    title,
  });
  return response.data;
};
