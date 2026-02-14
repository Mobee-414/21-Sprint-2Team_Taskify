import axiosInstance from "./axios";

export type Member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
};

export type MembersResponse = {
  members: Member[];
  totalCount: number;
};

export const getMembersByTeam = async (params: {
  teamId: string;
  dashboardId: number;
  page?: number;
  size?: number;
}): Promise<MembersResponse> => {
  const { teamId, dashboardId, page = 1, size = 10 } = params;

  const res = await axiosInstance.get<MembersResponse>(`/${teamId}/members`, {
    params: { dashboardId, page, size },
  });

  return res.data;
};

export const deleteMemberById = async (memberId: number): Promise<void> => {
  await axiosInstance.delete(`/members/${memberId}`);
};
