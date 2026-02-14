import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { getDashboard, } from "@/api/dashboards.api";
import { Dashboard as DashboardType } from "@/types/dashboard.type";
interface ColumnType {
  id: number;
  title: string;
  count: number;
}

export function useDashboardData(dashboardId: number | null) {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardType | null>(
    null
  );

  useEffect(() => {
    if (!dashboardId) return;

    const fetchData = async () => {
      try {
        const columnRes = await axiosInstance.get(
          `/columns?dashboardId=${dashboardId}`
        );
        setColumns(columnRes.data.data);

        const dashboardRes = await getDashboard(dashboardId);
        setDashboardData(dashboardRes);
      } catch (error) {
        console.error("로딩 실패", error);
      }
    };

    fetchData();
  }, [dashboardId]);

  return {
    columns,
    dashboardData,
  };
}
