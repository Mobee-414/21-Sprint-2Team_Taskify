import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { getDashboard } from "@/api/dashboards.api";
import { Dashboard as DashboardType } from "@/types/dashboard.type";

interface ColumnType {
  id: number;
  title: string;
  count: number;
}

export function useColumnsQuery(dashboardId: number | null) {
  return useQuery({
    queryKey: ["columns", dashboardId],
    enabled: !!dashboardId,
    queryFn: async (): Promise<ColumnType[]> => {
      const res = await axiosInstance.get(`/columns?dashboardId=${dashboardId}`);
      return res.data.data;
    },
  });
}

export function useDashboardQuery(dashboardId: number | null) {
  return useQuery({
    queryKey: ["dashboard", dashboardId],
    enabled: !!dashboardId,
    queryFn: async (): Promise<DashboardType> => {
      return await getDashboard(dashboardId as number);
    },
  });
}
