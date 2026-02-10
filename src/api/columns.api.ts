import axios from "./axios";

export const getColumns = async (dashboardId: number) => {
  return await axios.get("/columns", {
    params: {
      dashboardId,
    },
  });
};
