import axios from "./axios";

export type Dashboard = {
  id: number;
  title: string;
  color: string; 
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export type DashboardsResponse = {
  cursorId: number | null;
  totalCount: number;
  dashboards: Dashboard[];
};

export async function getDashboards(params: {
  navigationMethod: "pagination" | "infiniteScroll";
  page?: number;     
  size?: number;     
  cursorId?: number;
}): Promise<DashboardsResponse> {
  const { navigationMethod, page, size, cursorId } = params;

  const res = await axios.get<DashboardsResponse>("/dashboards", {
    params: {
      navigationMethod,
      ...(navigationMethod === "pagination"
        ? { page: page ?? 1, size: size ?? 10 }
        : { cursorId }),
    },
  });

  return res.data;
}

export async function getDashboardsPagination(params: {
  page: number;
  size: number;
}): Promise<DashboardsResponse> {
  return getDashboards({
    navigationMethod: "pagination",
    page: params.page,
    size: params.size,
  });
}

export async function createDashboard(params: {
  title: string;
  color: string;
}): Promise<Dashboard> {
  const res = await axios.post<Dashboard>("/dashboards", params);
  return res.data;
}

export async function getDashboard(dashboardId: number): Promise<Dashboard> {
  const res = await axios.get<Dashboard>(`/dashboards/${dashboardId}`);
  return res.data;
}

export async function updateDashboard(
  dashboardId: number,
  params: { title?: string; color?: string },
): Promise<Dashboard> {
  const res = await axios.put<Dashboard>(`/dashboards/${dashboardId}`, params);
  return res.data;
}

export async function deleteDashboard(dashboardId: number): Promise<void> {
  await axios.delete(`/dashboards/${dashboardId}`);
}
