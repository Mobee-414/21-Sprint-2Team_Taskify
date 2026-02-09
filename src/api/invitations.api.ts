import axios from "./axios";

export type Invitation = {
  id: number;
  inviter: { nickname: string; email: string; id: number };
  teamId: string;
  dashboard: { title: string; id: number };
  invitee: { nickname: string; email: string; id: number };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InvitationsResponse = {
  cursorId: number | null;
  invitations: Invitation[];
};

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

const nowIso = () => new Date().toISOString();

function makeMockInvitations(count = 30): Invitation[] {
  const inviters = [
    { nickname: "Alice", email: "alice@test.com", id: 1 },
    { nickname: "Bob", email: "bob@test.com", id: 2 },
    { nickname: "Charlie", email: "charlie@test.com", id: 3 },
    { nickname: "Daisy", email: "daisy@test.com", id: 4 },
    { nickname: "Ethan", email: "ethan@test.com", id: 5 },
    { nickname: "Fiona", email: "fiona@test.com", id: 6 },
  ];

  const topics = [
    "프로덕트 디자인",
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
  const { invitationId } = params;

  if (USE_MOCK) {
    mockInvitations = mockInvitations.filter((x) => x.id !== invitationId);
    return { success: true };
  }

  await axios.put(`/invitations/${invitationId}`, { inviteAccepted: params.inviteAccepted });
  return { success: true };
}

/**
 *   개발 편의용: 목업 초대장 추가 함수
 *   window.__addMockInvites?.(20)
 */
declare global {
  interface Window {
    __addMockInvites?: (count?: number) => void;
  }
}

if (USE_MOCK && typeof window !== "undefined") {
  window.__addMockInvites = (count = 20) => {
    const base = mockInvitations.length ? mockInvitations[mockInvitations.length - 1].id + 1 : 1000;
    const extra = makeMockInvitations(count).map((x, idx) => ({
      ...x,
      id: base + idx,
      dashboard: { ...x.dashboard, id: base + 1000 + idx },
    }));
    mockInvitations = [...mockInvitations, ...extra];
  };
}
