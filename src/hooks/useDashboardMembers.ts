import { getMembers } from "@/api/members.api";
import { useEffect, useState } from "react";

export interface Member {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  avatarColor: string;
}

export function useDashboardMembers(dashboardId: number | undefined) {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!dashboardId) return;
  
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const res = await getMembers(dashboardId);
        setMembers(res.data.members);
        setTotalCount(res.data.totalCount);
      } catch (error) {
        console.error("멤버 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchMembers();
  }, [dashboardId]);

  return { members, totalCount, isLoading };

}