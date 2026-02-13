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
    { nickname: "Daisy", email: "test4@test.com", id: 4 },
    { nickname: "Ethan", email: "test5@test.com", id: 5 },
    { nickname: "Fiona", email: "test6@test.com", id: 6 },
  ];

  const topics = [
    "프로덕트 디자인 안녕하세요안녕하세요안녕하세요",
    "프론트엔드 개발",
    "스프린트 플래닝",
    "OKR 관리",
    "회의록",
    "중요 문서함",
    "버그 트래킹",
    "온보딩",
    "리서치",
    "QA",
  ];

  const list: Invitation[] = [];
  for (let i = 0; i < count; i += 1) {
    const inviter = inviters[i % inviters.length];
    const topic = topics[i % topics.length];

    list.push({
      id: 1000 + i,
      inviter,
      teamId: "mock",
      dashboard: {
        id: 2000 + i,
        title: `초대된 대시보드 ${String.fromCharCode(65 + (i % 26))} - ${topic} ${i + 1}`,
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
      ? mockInvitations.filter((x) => x.dashboard.title.toLowerCase().includes(keyword))
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
  const { invitationId } = params;

  if (USE_MOCK) {
    mockInvitations = mockInvitations.filter((x) => x.id !== invitationId);
    return { success: true };
  }

  await axios.put(`/invitations/${invitationId}`, { inviteAccepted: params.inviteAccepted });
  return { success: true };
}

export async function postInvitations(dashboardId: number, data: InviteValues): Promise<unknown> {
  const res = await axios.post(`/dashboards/${dashboardId}/invitations`, data);
  return res.data;
}

declare global {
  interface Window {
    __addMockInvites?: (count?: number) => void;
  }
}

if (USE_MOCK && typeof window !== "undefined") {
  window.__addMockInvites = (count = 20) => {
    const base = mockInvitations.length
      ? mockInvitations[mockInvitations.length - 1].id + 1
      : 1000;

    const extra = makeMockInvitations(count).map((x, idx) => ({
      ...x,
      id: base + idx,
      dashboard: { ...x.dashboard, id: base + 1000 + idx },
    }));

    mockInvitations = [...mockInvitations, ...extra];
  };
}
