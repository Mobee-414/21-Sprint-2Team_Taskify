import { useEffect, useMemo, useState } from "react";
import { getDashboardsPagination } from "@/api/dashboards.api";
import type { Dashboard } from "@/types/dashboard.type";
import { useIsMountedRef } from "@/hooks/useIsMountedRef";

const SIZE = 5;

export function useMyDashboards(refreshKey: number) {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(false);

  const mountedRef = useIsMountedRef();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getDashboardsPagination({ page, size: SIZE });
        if (!mountedRef.current) return;

        setTotalCount(data.totalCount);
        setDashboards(data.dashboards);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    })();
  }, [page, refreshKey, mountedRef]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalCount / SIZE)),
    [totalCount]
  );

  return { page, setPage, totalPages, dashboards, loading };
}
