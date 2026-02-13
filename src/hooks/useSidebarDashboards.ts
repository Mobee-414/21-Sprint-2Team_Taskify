import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getDashboardsPagination } from "@/api/dashboards.api";
import type { Dashboard, DashboardsResponse } from "@/types/dashboard.type";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const PAGE_SIZE = 10;

export function useSidebarDashboards(params: {
  refreshKey: number;
  onCreatedGlobal?: () => void;
}) {
  const { refreshKey, onCreatedGlobal } = params;

  const [data, setData] = useState<DashboardsResponse>({
    cursorId: null,
    totalCount: 0,
    dashboards: [],
  });

  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState<number | null>(null);
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
        if (activeIdRef.current === null) setActiveId(res.dashboards[0].id);
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

  const handleCreated = useCallback(
    (created: Dashboard) => {
      setData((prev) => ({
        ...prev,
        totalCount: prev.totalCount + 1,
        dashboards: [created, ...prev.dashboards],
      }));
      setActiveId(created.id);
      onCreatedGlobal?.();
    },
    [onCreatedGlobal]
  );

  return {
    data,
    activeId,
    setActiveId,
    loading,
    listScrollRef,
    sentinelRef,
    handleCreated,
  };
}
