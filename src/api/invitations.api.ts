import { InviteValues } from "@/hooks/useInvite";
import axios from "./axios";
import type { Invitation, InvitationsResponse } from "@/types/invitation.type";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

const nowIso = () => new Date().toISOString();

function makeMockInvitations(count = 30): Invitation[] {
  const inviters = [
    { nickname: "Alice", email: "test1@test.com", id: 1 },
    { nickname: "Bob", email: "test2@test.com", id: 2 },
    { nickname: "Charlie", email: "test3@test.com", id: 3 },
  ];

  const list: Invitation[] = [];

  for (let i = 0; i < count; i++) {
    const inviter = inviters[i % inviters.length];

    list.push({
      id: 1000 + i,
      inviter,
      teamId: "mock-team",
      dashboard: {
        id: 2000 + i,
        title: `초대된 대시보드 ${i + 1}`,
      },
      invitee: { nickname: "Me", email: "me@test.com", id: 999 },
      inviteAccepted: false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    });
  }

  return list;
}

let mockInvitations: Invitation[] = makeMockInvitations(30);

export async function getReceivedInvitations(params: {
  size?: number;
  cursorId?: number | null;
  title?: string;
}): Promise<InvitationsResponse> {
  const { size = 10, cursorId = 0, title } = params;

  if (USE_MOCK) {
    const keyword = (title ?? "").trim().toLowerCase();

    const filtered = keyword
      ? mockInvitations.filter((x) =>
          x.dashboard.title.toLowerCase().includes(keyword)
        )
      : mockInvitations;

    const start = Math.max(0, cursorId ?? 0);
    const slice = filtered.slice(start, start + size);
    const nextCursor = start + slice.length;

    return {
      cursorId: nextCursor < filtered.length ? nextCursor : null,
      invitations: slice,
    };
  }

  const res = await axios.get<InvitationsResponse>("/invitations", {
    params: {
      size,
      cursorId: cursorId ?? undefined,
      title: title?.trim() || undefined,
    },
  });

  return res.data;
}

export async function respondInvitation(params: {
  invitationId: number;
  inviteAccepted: boolean;
}): Promise<{ success: true }> {
  if (USE_MOCK) {
    mockInvitations = mockInvitations.filter(
      (x) => x.id !== params.invitationId
    );
    return { success: true };
  }

  await axios.put(`/invitations/${params.invitationId}`, {
    inviteAccepted: params.inviteAccepted,
  });

  return { success: true };
}

export async function postInvitations(dashboardId: number, data: InviteValues) {
  const res = await axios.post(`/dashboards/${dashboardId}/invitations`, data);
  return res.data;
}
