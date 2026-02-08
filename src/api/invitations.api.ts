import axios from "./axios";
import { InviteValues } from "@/hooks/useInvite";

export const postInvitations = async (
  dashboardId: number,
  data: InviteValues,
) => {
  const response = await axios.post(
    `/dashboards/${dashboardId}/invitations`,
    data,
  );

  return response.data;
};
