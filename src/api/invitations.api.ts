import { InviteValues } from "@/hooks/useInvite";
import axios from "./axios";
import type { InvitationsResponse } from "@/types/invitation.type";

export async function getReceivedInvitations(params: {
  size?: number;
  cursorId?: number | null;
  title?: string;
}): Promise<InvitationsResponse> {
  const { size = 10, cursorId, title } = params;

  const res = await axios.get<InvitationsResponse>("/invitations", {
    params: {
      size,
      cursorId: cursorId ?? undefined,
      title: title?.trim() || undefined,
    },
  });

  return res.data;
}

export async function getDashboardInvitations(params: {
  dashboardId: number;
  size?: number;
  cursorId?: number | null;
}): Promise<InvitationsResponse> {
  const { dashboardId, size = 10, cursorId } = params;

  const res = await axios.get<InvitationsResponse>(
    `/dashboards/${dashboardId}/invitations`,
    {
      params: {
        size,
        cursorId: cursorId ?? undefined,
      },
    },
  );

  return res.data;
}

export async function respondInvitation(params: {
  invitationId: number;
  inviteAccepted: boolean;
}): Promise<{ success: true }> {
  await axios.put(`/invitations/${params.invitationId}`, {
    inviteAccepted: params.inviteAccepted,
  });

  return { success: true };
}

export async function cancelDashboardInvitation(params: {
  dashboardId: number;
  invitationId: number;
}): Promise<{ success: true }> {
  const { dashboardId, invitationId } = params;

  await axios.delete(`/dashboards/${dashboardId}/invitations/${invitationId}`);

  return { success: true };
}

export async function postInvitations(dashboardId: number, data: InviteValues) {
  const res = await axios.post(`/dashboards/${dashboardId}/invitations`, data);

  return res;
}
