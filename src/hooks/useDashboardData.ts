import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { getDashboard } from "@/api/dashboards.api";
import { Dashboard as DashboardType } from "@/types/dashboard.type";

interface ColumnType {
  id: number;
  title: string;
  count: number;
}

export function useDashboardData(dashboardId: number | null) {
  const {
    data: columns = [],
    isLoading: columnsLoading,
  } = useQuery<ColumnType[]>({
    queryKey: ["columns", dashboardId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/columns?dashboardId=${dashboardId}`
      );
      return res.data.data;
    },
    enabled: !!dashboardId,
  });

  const {
    data: dashboardData = null,
    isLoading: dashboardLoading,
  } = useQuery<DashboardType>({
    queryKey: ["dashboard", dashboardId],
    queryFn: () => getDashboard(dashboardId!),
    enabled: !!dashboardId,
  });

  return {
    columns,
    dashboardData,
    isLoading: columnsLoading || dashboardLoading,
  };
}
