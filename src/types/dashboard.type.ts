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