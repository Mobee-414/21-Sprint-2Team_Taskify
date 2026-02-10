import axios from "./axios";

export const getMembers = async (dashboardId: number) => {
  return await axios.get("/members", {
    params: {
      dashboardId,
    },
  });
};
