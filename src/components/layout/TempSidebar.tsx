import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import CreateDashboardModal from "@/components/modals/CreateDashboardModal";
import { getDashboardsPagination } from "@/api/dashboards.api";
import type { Dashboard, DashboardsResponse } from "@/types/dashboard.type";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Tooltip from "../common/Tooltip";

const PAGE_SIZE = 10;

type SidebarProps = {
  refreshKey: number;
  onCreatedGlobal?: () => void;
};

export default function Sidebar({ refreshKey, onCreatedGlobal }: SidebarProps) {
  const router = useRouter();

  const [data, setData] = useState<DashboardsResponse>({
    cursorId: null,
    totalCount: 0,
    dashboards: [],
  });

  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const inFlightRef = useRef(false);
  const activeIdRef = useRef<number | null>(null);
  const pageRef = useRef(1);
  const hasInitializedActiveRef = useRef(false);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimer = useRef<number | null>(null);

  const handleSidebarScroll = () => {
    setIsScrolling(true);
    if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => setIsScrolling(false), 1000);
  };

  useEffect(() => {
    return () => {
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, []);

  const hasMore = useMemo(
    () => data.dashboards.length < data.totalCount,
    [data.dashboards.length, data.totalCount]
  );

  const fetchPage = useCallback(async (nextPage: number) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    setLoading(true);
    try {
      const res = await getDashboardsPagination({
        page: nextPage,
        size: PAGE_SIZE,
      });

      setData((prev) => ({
        cursorId: res.cursorId,
        totalCount: res.totalCount,
        dashboards:
          nextPage === 1
            ? res.dashboards
            : [...prev.dashboards, ...res.dashboards],
      }));

      setPage(nextPage);

      if (!hasInitializedActiveRef.current && res.dashboards.length > 0) {
        hasInitializedActiveRef.current = true;

        if (activeIdRef.current === null) {
          const firstId = res.dashboards[0].id;
          setActiveId(firstId);
        }
      }
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage, refreshKey]);

  const onReachEnd = useCallback(() => {
    if (!hasMore) return;
    if (inFlightRef.current) return;

    fetchPage(pageRef.current + 1);
  }, [fetchPage, hasMore]);

  const listScrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useInfiniteScroll(
    onReachEnd,
    !loading && hasMore,
    listScrollRef
  );

  const handleSelect = (id: number) => {
    setActiveId(id);
    router.push(`/dashboard/${id}`);
  };

  const handleCreated = (created: Dashboard) => {
    setIsCreateOpen(false);

    setData((prev) => ({
      ...prev,
      totalCount: prev.totalCount + 1,
      dashboards: [created, ...prev.dashboards],
    }));

    setActiveId(created.id);

    onCreatedGlobal?.();
  };

  return (
    <>
      <aside
        className="
          w-[300px] h-screen
          border-r border-gray-base
          bg-white
          flex flex-col
          pl-[24px] pr-[12px]
        "
      >
        <div className="pt-5 pb-15 flex items-center gap-2 shrink-0">
          <button
            onClick={() => router.push("/")}
            type="button"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image src="/icons/logo.svg" alt="로고" width={27} height={24} priority />
            <Image
              src="/icons/Taskify.svg"
              alt="Taskify"
              width={80}
              height={22}
              priority
            />
          </button>
        </div>

        <div className="flex items-center justify-between mb-[24px] shrink-0">
          <span className="text-xs font-semibold text-gray-dark">Dash Boards</span>

          <button
            onClick={() => setIsCreateOpen(true)}
            type="button"
            aria-label="대시보드 추가"
            className="hover:bg-gray-surface rounded cursor-pointer"
          >
            <Image src="/icons/add_box.svg" alt="add" width={20} height={20} />
          </button>
        </div>

        <div
          ref={listScrollRef}
          onScroll={handleSidebarScroll}
          className={[
            "flex-1 overflow-y-auto pb-4",
            "sidebar-scroll",
            isScrolling ? "is-scrolling" : "",
          ].join(" ")}
        >
          <ul className="space-y-1 pr-1">
            {data.dashboards.map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => handleSelect(d.id)}
                  type="button"
                  className={[
                    "flex w-full items-center h-[44px] gap-[16px] rounded-md transition-colors cursor-pointer px-2",
                    d.id === activeId
                      ? "bg-violet-light text-violet-main"
                      : "text-gray-medium hover:bg-gray-light",
                  ].join(" ")}
                >
                  <span
                    className="h-[8px] w-[8px] rounded-full shrink-0"
                    style={{ backgroundColor: d.color }}
                  />

                  <span className="flex items-center min-w-0 text-2lg font-medium text-current">
                    <Tooltip content={d.title} placement="right" onlyWhenTruncated>
                      <span className="truncate">{d.title}</span>
                    </Tooltip>

                    {d.createdByMe && (
                      <span className="ml-[10px] shrink-0">
                        <Image src="/icons/crown.svg" alt="owner" width={18} height={18} />
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div ref={sentinelRef} className="h-6" />

          {loading && <div className="py-2 text-xs text-gray-dark">불러오는 중...</div>}
        </div>
      </aside>

      {isCreateOpen && (
        <CreateDashboardModal
          onClose={() => setIsCreateOpen(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  );
}
