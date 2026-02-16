import axiosInstance from "./axios";

export const getMembers = async (dashboardId: number) => {
  return await axiosInstance.get("/members", {
    params: {
      dashboardId,
    },
  });
};