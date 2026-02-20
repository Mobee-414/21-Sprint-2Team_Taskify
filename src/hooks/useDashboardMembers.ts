import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/api/members.api";

export interface Member {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  avatarColor: string;
  email?: string;
  isOwner?: boolean;
}

export function useDashboardMembers(dashboardId: number | undefined) {
  return useQuery({
    queryKey: ["members", dashboardId],
    enabled: !!dashboardId,
    queryFn: async () => {
      const res = await getMembers(dashboardId as number);
      return {
        members: res.data.members,
        totalCount: res.data.totalCount,
      };
    },
  });
}
