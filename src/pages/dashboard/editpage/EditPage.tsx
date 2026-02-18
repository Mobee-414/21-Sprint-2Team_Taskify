"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Header from "@/pages/dashboard/Header";
import Sidebar from "@/components/layout/TempSidebar";
import InviteModal from "@/components/modals/InviteModal";

import DashboardInfoSection from "./component/DashboardInfoSection";
import MembersSection from "./component/MembersSection";
import InvitationsSection from "./component/InvitationsSection";

import {
  getMembersByTeam,
  deleteMemberById,
  type Member as ApiMember,
} from "@/api/members.v2.api";

import type { Member as HeaderMember } from "@/hooks/useDashboardMembers";
import type { Invitation } from "@/types/invitation.type";
import type { Dashboard } from "@/types/dashboard.type";

import {
  getDashboard,
  updateDashboard,
  deleteDashboard,
} from "@/api/dashboards.api";

type FormValues = { title: string };

const AVATAR_COLORS = [
  "#FFC85A",
  "#FDD446",
  "#9DD7ED",
  "#C4B1A2",
  "#F4D7DA",
  "#A3C4A2",
];

const getAvatarColor = (nickname: string) => {
  const sum = Array.from(nickname).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
};

export default function EditPage() {
  const router = useRouter();

  const dashboardId = useMemo(() => {
    const idParam = router.query.id;
    const raw = Array.isArray(idParam) ? idParam[0] : idParam;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }, [router.query.id]);

  const { control, handleSubmit, watch, reset, getValues } = useForm<FormValues>({
    defaultValues: { title: "" },
    mode: "onChange",
  });

  const titleValue = (watch("title") ?? "").trim();

  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState("#7AC555");
  const [updating, setUpdating] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;
    if (!dashboardId) return;

    let alive = true;

    (async () => {
      setDashboardLoading(true);
      setDashboardError(null);
      try {
        const data = await getDashboard(dashboardId);
        if (!alive) return;

        setDashboard(data);
        setSelectedColor(data.color);
        reset({ title: data.title });
      } catch {
        if (!alive) return;
        setDashboardError("대시보드 정보를 불러오지 못했습니다.");
      } finally {
        if (alive) setDashboardLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [router.isReady, dashboardId, reset]);

  const canUpdate = useMemo(() => {
    if (!dashboard) return false;
    if (updating || dashboardLoading) return false;
    if (!titleValue) return false;

    const titleChanged = titleValue !== (dashboard.title ?? "");
    const colorChanged = selectedColor !== (dashboard.color ?? "");

    return titleChanged || colorChanged;
  }, [dashboard, titleValue, selectedColor, updating, dashboardLoading]);

  const onSubmitUpdate = useCallback(
    async (values?: FormValues) => {
      if (!dashboardId) return;

      const rawTitle = values?.title ?? getValues("title");
      const nextTitle = rawTitle.trim();
      if (!nextTitle) return;

      setUpdating(true);
      try {
        const updated = await updateDashboard(dashboardId, {
          title: nextTitle,
          color: selectedColor,
        });

        setDashboard(updated);
        setSelectedColor(updated.color);
        reset({ title: updated.title });

        setRefreshKey((k) => k + 1);
      } finally {
        setUpdating(false);
      }
    },
    [dashboardId, selectedColor, reset, getValues]
  );

  const MEMBERS_SIZE = 4;

  const [members, setMembers] = useState<ApiMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersPage, setMembersPage] = useState(1);
  const [membersTotalCount, setMembersTotalCount] = useState(0);

  const membersTotalPages = useMemo(
    () => Math.max(1, Math.ceil(membersTotalCount / MEMBERS_SIZE)),
    [membersTotalCount]
  );

  useEffect(() => {
    if (!router.isReady) return;
    if (!dashboardId) return;

    let alive = true;

    (async () => {
      setMembersLoading(true);
      try {
        const data = await getMembersByTeam({
          dashboardId,
          page: membersPage,
          size: MEMBERS_SIZE,
        });

        if (!alive) return;
        setMembers(data.members);
        setMembersTotalCount(data.totalCount);
      } catch {
        if (!alive) return;
        setMembers([]);
        setMembersTotalCount(0);
      } finally {
        if (alive) setMembersLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [router.isReady, dashboardId, membersPage]);

  useEffect(() => {
    setMembersPage((p) => Math.min(p, membersTotalPages));
  }, [membersTotalPages]);

  const onPrevMembers = useCallback(() => {
    setMembersPage((p) => Math.max(1, p - 1));
  }, []);

  const onNextMembers = useCallback(() => {
    setMembersPage((p) => Math.min(membersTotalPages, p + 1));
  }, [membersTotalPages]);

  const onDeleteMember = useCallback(
    async (memberId: number) => {
      if (!dashboardId) return;

      await deleteMemberById(memberId);

      const nextPage =
        members.length === 1 && membersPage > 1 ? membersPage - 1 : membersPage;

      const data = await getMembersByTeam({
        dashboardId,
        page: nextPage,
        size: MEMBERS_SIZE,
      });

      setMembersPage(nextPage);
      setMembers(data.members);
      setMembersTotalCount(data.totalCount);
    },
    [dashboardId, members.length, membersPage]
  );

  const headerMembers: HeaderMember[] = useMemo(
    () =>
      members.map(
        (m) =>
          ({
            id: m.id,
            nickname: m.nickname,
            profileImageUrl: m.profileImageUrl,
            avatarColor: getAvatarColor(m.nickname),
          } as HeaderMember)
      ),
    [members]
  );

  const [invites, setInvites] = useState<Invitation[]>([]);
  const [invitesLoading, setInvitesLoading] = useState(false);
  const [invitesHasNext] = useState(false);

  const fetchInvites = useCallback(async () => {}, []);

  const [inviteOpen, setInviteOpen] = useState(false);
  const onOpenInvite = useCallback(() => setInviteOpen(true), []);
  const onCloseInvite = useCallback(() => setInviteOpen(false), []);

  const onCancelInvite = useCallback(async (invitationId: number) => {
    setInvites((prev) => prev.filter((x) => x.id !== invitationId));
  }, []);

  const handleGoBack = useCallback(() => {
    const from = router.query.from;
    const target = typeof from === "string" && from.startsWith("/") ? from : null;

    if (target) {
      router.replace(target);
      return;
    }

    if (!dashboardId) return;
    router.replace(`/dashboard/${dashboardId}`);
  }, [router, dashboardId]);

  const onDeleteDashboard = useCallback(async () => {
    if (!dashboardId) return;

    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    await deleteDashboard(dashboardId);

    router.replace("/mydashboard");
  }, [dashboardId, router]);

  if (!router.isReady) return null;

  if (!dashboardId) {
    return (
      <div className="min-h-screen bg-gray-bg flex items-center justify-center">
        <p className="text-black-medium">잘못된 접근입니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-bg">
        <aside className="shrink-0 w-[67px] tablet:w-[160px] desktop:w-[300px]">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sidebar refreshKey={refreshKey} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-col">
            <Header
              title={watch("title") ?? ""}
              isOwner={true}
              members={headerMembers}
              totalCount={membersTotalCount}
              onEditClick={() => router.push(`/dashboard/editpage/${dashboardId}`)}
            />

            <main className="min-w-0">
              <div className="mt-[20px] px-[12px] tablet:px-[12px] desktop:px-0 desktop:ml-[40px]">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="flex items-center gap-[6px]"
                >
                  <Image
                    src="/icons/arrow_forward.svg"
                    alt="돌아가기"
                    width={20}
                    height={20}
                  />
                  <span className="text-lg font-medium text-black-medium">
                    돌아가기
                  </span>
                </button>
              </div>

              {dashboardError && (
                <div className="mt-[12px] px-[12px] tablet:px-[12px] desktop:px-0 desktop:ml-[40px] text-red-500 text-sm">
                  {dashboardError}
                </div>
              )}

              <div className="mt-[34px] px-[12px] tablet:px-[12px] desktop:px-0 desktop:ml-[40px] flex flex-col gap-[16px] min-w-0">
                <DashboardInfoSection
                  control={control}
                  handleSubmit={handleSubmit}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                  onSubmitUpdate={onSubmitUpdate}
                  canUpdate={canUpdate}
                  updating={updating || dashboardLoading}
                />

                <MembersSection
                  members={members}
                  loading={membersLoading}
                  page={membersPage}
                  totalPages={membersTotalPages}
                  onPrev={onPrevMembers}
                  onNext={onNextMembers}
                  onDelete={onDeleteMember}
                />

                <InvitationsSection
                  invites={invites}
                  loading={invitesLoading}
                  hasNext={invitesHasNext}
                  onLoadMore={fetchInvites}
                  onOpenInvite={onOpenInvite}
                  onCancel={onCancelInvite}
                />

                <button
                  type="button"
                  onClick={onDeleteDashboard}
                  className="
                    mt-[8px] mb-[57px]
                    h-[52px] w-[284px]
                    rounded-[8px]
                    bg-white
                    text-lg font-medium text-black-medium
                    border border-gray-base
                    hover:bg-gray-surface
                  "
                >
                  대시보드 삭제하기
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>

      <InviteModal isOpen={inviteOpen} onClose={onCloseInvite} />
    </>
  );
}
